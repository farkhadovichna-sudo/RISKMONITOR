// ==============================================
// EXPRESS SERVER
// ==============================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Routes
const completedDealsRoutes = require('./routes/completedDeals');
const ingestionRoutes = require('./routes/ingestion');

// Scheduler
const { startScheduler } = require('./scheduler');

// Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
}));
app.use(express.json());

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// ==============================================
// ROUTES
// ==============================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/completed-deals', completedDealsRoutes);
app.use('/api/ingestion', ingestionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint topilmadi',
    path: req.path
  });
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

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║  🚀 RiskMonitor Backend Server                   ║
╠══════════════════════════════════════════════════╣
║  Port: ${PORT}                                       ║
║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(32)}║
╚══════════════════════════════════════════════════╝

📡 API Endpoints:
   GET  /health                     - Server holati
   GET  /api/completed-deals        - Deals ro'yxati
   GET  /api/completed-deals/:id    - Deal tafsilotlari
   GET  /api/completed-deals/stats  - Statistika
   GET  /api/ingestion/runs         - Ingestion tarixi
   GET  /api/ingestion/last         - Oxirgi run
   POST /api/ingestion/run          - Qo'lda sync (admin)
`);

  // Scheduler ni ishga tushirish
  if (process.env.SCHEDULE_CRON !== 'disabled') {
    startScheduler();
  }
});

module.exports = app;
