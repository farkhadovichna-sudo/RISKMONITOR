// ==============================================
// INGESTION SERVICE
// ==============================================
// Ma'lumotlarni bazaga saqlash (idempotent upsert)

const { v4: uuidv4 } = require('uuid');
const { query, transaction } = require('../db/db');
const uzexAdapter = require('../adapters/uzexCompletedDeals');

/**
 * Yangi ingestion run boshlash
 */
async function startRun() {
  const runId = uuidv4();
  await query(
    `INSERT INTO ingestion_runs (run_id, started_at, status) VALUES ($1, NOW(), 'running')`,
    [runId]
  );
  console.log(`\n🚀 Ingestion boshlandi: ${runId}`);
  return runId;
}

/**
 * Run ni yakunlash
 */
async function endRun(runId, stats, errors = []) {
  await query(
    `UPDATE ingestion_runs SET 
      ended_at = NOW(),
      status = $2,
      batches_fetched = $3,
      items_found = $4,
      items_inserted = $5,
      items_updated = $6,
      items_unchanged = $7,
      errors_json = $8
    WHERE run_id = $1`,
    [
      runId,
      errors.length > 0 ? 'completed_with_errors' : 'completed',
      stats.batchesFetched,
      stats.itemsFound,
      stats.itemsInserted,
      stats.itemsUpdated,
      stats.itemsUnchanged,
      JSON.stringify(errors)
    ]
  );
  console.log(`\n✅ Ingestion yakunlandi: ${runId}`);
  console.log(`   📊 Topildi: ${stats.itemsFound}, Yangi: ${stats.itemsInserted}, Yangilandi: ${stats.itemsUpdated}, O'zgarishsiz: ${stats.itemsUnchanged}`);
}

/**
 * Run ni xato bilan yakunlash
 */
async function failRun(runId, error) {
  await query(
    `UPDATE ingestion_runs SET 
      ended_at = NOW(),
      status = 'failed',
      errors_json = $2
    WHERE run_id = $1`,
    [runId, JSON.stringify([{ message: error.message, stack: error.stack }])]
  );
  console.error(`\n❌ Ingestion muvaffaqiyatsiz: ${runId}`);
}

/**
 * Bitta deal ni bazaga upsert qilish
 * @returns {'inserted' | 'updated' | 'unchanged'}
 */
async function upsertDeal(deal) {
  // Avval mavjud yozuvni tekshirish
  const existing = await query(
    `SELECT id, raw_hash FROM completed_deals 
     WHERE source = 'uzex' AND lot_number = $1 AND end_date = $2`,
    [deal.lot_number, deal.end_date]
  );
  
  if (existing.rows.length === 0) {
    // Yangi yozuv
    await query(
      `INSERT INTO completed_deals 
        (source, lot_number, end_date, initial_amount, contract_amount, 
         customer_name, provider_name, trade_type, currency, region, 
         status, raw_json, raw_hash, last_seen_at, created_at, updated_at)
       VALUES 
        ('uzex', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW(), NOW())`,
      [
        deal.lot_number,
        deal.end_date,
        deal.initial_amount,
        deal.contract_amount,
        deal.customer_name,
        deal.provider_name,
        deal.trade_type,
        deal.currency,
        deal.region,
        deal.status,
        JSON.stringify(deal.raw_json),
        deal.raw_hash
      ]
    );
    return 'inserted';
    
  } else if (existing.rows[0].raw_hash !== deal.raw_hash) {
    // Hash o'zgardi - yangilash
    await query(
      `UPDATE completed_deals SET 
        initial_amount = $3, contract_amount = $4, customer_name = $5,
        provider_name = $6, trade_type = $7, currency = $8, region = $9,
        status = $10, raw_json = $11, raw_hash = $12, 
        last_seen_at = NOW(), updated_at = NOW()
       WHERE source = 'uzex' AND lot_number = $1 AND end_date = $2`,
      [
        deal.lot_number,
        deal.end_date,
        deal.initial_amount,
        deal.contract_amount,
        deal.customer_name,
        deal.provider_name,
        deal.trade_type,
        deal.currency,
        deal.region,
        deal.status,
        JSON.stringify(deal.raw_json),
        deal.raw_hash
      ]
    );
    return 'updated';
    
  } else {
    // Hash o'zgarmagan - faqat last_seen_at yangilash
    await query(
      `UPDATE completed_deals SET last_seen_at = NOW() WHERE id = $1`,
      [existing.rows[0].id]
    );
    return 'unchanged';
  }
}

/**
 * Raw snapshot saqlash (debugging uchun)
 */
async function saveSnapshot(runId, batchNumber, requestBody, responseJson) {
  const contentHash = require('crypto')
    .createHash('md5')
    .update(JSON.stringify(responseJson))
    .digest('hex');
  
  await query(
    `INSERT INTO raw_snapshots (run_id, batch_number, request_body, response_json, content_hash)
     VALUES ($1, $2, $3, $4, $5)`,
    [runId, batchNumber, JSON.stringify(requestBody), JSON.stringify(responseJson), contentHash]
  );
}

/**
 * To'liq ingestion jarayoni
 */
async function runIngestion(options = {}) {
  const { saveSnapshots = false, filters = {} } = options;
  
  const runId = await startRun();
  const stats = {
    batchesFetched: 0,
    itemsFound: 0,
    itemsInserted: 0,
    itemsUpdated: 0,
    itemsUnchanged: 0
  };
  const errors = [];
  
  try {
    const result = await uzexAdapter.fetchAllDeals({
      filters,
      onBatch: async (normalizedBatch, batchNumber, from, to) => {
        stats.batchesFetched = batchNumber;
        
        // Har bir deal ni upsert qilish
        for (const deal of normalizedBatch) {
          try {
            const action = await upsertDeal(deal);
            stats.itemsFound++;
            
            if (action === 'inserted') stats.itemsInserted++;
            else if (action === 'updated') stats.itemsUpdated++;
            else stats.itemsUnchanged++;
            
          } catch (err) {
            errors.push({
              lot_number: deal.lot_number,
              message: err.message
            });
          }
        }
        
        // Optional: snapshot saqlash
        if (saveSnapshots) {
          await saveSnapshot(runId, batchNumber, { from, to }, normalizedBatch);
        }
      }
    });
    
    await endRun(runId, stats, errors);
    
    return {
      runId,
      success: true,
      stats,
      errors
    };
    
  } catch (err) {
    await failRun(runId, err);
    throw err;
  }
}

/**
 * Oxirgi run haqida ma'lumot
 */
async function getLastRun() {
  const result = await query(
    `SELECT * FROM ingestion_runs ORDER BY started_at DESC LIMIT 1`
  );
  return result.rows[0] || null;
}

/**
 * Barcha runlar ro'yxati
 */
async function getRuns(limit = 20) {
  const result = await query(
    `SELECT * FROM ingestion_runs ORDER BY started_at DESC LIMIT $1`,
    [limit]
  );
  return result.rows;
}

module.exports = {
  runIngestion,
  startRun,
  endRun,
  failRun,
  upsertDeal,
  getLastRun,
  getRuns
};
