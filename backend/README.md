# RiskMonitor Backend

UzEx dan completed deals ma'lumotlarini olib keladigan va saqlaydi Node.js backend.

## 📁 Struktura

```
backend/
├── src/
│   ├── adapters/
│   │   └── uzexCompletedDeals.js   # UzEx API adapter
│   ├── db/
│   │   ├── db.js                   # PostgreSQL ulanish
│   │   └── migrate.js              # Database schema
│   ├── routes/
│   │   ├── completedDeals.js       # /api/completed-deals
│   │   └── ingestion.js            # /api/ingestion
│   ├── services/
│   │   └── ingest.js               # Ingestion logic
│   ├── scripts/
│   │   └── runIngestion.js         # Manual sync script
│   ├── scheduler.js                # Cron scheduler
│   └── server.js                   # Express app
├── .env.example
├── package.json
└── README.md
```

## 🚀 Ishga Tushirish

### 1. Dependencies o'rnatish
```bash
cd backend
npm install
```

### 2. Environment sozlash
```bash
cp .env.example .env
# .env faylini tahrirlang va DATABASE_URL qo'shing
```

### 3. PostgreSQL database yaratish
```bash
createdb riskmonitor
# yoki pgAdmin orqali yarating
```

### 4. Migratsiyalarni ishga tushirish
```bash
npm run migrate
```

### 5. Server ni ishga tushirish
```bash
# Development
npm run dev

# Production
npm start
```

### 6. Birinchi sync (ixtiyoriy)
```bash
npm run ingest
```

## 📡 API Endpoints

| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/health` | Server holati |
| GET | `/api/completed-deals` | Deals ro'yxati |
| GET | `/api/completed-deals/:id` | Deal tafsilotlari |
| GET | `/api/completed-deals/stats` | Statistika |
| GET | `/api/ingestion/runs` | Sync tarixi |
| GET | `/api/ingestion/last` | Oxirgi sync |
| POST | `/api/ingestion/run` | Qo'lda sync (admin) |

### Query Parametrlari (`/api/completed-deals`)

| Parametr | Turi | Tavsif |
|----------|------|--------|
| page | number | Sahifa raqami (default: 1) |
| pageSize | number | Sahifa hajmi (max: 100, default: 20) |
| from | date | Sana boshlanishi (YYYY-MM-DD) |
| to | date | Sana tugashi |
| q | string | Qidiruv (customer, provider, lot_number) |
| region | string | Hudud filtri |
| status | string | Status filtri |
| minAmount | number | Minimal summa |
| maxAmount | number | Maksimal summa |
| sortBy | string | Saralash ustuni |
| sortOrder | string | ASC yoki DESC |

### Manual Trigger Example
```bash
curl -X POST http://localhost:3001/api/ingestion/run \
  -H "X-Admin-Key: your_admin_key" \
  -H "Content-Type: application/json"
```

## ⏰ Scheduler

Har 5 soatda avtomatik sync:
- Cron: `0 */5 * * *`
- Timezone: Asia/Tashkent

O'chirish uchun `.env` da:
```
SCHEDULE_CRON=disabled
```

## ✅ Tekshirish Cheklist

- [ ] PostgreSQL ishlayapti
- [ ] `.env` fayl to'ldirilgan
- [ ] Migratsiyalar muvaffaqiyatli
- [ ] Server ishga tushdi (`npm run dev`)
- [ ] `/health` javob qaytaradi
- [ ] `/api/completed-deals` ishlaydi
- [ ] Manual ingest muvaffaqiyatli (`npm run ingest`)

## 📊 UzEx API Ma'lumotlari

- **Endpoint**: `POST https://xarid-api-auction.uzex.uz/Common/GetCompletedDeals`
- **Pagination**: `from`/`to` (1-based index)
- **Login talab qilmaydi** ✅
- **Rate limit**: ~2 req/sec (xavfsizlik uchun)
