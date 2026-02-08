// ============================================
// MOCK DATA - Davlat Xaridlari Risk-Skoring
// ============================================

// Hududlar
const REGIONS = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand viloyati',
  'Buxoro viloyati',
  'Farg\'ona viloyati',
  'Andijon viloyati',
  'Namangan viloyati',
  'Xorazm viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Navoiy viloyati',
  'Jizzax viloyati',
  'Sirdaryo viloyati'
];

// Sohalar
const SECTORS = [
  'Qurilish',
  'IT va Texnologiya',
  'Tibbiyot',
  'Ta\'lim',
  'Transport',
  'Energetika',
  'Qishloq xo\'jaligi',
  'Oziq-ovqat',
  'Kommunal xizmatlar',
  'Mebel va jihozlar'
];

// Kompaniyalar
const COMPANIES = [
  { name: 'Alpha Qurilish LLC', inn: '301234567' },
  { name: 'Beta Solutions MCHJ', inn: '302345678' },
  { name: 'Gamma Trade LLC', inn: '303456789' },
  { name: 'Delta Engineering MCHJ', inn: '304567890' },
  { name: 'Epsilon Group LLC', inn: '305678901' },
  { name: 'Zeta Tech MCHJ', inn: '306789012' },
  { name: 'Eta Construction LLC', inn: '307890123' },
  { name: 'Theta Medical MCHJ', inn: '308901234' },
  { name: 'Iota Transport LLC', inn: '309012345' },
  { name: 'Kappa Agro MCHJ', inn: '310123456' },
  { name: 'Lambda Energy LLC', inn: '311234567' },
  { name: 'Mu Foods MCHJ', inn: '312345678' },
  { name: 'Nu Services LLC', inn: '313456789' },
  { name: 'Omicron IT MCHJ', inn: '314567890' },
  { name: 'Pi Consulting LLC', inn: '315678901' }
];

// Buyurtmachilar
const BUYERS = [
  'Toshkent shahar hokimligi',
  'Samarqand viloyat hokimligi',
  'Moliya vazirligi',
  'Sog\'liqni saqlash vazirligi',
  'Ta\'lim vazirligi',
  'Transport vazirligi',
  'Energetika vazirligi',
  'Qishloq xo\'jaligi vazirligi',
  'Ichki ishlar vazirligi',
  'Mudofaa vazirligi',
  'Farg\'ona viloyat hokimligi',
  'Buxoro viloyat hokimligi',
  'Andijon shahar hokimligi',
  'Navoiy viloyat hokimligi',
  'Xorazm viloyat hokimligi'
];

// Risk sabablari generatori - Qonuniy asoslar bilan
const RISK_REASONS = [
  { 
    sabab: 'Bitta ishtirokchi', 
    maxBall: 35, 
    izoh: 'Tenderda faqat bitta kompaniya ishtirok etdi, raqobat mavjud emas',
    qonuniyAsos: {
      qonun: 'Davlat xaridlari to\'g\'risida qonun',
      modda: '28-modda, 3-qism',
      matn: 'Tender kamida uchta ishtirokchi tomonidan ariza berilganda haqiqiy hisoblanadi',
      jazosi: 'Tender bekor qilinishi, qayta e\'lon qilish'
    }
  },
  { 
    sabab: 'Narx medianadan yuqori', 
    maxBall: 25, 
    izoh: 'Shartnoma narxi o\'xshash tenderlar medianasidan sezilarli yuqori',
    qonuniyAsos: {
      qonun: 'Davlat xaridlari to\'g\'risida qonun',
      modda: '32-modda',
      matn: 'Shartnoma narxi bozor narxlariga mos kelishi va iqtisodiy samaradorlikni ta\'minlashi kerak',
      jazosi: 'Moliyaviy tekshiruv, zararni qoplash'
    }
  },
  { 
    sabab: 'Takroriy g\'alabalar', 
    maxBall: 30, 
    izoh: 'Ushbu kompaniya oxirgi 12 oyda bir xil buyurtmachidan ko\'p tender yutgan',
    qonuniyAsos: {
      qonun: 'Raqobat to\'g\'risida qonun',
      modda: '11-modda',
      matn: 'Bozor ustunligidan suiiste\'mol qilish va raqobatni cheklash taqiqlanadi',
      jazosi: 'Ma\'muriy jazo, shartnoma bekor qilish'
    }
  },
  { 
    sabab: 'Texnik topshiriqda spetsifik talab', 
    maxBall: 20, 
    izoh: 'Texnik topshiriq faqat bitta mahsulot/kompaniyaga mos keladigan talablarni o\'z ichiga oladi',
    qonuniyAsos: {
      qonun: 'Davlat xaridlari to\'g\'risida qonun',
      modda: '23-modda, 2-qism',
      matn: 'Texnik topshiriq potensial ishtirokchilar doirasini sun\'iy ravishda cheklaydigan talablarni o\'z ichiga olmаsligi kerak',
      jazosi: 'Tender qayta e\'lon qilinishi'
    }
  },
  { 
    sabab: 'Qisqa muddatli e\'lon', 
    maxBall: 15, 
    izoh: 'Tender e\'loni qonuniy minimal muddatdan kam vaqt oldin e\'lon qilingan',
    qonuniyAsos: {
      qonun: 'Davlat xaridlari to\'g\'risida qonun',
      modda: '25-modda',
      matn: 'Tender e\'loni kamida 15 ish kuni oldin e\'lon qilinishi shart',
      jazosi: 'Tender bekor qilinishi'
    }
  },
  { 
    sabab: 'Yaqin sanalar', 
    maxBall: 18, 
    izoh: 'Takliflar juda yaqin vaqtda, ketma-ket yuborilgan',
    qonuniyAsos: {
      qonun: 'Raqobat to\'g\'risida qonun',
      modda: '12-modda',
      matn: 'Ishtirokchilar orasidagi kelishuvlar va koordinatsiyalangan harakatlar taqiqlanadi',
      jazosi: 'Kartel kelishuvi uchun jarima (aylanmaning 10% gacha)'
    }
  },
  { 
    sabab: 'O\'xshash narxlar', 
    maxBall: 22, 
    izoh: 'Ishtirokchilar narxlari g\'ayrioddiy darajada yaqin',
    qonuniyAsos: {
      qonun: 'Raqobat to\'g\'risida qonun',
      modda: '12-modda, 1-qism',
      matn: 'Narxlarni kelishib belgilash yoki ular haqida axborot almashish taqiqlanadi',
      jazosi: 'Jarima va jinoiy javobgarlik'
    }
  },
  { 
    sabab: 'Yangi tashkil etilgan kompaniya', 
    maxBall: 12, 
    izoh: 'G\'olib kompaniya tenderdan oldin yaqinda ro\'yxatdan o\'tgan',
    qonuniyAsos: {
      qonun: 'Davlat xaridlari to\'g\'risida qonun',
      modda: '22-modda',
      matn: 'Ishtirokchi kamida 1 yil tajribaga ega bo\'lishi talab qilinishi mumkin',
      jazosi: 'Ishtirokchi malakasini tekshirish'
    }
  },
  { 
    sabab: 'Subpudratchi zanjiri', 
    maxBall: 16, 
    izoh: 'Shartnomada noma\'lum subpudratchilar ishtirok etadi',
    qonuniyAsos: {
      qonun: 'Korrupsiyaga qarshi kurashish to\'g\'risida qonun',
      modda: '8-modda',
      matn: 'Yashirin manfaatlar va shaffof bo\'lmagan shartnoma munosabatlari taqiqlanadi',
      jazosi: 'Tekshiruv, shartnoma bekor qilish'
    }
  },
  { 
    sabab: 'Ortiqcha talablar', 
    maxBall: 14, 
    izoh: 'Malaka talablari tender hajmiga nisbatan haddan tashqari yuqori',
    qonuniyAsos: {
      qonun: 'Davlat xaridlari to\'g\'risida qonun',
      modda: '23-modda, 3-qism',
      matn: 'Malaka talablari xarid predmetiga mutanosib va zarur bo\'lishi kerak',
      jazosi: 'Tender hujjatlarini qayta ko\'rib chiqish'
    }
  }
];

// Qonunchilik ma'lumotnomasi
const LEGAL_DOCUMENTS = {
  'davlat_xaridlari': {
    nomi: 'Davlat xaridlari to\'g\'risida qonun',
    sanasi: '2021-yil 22-aprel',
    raqami: 'O\'RQ-684',
    manbа: 'https://lex.uz/docs/5380889'
  },
  'raqobat': {
    nomi: 'Raqobat to\'g\'risida qonun',
    sanasi: '2012-yil 6-yanvar',
    raqami: 'O\'RQ-319',
    manbа: 'https://lex.uz/docs/2006024'
  },
  'korrupsiya': {
    nomi: 'Korrupsiyaga qarshi kurashish to\'g\'risida qonun',
    sanasi: '2017-yil 3-yanvar',
    raqami: 'O\'RQ-419',
    manbа: 'https://lex.uz/docs/3088012'
  }
};

// Risk band aniqlash
function getRiskBand(score) {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function getRiskBandLabel(band) {
  const labels = {
    high: 'Yuqori',
    medium: 'O\'rta',
    low: 'Past'
  };
  return labels[band] || band;
}

// Random helpers - SEEDED for consistent data
let seed = 12345; // Fixed seed for consistent results

function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function randomInt(min, max) {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(seededRandom() * arr.length)];
}

function randomDate(start, end) {
  const date = new Date(start.getTime() + seededRandom() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}


function formatSum(sum) {
  return new Intl.NumberFormat('uz-UZ').format(sum) + ' so\'m';
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Generate risk reasons for a tender
function generateRiskReasons(targetScore) {
  const reasons = [];
  let currentScore = 0;
  const shuffled = [...RISK_REASONS].sort(() => seededRandom() - 0.5);
  
  for (const reason of shuffled) {
    if (currentScore >= targetScore) break;
    const ball = Math.min(randomInt(5, reason.maxBall), targetScore - currentScore + 5);
    reasons.push({
      sabab: reason.sabab,
      ball: ball,
      izoh: reason.izoh,
      qonuniyAsos: reason.qonuniyAsos  // Qonuniy asosni qo'shish
    });
    currentScore += ball;
    if (reasons.length >= 5) break;
  }
  
  return reasons.sort((a, b) => b.ball - a.ball);
}

// Generate bids for a tender
function generateBids(golib, count) {
  const bids = [];
  const usedCompanies = new Set([golib.name]);
  const basePrice = randomInt(100000000, 5000000000);
  
  bids.push({
    kompaniya: golib.name,
    inn: golib.inn,
    narx: basePrice,
    golib: true
  });
  
  for (let i = 1; i < count; i++) {
    let company;
    do {
      company = randomItem(COMPANIES);
    } while (usedCompanies.has(company.name));
    usedCompanies.add(company.name);
    
    bids.push({
      kompaniya: company.name,
      inn: company.inn,
      narx: basePrice + randomInt(1000000, basePrice * 0.3),
      golib: false
    });
  }
  
  return bids.sort((a, b) => a.narx - b.narx);
}

// Generate tenders
function generateTenders(count = 28) {
  const tenders = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  
  for (let i = 0; i < count; i++) {
    const riskScore = randomInt(15, 95);
    const golib = randomItem(COMPANIES);
    const ishtirokchilarSoni = riskScore > 60 ? randomInt(1, 3) : randomInt(3, 6);
    const bids = generateBids(golib, ishtirokchilarSoni);
    
    const tender = {
      id: `TND-2024-${String(i + 100).padStart(5, '0')}`,
      buyurtmachi: randomItem(BUYERS),
      soha: randomItem(SECTORS),
      hudud: randomItem(REGIONS),
      summa: bids[0].narx,
      ishtirokchilar: ishtirokchilarSoni,
      golib: golib.name,
      riskScore: riskScore,
      riskBand: getRiskBand(riskScore),
      sana: randomDate(startDate, endDate),
      riskSabablari: generateRiskReasons(riskScore),
      bids: bids,
      rulesVersion: 'v1.2',
      dataSource: 'e-xarid.uz API'
    };
    
    tenders.push(tender);
  }
  
  return tenders.sort((a, b) => b.riskScore - a.riskScore);
}

// Generate cases
function generateCases(tenders) {
  const cases = [];
  const statuses = ['new', 'in_review', 'closed'];
  const inspectors = [
    'Abdullayev A.',
    'Karimov B.',
    'Toshmatov S.',
    'Rahimova N.',
    'Xolmatov D.'
  ];
  
  // Only create cases for SOME high risk tenders (leave some for "risky tenders" section)
  const highRiskTenders = tenders.filter(t => t.riskBand === 'high');
  const tendersWithCases = highRiskTenders.slice(0, 7); // Only first 7, rest remain without cases
  
  tendersWithCases.forEach((tender, idx) => {
    const status = statuses[idx % statuses.length];
    const caseData = {
      id: `CASE-${String(idx + 1).padStart(3, '0')}`,
      tenderId: tender.id,
      tenderSummary: {
        buyurtmachi: tender.buyurtmachi,
        golib: tender.golib,
        summa: tender.summa,
        riskScore: tender.riskScore,
        riskBand: tender.riskBand
      },
      status: status,
      assignedTo: randomItem(inspectors),
      createdAt: tender.sana,
      updatedAt: randomDate(new Date(tender.sana), new Date()),
      timeline: generateTimeline(status, tender.sana),
      comments: status !== 'new' ? generateComments() : [],
      decision: status === 'closed' ? randomItem(['tekshiruv', 'yopish', 'false_positive']) : null
    };
    
    cases.push(caseData);
  });
  
  return cases;
}

function generateTimeline(status, startDate) {
  const timeline = [
    {
      event: 'Case ochildi',
      date: startDate,
      user: 'Tizim'
    }
  ];
  
  if (status !== 'new') {
    timeline.push({
      event: 'Inspektorga tayinlandi',
      date: randomDate(new Date(startDate), new Date()),
      user: 'Tizim'
    });
  }
  
  if (status === 'in_review' || status === 'decision' || status === 'closed') {
    timeline.push({
      event: 'Tekshiruv boshlandi',
      date: randomDate(new Date(startDate), new Date()),
      user: 'Inspektor'
    });
  }
  
  if (status === 'decision' || status === 'closed') {
    timeline.push({
      event: 'Hisobot yuklandi',
      date: randomDate(new Date(startDate), new Date()),
      user: 'Inspektor'
    });
  }
  
  if (status === 'closed') {
    timeline.push({
      event: 'Qaror qabul qilindi',
      date: randomDate(new Date(startDate), new Date()),
      user: 'Bo\'lim boshlig\'i'
    });
  }
  
  return timeline;
}

function generateComments() {
  const comments = [
    'Hujjatlar to\'liq tekshirildi',
    'Qo\'shimcha ma\'lumot so\'raldi',
    'Buyurtmachi bilan bog\'lanildi',
    'Shartnoma shartlari tahlil qilindi',
    'Boshqa tenderlar bilan solishtirish amalga oshirildi'
  ];
  
  return [
    {
      text: randomItem(comments),
      user: 'Inspektor',
      date: randomDate(new Date('2024-06-01'), new Date())
    }
  ];
}

// Risk scoring rules
const RISK_RULES = [
  {
    id: 1,
    name: 'Yagona ishtirokchi',
    tavsif: 'Tenderda faqat bitta kompaniya ishtirok etganda',
    weight: 35,
    enabled: true,
    version: 'v1.0'
  },
  {
    id: 2,
    name: 'Narx anomaliyasi',
    tavsif: 'Narx medianadan 20% dan ortiq farq qilganda',
    weight: 25,
    enabled: true,
    version: 'v1.0'
  },
  {
    id: 3,
    name: 'Takroriy g\'alabalar',
    tavsif: 'Bir kompaniya bir buyurtmachidan 12 oyda 3+ tender yutganda',
    weight: 30,
    enabled: true,
    version: 'v1.1'
  },
  {
    id: 4,
    name: 'Spetsifik texnik talab',
    tavsif: 'Texnik topshiriqda faqat bitta brendga mos talab mavjud',
    weight: 20,
    enabled: true,
    version: 'v1.2'
  },
  {
    id: 5,
    name: 'Qisqa e\'lon muddati',
    tavsif: 'E\'lon qonuniy minimal muddatdan kam bo\'lganda',
    weight: 15,
    enabled: true,
    version: 'v1.0'
  },
  {
    id: 6,
    name: 'Yaqin taklif vaqtlari',
    tavsif: 'Takliflar 5 daqiqa ichida ketma-ket yuborilganda',
    weight: 18,
    enabled: true,
    version: 'v1.1'
  },
  {
    id: 7,
    name: 'O\'xshash narxlar',
    tavsif: 'Ishtirokchilar narxlari 5% dan kam farq qilganda',
    weight: 22,
    enabled: false,
    version: 'v1.2'
  },
  {
    id: 8,
    name: 'Yangi kompaniya',
    tavsif: 'G\'olib kompaniya tenderdan 6 oy oldin ro\'yxatdan o\'tgan',
    weight: 12,
    enabled: true,
    version: 'v1.0'
  }
];

// Generate all data
const TENDERS = generateTenders(28);
const CASES = generateCases(TENDERS);

// Statistics
function getStats() {
  const total = TENDERS.length;
  const high = TENDERS.filter(t => t.riskBand === 'high').length;
  const medium = TENDERS.filter(t => t.riskBand === 'medium').length;
  const low = TENDERS.filter(t => t.riskBand === 'low').length;
  const openCases = CASES.filter(c => c.status !== 'closed').length;
  
  return { total, high, medium, low, openCases };
}

// Risk trend data (weekly)
function getRiskTrendData() {
  return [
    { week: 'Yan 1-7', high: 5, medium: 8, low: 12 },
    { week: 'Yan 8-14', high: 7, medium: 10, low: 15 },
    { week: 'Yan 15-21', high: 4, medium: 12, low: 18 },
    { week: 'Yan 22-28', high: 8, medium: 9, low: 14 },
    { week: 'Fev 1-7', high: 6, medium: 11, low: 16 },
    { week: 'Fev 8-14', high: 9, medium: 7, low: 13 },
    { week: 'Fev 15-21', high: 5, medium: 13, low: 17 },
    { week: 'Fev 22-28', high: 7, medium: 10, low: 15 }
  ];
}

// Top risky buyers
function getTopRiskyBuyers() {
  const buyerRisks = {};
  TENDERS.forEach(t => {
    if (!buyerRisks[t.buyurtmachi]) {
      buyerRisks[t.buyurtmachi] = { count: 0, totalRisk: 0 };
    }
    buyerRisks[t.buyurtmachi].count++;
    buyerRisks[t.buyurtmachi].totalRisk += t.riskScore;
  });
  
  return Object.entries(buyerRisks)
    .map(([name, data]) => ({
      name,
      avgRisk: Math.round(data.totalRisk / data.count),
      tenderCount: data.count
    }))
    .sort((a, b) => b.avgRisk - a.avgRisk)
    .slice(0, 10);
}

// Top signaled companies
function getTopSignaledCompanies() {
  const companySignals = {};
  TENDERS.filter(t => t.riskBand === 'high').forEach(t => {
    if (!companySignals[t.golib]) {
      companySignals[t.golib] = 0;
    }
    companySignals[t.golib]++;
  });
  
  return Object.entries(companySignals)
    .map(([name, count]) => ({ name, signalCount: count }))
    .sort((a, b) => b.signalCount - a.signalCount)
    .slice(0, 10);
}

// Get risky tenders without an open case
function getRiskyTendersWithoutCase() {
  const caseTenderIds = new Set(CASES.map(c => c.tenderId));
  return TENDERS.filter(t => t.riskBand === 'high' && !caseTenderIds.has(t.id));
}

// Open a new case for a tender
function openCase(tenderId) {
  const tender = TENDERS.find(t => t.id === tenderId);
  if (!tender) return null;
  
  // Check if case already exists
  if (CASES.find(c => c.tenderId === tenderId)) {
    return null;
  }
  
  const inspectors = ['Abdullayev A.', 'Karimov B.', 'Toshmatov S.', 'Rahimova N.', 'Xolmatov D.'];
  const newCaseId = `CASE-${String(CASES.length + 1).padStart(3, '0')}`;
  const today = new Date().toISOString().split('T')[0];
  
  const newCase = {
    id: newCaseId,
    tenderId: tender.id,
    tenderSummary: {
      buyurtmachi: tender.buyurtmachi,
      golib: tender.golib,
      summa: tender.summa,
      riskScore: tender.riskScore,
      riskBand: tender.riskBand
    },
    status: 'new',
    assignedTo: inspectors[CASES.length % inspectors.length],
    createdAt: today,
    updatedAt: today,
    timeline: [{
      event: 'Case ochildi',
      date: today,
      user: 'Inspektor'
    }],
    comments: [],
    decision: null
  };
  
  CASES.push(newCase);
  return newCase;
}

// Export
window.mockData = {
  REGIONS,
  SECTORS,
  COMPANIES,
  BUYERS,
  TENDERS,
  CASES,
  RISK_RULES,
  getStats,
  getRiskTrendData,
  getTopRiskyBuyers,
  getTopSignaledCompanies,
  getRiskyTendersWithoutCase,
  openCase,
  getRiskBand,
  getRiskBandLabel,
  formatSum,
  formatDate
};
