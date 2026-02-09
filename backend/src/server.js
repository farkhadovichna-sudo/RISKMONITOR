// ==============================================
// EXPRESS SERVER
// ==============================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// Database (optional)
const { isDatabaseConfigured } = require('./db/db');

// Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ==============================================
// STATIC FILES (Frontend)
// ==============================================
app.use(express.static(path.join(__dirname, '../../RIsKMONITOR')));

// ==============================================
// ROUTES
// ==============================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: isDatabaseConfigured ? 'configured' : 'not configured',
    env: process.env.NODE_ENV || 'development'
  });
});

// API routes (faqat database mavjud bo'lsa)
if (isDatabaseConfigured) {
  const { runMigrations } = require('./db/migrate');
  const completedDealsRoutes = require('./routes/completedDeals');
  const ingestionRoutes = require('./routes/ingestion');
  const { startScheduler } = require('./scheduler');

  // Avtomatik migration (table lar mavjud bo'lmasa yaratadi)
  runMigrations()
    .then(() => console.log('✅ Database tables ready'))
    .catch(err => console.error('❌ Migration error:', err.message));

  app.use('/api/completed-deals', completedDealsRoutes);
  app.use('/api/ingestion', ingestionRoutes);

  // Start scheduler
  if (process.env.SCHEDULE_CRON !== 'disabled') {
    startScheduler();
  }
} else {
  // Database yo'q bo'lsa mock javob
  app.get('/api/*', (req, res) => {
    res.status(503).json({
      success: false,
      error: 'Database ulanmagan. DATABASE_URL environment variable ni sozlang.'
    });
  });
}

// Frontend SPA routing (hash-based emas bo'lsa)
app.get('*', (req, res) => {
  // API so'rovlarini o'tkazib yuborish
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, error: 'Endpoint topilmadi' });
  }
  res.sendFile(path.join(__dirname, '../../RIsKMONITOR/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Server xatosi' 
      : err.message
  });
});

// ==============================================
// START SERVER
// ==============================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║  🚀 RiskMonitor Server                           ║
╠══════════════════════════════════════════════════╣
║  Port: ${String(PORT).padEnd(41)}║
║  Database: ${isDatabaseConfigured ? '✅ Configured'.padEnd(37) : '❌ Not configured'.padEnd(37)}║
╚══════════════════════════════════════════════════╝

📡 Endpoints:
   GET  /health                     - Server holati
   GET  /api/completed-deals        - Deals ro'yxati
   GET  /                           - Frontend
`);
});

module.exports = app;
