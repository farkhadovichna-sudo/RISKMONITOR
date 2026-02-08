// ==============================================
// INGESTION ROUTES
// ==============================================

const express = require('express');
const router = express.Router();
const ingestService = require('../services/ingest');

/**
 * GET /api/ingestion/runs
 * Barcha ingestion runlar ro'yxati
 */
router.get('/runs', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const runs = await ingestService.getRuns(parseInt(limit));
    
    res.json({
      success: true,
      data: runs
    });
    
  } catch (err) {
    console.error('GET /ingestion/runs error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/ingestion/last
 * Oxirgi run haqida ma'lumot
 */
router.get('/last', async (req, res) => {
  try {
    const lastRun = await ingestService.getLastRun();
    
    res.json({
      success: true,
      data: lastRun
    });
    
  } catch (err) {
    console.error('GET /ingestion/last error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/ingestion/run
 * Qo'lda ingestion ishga tushirish (ADMIN only)
 */
router.post('/run', async (req, res) => {
  try {
    // Admin key tekshirish
    const adminKey = req.headers['x-admin-key'] || req.body.adminKey;
    
    if (adminKey !== process.env.ADMIN_TRIGGER_KEY) {
      return res.status(403).json({ 
        success: false, 
        error: 'Ruxsat berilmagan. Admin kalit noto\'g\'ri.' 
      });
    }
    
    // Async ravishda ishga tushirish (response ni kutmasdan)
    res.json({
      success: true,
      message: 'Ingestion ishga tushirildi. /api/ingestion/last dan natijani tekshiring.'
    });
    
    // Background da ishga tushirish
    ingestService.runIngestion({ saveSnapshots: false })
      .then(result => console.log('✅ Manual ingestion completed:', result.runId))
      .catch(err => console.error('❌ Manual ingestion failed:', err));
    
  } catch (err) {
    console.error('POST /ingestion/run error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
