// ==============================================
// DATABASE CONNECTION (PostgreSQL)
// ==============================================

const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                    // Maksimum ulanishlar soni
  idleTimeoutMillis: 30000,   // Bo'sh ulanish vaqti
  connectionTimeoutMillis: 5000
});

// Ulanishni test qilish
pool.on('connect', () => {
  console.log('✅ PostgreSQL ga ulandi');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL xatosi:', err.message);
});

/**
 * SQL so'rov bajarish
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 */
async function query(text, params) {
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
 * @param {Function} callback - Transaction ichidagi operatsiyalar
 */
async function transaction(callback) {
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
  transaction
};
