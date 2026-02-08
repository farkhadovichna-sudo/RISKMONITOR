// ==============================================
// UZEX COMPLETED DEALS ADAPTER
// ==============================================
// UzEx API dan ma'lumot olish va normalizatsiya qilish

const axios = require('axios');
const crypto = require('crypto');

// Konfiguratsiya
const config = {
  endpoint: process.env.UZEX_ENDPOINT || 'https://xarid-api-auction.uzex.uz/Common/GetCompletedDeals',
  batchSize: parseInt(process.env.UZEX_BATCH_SIZE) || 100,
  timeout: parseInt(process.env.REQUEST_TIMEOUT_MS) || 15000,
  rateLimitRps: parseFloat(process.env.RATE_LIMIT_RPS) || 2,
  maxRetries: 3
};

// Rate limiter (so'rovlar orasida kutish)
let lastRequestTime = 0;
async function rateLimitDelay() {
  const minInterval = 1000 / config.rateLimitRps;
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < minInterval) {
    await new Promise(r => setTimeout(r, minInterval - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();
}

// Exponential backoff bilan retry
async function withRetry(fn, retries = config.maxRetries) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isRetryable = 
        err.response?.status === 429 || 
        err.response?.status >= 500 ||
        err.code === 'ECONNRESET' ||
        err.code === 'ETIMEDOUT';
      
      if (!isRetryable || attempt === retries) {
        throw err;
      }
      
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(`⚠️ Retry ${attempt}/${retries} after ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

/**
 * UzEx API dan bir batch ma'lumot olish
 * @param {number} from - Boshlang'ich index (1-based)
 * @param {number} to - Oxirgi index
 * @param {Object} filters - Qo'shimcha filterlar
 * @returns {Promise<Array>} - Ma'lumotlar massivi
 */
async function fetchDealsBatch(from, to, filters = {}) {
  await rateLimitDelay();
  
  const requestBody = {
    region_ids: filters.regionIds || [],
    from: from,
    to: to,
    ...(filters.regionId && { region_id: filters.regionId })
  };
  
  return withRetry(async () => {
    const response = await axios.post(config.endpoint, requestBody, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Language': 'uz'
      },
      timeout: config.timeout
    });
    
    return response.data || [];
  });
}

/**
 * UzEx ma'lumotini standart formatga o'tkazish
 * API javobidagi kalitlar: lot_display_no, lot_end_date, start_cost, deal_cost,
 * customer_name, type_name, provider_name, total_count
 */
function normalizeDeal(item) {
  return {
    lot_number: item.lot_display_no || item.lotNumber || '',
    end_date: item.lot_end_date || item.endDate || null,
    initial_amount: parseFloat(item.start_cost || item.initialAmount || 0),
    contract_amount: parseFloat(item.deal_cost || item.contractAmount || 0),
    customer_name: (item.customer_name || item.customerName || '').trim(),
    provider_name: (item.provider_name || item.providerName || '').trim(),
    trade_type: item.type_name || item.tradeType || '',
    currency: item.currency || 'UZS',
    region: item.region || item.region_name || '',
    status: item.status || 'COMPLETED',
    raw_json: item
  };
}

/**
 * Ma'lumot o'zgarganini aniqlash uchun hash hisoblash
 */
function computeHash(normalized) {
  const str = JSON.stringify({
    lot_number: normalized.lot_number,
    end_date: normalized.end_date,
    initial_amount: normalized.initial_amount,
    contract_amount: normalized.contract_amount,
    customer_name: normalized.customer_name,
    provider_name: normalized.provider_name,
    trade_type: normalized.trade_type,
    status: normalized.status
  });
  return crypto.createHash('md5').update(str).digest('hex');
}

/**
 * Unique key aniqlash (bir xil deal ni topish uchun)
 */
function getUniqueKey(normalized) {
  return {
    source: 'uzex',
    lot_number: normalized.lot_number,
    end_date: normalized.end_date
  };
}

/**
 * Barcha deals ni olib kelish (pagination bilan)
 * @param {Object} options - { onBatch, filters }
 * @returns {Promise<{items: Array, totalCount: number, batchesFetched: number}>}
 */
async function fetchAllDeals(options = {}) {
  const { onBatch, filters = {} } = options;
  const batchSize = config.batchSize;
  
  let allItems = [];
  let from = 1;
  let totalCount = null;
  let batchesFetched = 0;
  
  console.log(`🔄 UzEx dan ma'lumot olish boshlandi (batchSize=${batchSize})...`);
  
  while (true) {
    const to = from + batchSize - 1;
    
    try {
      const batch = await fetchDealsBatch(from, to, filters);
      batchesFetched++;
      
      // Birinchi batchdan total_count ni olish
      if (totalCount === null && batch.length > 0 && batch[0].total_count) {
        totalCount = batch[0].total_count;
        console.log(`📊 Jami elementlar: ${totalCount}`);
      }
      
      if (!batch || batch.length === 0) {
        console.log(`✅ Oxirgi batch (bo'sh). Jami: ${allItems.length} ta`);
        break;
      }
      
      // Normalize qilish
      const normalized = batch.map(item => {
        const n = normalizeDeal(item);
        n.raw_hash = computeHash(n);
        return n;
      });
      
      allItems = allItems.concat(normalized);
      
      if (onBatch) {
        await onBatch(normalized, batchesFetched, from, to);
      }
      
      console.log(`📦 Batch ${batchesFetched}: ${from}-${to} (${batch.length} ta)`);
      
      // Agar batch to'lmagan bo'lsa, oxirgi batch
      if (batch.length < batchSize) {
        console.log(`✅ Oxirgi batch. Jami: ${allItems.length} ta`);
        break;
      }
      
      // Keyingi batch
      from = to + 1;
      
      // Xavfsizlik limiti (1 million)
      if (allItems.length > 1000000) {
        console.warn('⚠️ Xavfsizlik limiti: 1M dan oshdi, to\'xtatildi');
        break;
      }
      
    } catch (err) {
      console.error(`❌ Batch ${batchesFetched + 1} xatosi:`, err.message);
      throw err;
    }
  }
  
  return {
    items: allItems,
    totalCount: totalCount || allItems.length,
    batchesFetched
  };
}

module.exports = {
  fetchDealsBatch,
  fetchAllDeals,
  normalizeDeal,
  computeHash,
  getUniqueKey,
  config
};
