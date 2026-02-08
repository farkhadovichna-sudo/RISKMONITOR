// ==============================================
// SIMPLE SERVER FOR RAILWAY
// ==============================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    message: 'RiskMonitor server is running!',
    port: process.env.PORT || 3001
  });
});

// API placeholder (for future backend integration)
app.get('/api/*', (req, res) => {
  res.status(503).json({
    success: false,
    message: 'Backend API not configured. Using mock data.'
  });
});

// Serve frontend static files
const frontendPath = path.join(__dirname, 'RIsKMONITOR');
console.log(`📁 Frontend path: ${frontendPath}`);
console.log(`📁 Frontend exists: ${fs.existsSync(frontendPath)}`);

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  
  // SPA fallback - serve index.html for all routes
  app.get('*', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('index.html not found');
    }
  });
} else {
  app.get('*', (req, res) => {
    res.status(404).json({
      error: 'Frontend not found',
      path: frontendPath,
      cwd: __dirname
    });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('═══════════════════════════════════════════');
  console.log(`🚀 RiskMonitor running on port ${PORT}`);
  console.log(`   Health: http://0.0.0.0:${PORT}/health`);
  console.log(`   Frontend: http://0.0.0.0:${PORT}/`);
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}`);
  console.log('═══════════════════════════════════════════');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
