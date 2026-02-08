// ==============================================
// COMPLETED DEALS ROUTES
// ==============================================

const express = require('express');
const router = express.Router();
const { query } = require('../db/db');

/**
 * GET /api/completed-deals
 * Barcha deals ro'yxati (pagination va filter bilan)
 */
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 20,
      from,        // Sana boshlanishi (YYYY-MM-DD)
      to,          // Sana tugashi (YYYY-MM-DD)
      q,           // Qidiruv (customer_name, provider_name, lot_number)
      region,
      status,
      minAmount,
      maxAmount,
      sortBy = 'end_date',
      sortOrder = 'DESC'
    } = req.query;
    
    // Parametrlarni validatsiya
    const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(pageSize);
    const limit = Math.min(100, Math.max(1, parseInt(pageSize)));
    
    // Dynamic WHERE clause yasash
    const conditions = [];
    const params = [];
    let paramIndex = 1;
    
    if (from) {
      conditions.push(`end_date >= $${paramIndex++}`);
      params.push(from);
    }
    
    if (to) {
      conditions.push(`end_date <= $${paramIndex++}`);
      params.push(to);
    }
    
    if (q) {
      conditions.push(`(
        customer_name ILIKE $${paramIndex} OR 
        provider_name ILIKE $${paramIndex} OR 
        lot_number ILIKE $${paramIndex}
      )`);
      params.push(`%${q}%`);
      paramIndex++;
    }
    
    if (region) {
      conditions.push(`region ILIKE $${paramIndex++}`);
      params.push(`%${region}%`);
    }
    
    if (status) {
      conditions.push(`status = $${paramIndex++}`);
      params.push(status);
    }
    
    if (minAmount) {
      conditions.push(`contract_amount >= $${paramIndex++}`);
      params.push(parseFloat(minAmount));
    }
    
    if (maxAmount) {
      conditions.push(`contract_amount <= $${paramIndex++}`);
      params.push(parseFloat(maxAmount));
    }
    
    const whereClause = conditions.length > 0 
      ? 'WHERE ' + conditions.join(' AND ')
      : '';
    
    // Sort validatsiya
    const allowedSorts = ['end_date', 'contract_amount', 'initial_amount', 'lot_number', 'created_at'];
    const sortColumn = allowedSorts.includes(sortBy) ? sortBy : 'end_date';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    
    // Count so'rovi
    const countResult = await query(
      `SELECT COUNT(*) as total FROM completed_deals ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].total);
    
    // Ma'lumotlarni olish
    params.push(limit, offset);
    const dataResult = await query(
      `SELECT 
        id, source, lot_number, end_date, initial_amount, contract_amount,
        customer_name, provider_name, trade_type, currency, region, status,
        created_at, updated_at, last_seen_at
       FROM completed_deals 
       ${whereClause}
       ORDER BY ${sortColumn} ${order}
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );
    
    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        page: parseInt(page),
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (err) {
    console.error('GET /completed-deals error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/completed-deals/stats
 * Umumiy statistika
 */
router.get('/stats', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        COUNT(*) as total_deals,
        SUM(contract_amount) as total_amount,
        AVG(contract_amount) as avg_amount,
        MIN(end_date) as earliest_date,
        MAX(end_date) as latest_date,
        COUNT(DISTINCT customer_name) as unique_customers,
        COUNT(DISTINCT provider_name) as unique_providers,
        COUNT(DISTINCT region) as regions_count
      FROM completed_deals
    `);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (err) {
    console.error('GET /completed-deals/stats error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/completed-deals/:id
 * Bitta deal to'liq ma'lumoti
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      `SELECT * FROM completed_deals WHERE id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Deal topilmadi' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (err) {
    console.error('GET /completed-deals/:id error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
