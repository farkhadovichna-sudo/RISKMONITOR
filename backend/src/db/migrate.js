// ==============================================
// DATABASE MIGRATIONS
// ==============================================
// Ishga tushirish: npm run migrate

const { pool } = require('./db');

const migrations = [
  // 1. Completed Deals jadvali
  `CREATE TABLE IF NOT EXISTS completed_deals (
    id SERIAL PRIMARY KEY,
    source TEXT NOT NULL DEFAULT 'uzex',
    
    -- Asosiy ma'lumotlar
    lot_number TEXT NOT NULL,
    end_date TIMESTAMP,
    initial_amount NUMERIC(18, 2),
    contract_amount NUMERIC(18, 2),
    
    -- Ishtirokchilar
    customer_name TEXT,
    provider_name TEXT,
    
    -- Klassifikatsiya
    trade_type TEXT,
    currency TEXT DEFAULT 'UZS',
    region TEXT,
    status TEXT,
    
    -- Qo'shimcha
    detail_url TEXT,
    raw_json JSONB,
    raw_hash TEXT NOT NULL,
    
    -- Metadata
    last_seen_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    -- Unique constraint (bir xil deal ikki marta qo'shilmasligi uchun)
    UNIQUE (source, lot_number, end_date)
  )`,

  // 2. Ingestion Runs jadvali (har bir sync sessiyasi)
  `CREATE TABLE IF NOT EXISTS ingestion_runs (
    run_id UUID PRIMARY KEY,
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'running',
    
    -- Statistika
    batches_fetched INT DEFAULT 0,
    items_found INT DEFAULT 0,
    items_inserted INT DEFAULT 0,
    items_updated INT DEFAULT 0,
    items_unchanged INT DEFAULT 0,
    
    -- Xatolar
    errors_json JSONB DEFAULT '[]'::jsonb
  )`,

  // 3. Raw Snapshots (debugging uchun - ixtiyoriy)
  `CREATE TABLE IF NOT EXISTS raw_snapshots (
    id SERIAL PRIMARY KEY,
    run_id UUID REFERENCES ingestion_runs(run_id),
    batch_number INT,
    url TEXT,
    request_body JSONB,
    response_json JSONB,
    content_hash TEXT,
    collected_at TIMESTAMP NOT NULL DEFAULT NOW()
  )`,

  // 4. Indexlar (tezlik uchun)
  `CREATE INDEX IF NOT EXISTS idx_deals_lot_number ON completed_deals(lot_number)`,
  `CREATE INDEX IF NOT EXISTS idx_deals_end_date ON completed_deals(end_date)`,
  `CREATE INDEX IF NOT EXISTS idx_deals_region ON completed_deals(region)`,
  `CREATE INDEX IF NOT EXISTS idx_deals_status ON completed_deals(status)`,
  `CREATE INDEX IF NOT EXISTS idx_deals_customer ON completed_deals(customer_name)`,
  `CREATE INDEX IF NOT EXISTS idx_runs_status ON ingestion_runs(status)`,
  `CREATE INDEX IF NOT EXISTS idx_runs_started ON ingestion_runs(started_at DESC)`
];

async function runMigrations() {
  console.log('🔄 Migratsiyalar ishga tushmoqda...\n');
  
  for (let i = 0; i < migrations.length; i++) {
    const sql = migrations[i];
    const name = sql.match(/CREATE\s+(TABLE|INDEX)\s+IF\s+NOT\s+EXISTS\s+(\w+)/i);
    const label = name ? `${name[1]} ${name[2]}` : `Migration ${i + 1}`;
    
    try {
      await pool.query(sql);
      console.log(`✅ ${label}`);
    } catch (err) {
      console.error(`❌ ${label}: ${err.message}`);
      throw err;
    }
  }
  
  console.log('\n✅ Barcha migratsiyalar muvaffaqiyatli yakunlandi!');
}

// Bevosita ishga tushirilganda
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { runMigrations };
