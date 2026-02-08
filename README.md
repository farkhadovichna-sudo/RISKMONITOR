# RiskMonitor

AI-based public procurement risk detection platform.

## 📁 Structure

- `RIsKMONITOR/` - Frontend (HTML/CSS/JS)
- `backend/` - Backend API (Node.js + PostgreSQL)

## 🚀 Deploy on Railway

1. Connect this repo to Railway
2. Add PostgreSQL database service
3. Set environment variables:
   - `DATABASE_URL` (auto-set by Railway Postgres)
   - `ADMIN_TRIGGER_KEY` (your secret key)
   - `PORT` (usually auto-set)

## 🔧 Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run dev
```

### Frontend
```bash
cd RIsKMONITOR
python3 -m http.server 8080
```

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /api/completed-deals` | List deals |
| `GET /api/completed-deals/:id` | Deal details |
| `POST /api/ingestion/run` | Manual sync (admin) |

## License

MIT
