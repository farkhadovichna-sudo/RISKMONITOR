#!/bin/bash
# Railway Start Script

echo "🚀 Starting RiskMonitor Backend..."

# Install backend dependencies
cd backend && npm install

# Run migrations (optional - uncomment if DB is ready)
# npm run migrate

# Start server
cd .. && node backend/src/server.js
