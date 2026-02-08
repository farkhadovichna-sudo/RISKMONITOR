// ==============================================
// DATABASE CONNECTION (PostgreSQL)
// ==============================================

const { Pool } = require('pg');
require('dotenv').config();

// Database mavjudligini tekshirish
const isDatabaseConfigured = !!process.env.DATABASE_URL;

// PostgreSQL connection pool (faqat DATABASE_URL mavjud bo'lsa)
let pool = null;

if (isDatabaseConfigured) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

  pool.on('connect', () => {
    console.log('✅ PostgreSQL ga ulandi');
  });

  pool.on('error', (err) => {
    console.error('❌ PostgreSQL xatosi:', err.message);
  });
} else {
  console.warn('⚠️ DATABASE_URL topilmadi. Database funksiyalari ishlamaydi.');
}

/**
 * SQL so'rov bajarish
 */
async function query(text, params) {
  if (!pool) {
    throw new Error('Database ulanmagan. DATABASE_URL environment variable ni sozlang.');
  }
  
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Query: ${text.substring(0, 50)}... (${duration}ms, ${result.rowCount} rows)`);
  }
  
  return result;
}

/**
 * Transaction bilan ishlash
 */
async function transaction(callback) {
  if (!pool) {
    throw new Error('Database ulanmagan.');
  }
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  query,
  transaction,
  isDatabaseConfigured
};
