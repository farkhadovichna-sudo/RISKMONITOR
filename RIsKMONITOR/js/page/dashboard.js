// ============================================
// PAGES - Dashboard (New Stitch Design)
// ============================================

function renderDashboard() {
  const stats = mockData.getStats();
  const tenders = mockData.TENDERS;
  
  document.body.innerHTML = `
    <div class="bg-background-dark text-white font-display overflow-hidden">
      <div class="relative flex h-screen w-full bg-background-dark overflow-hidden">
        <!-- Sidebar -->
        <aside class="flex w-64 flex-col border-r border-surface-dark bg-background-dark hidden md:flex">
          <div class="flex flex-col h-full p-4 justify-between">
            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-3 px-2">
                <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center shadow-lg shadow-primary/20">
                  <span class="text-xl">🛡️</span>
                </div>
                <div class="flex flex-col">
                  <h1 class="text-white text-base font-bold leading-normal tracking-tight">RiskMonitor</h1>
                  <p class="text-text-secondary text-xs font-normal leading-normal">Xavf Monitoringi</p>
                </div>
              </div>
              <nav class="flex flex-col gap-2">
                <a href="#/app/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90">
                  <span class="material-symbols-outlined text-[20px]">dashboard</span>
                  <p class="text-sm font-medium leading-normal">Dashboard</p>
                </a>
                <a href="#/app/tenders" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">description</span>
                  <p class="text-sm font-medium leading-normal">Tenderlar</p>
                </a>
                <a href="#/app/cases" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">work</span>
                  <p class="text-sm font-medium leading-normal">Case'lar</p>
                </a>
                <a href="#/app/analytics" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">bar_chart</span>
                  <p class="text-sm font-medium leading-normal">Tahlillar</p>
                </a>
                <a href="#/app/anomaly" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">warning</span>
                  <p class="text-sm font-medium leading-normal">Narx anomaliyasi</p>
                </a>
                <a href="#/app/reports" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">summarize</span>
                  <p class="text-sm font-medium leading-normal">Hisobotlar</p>
                </a>
              </nav>
            </div>
            <a href="#/" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors mt-auto">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              <p class="text-sm font-medium leading-normal">Chiqish</p>
            </a>
          </div>
        </aside>

        <div class="flex flex-col flex-1 h-full overflow-hidden">
          <!-- Header -->
          <header class="flex items-center justify-between whitespace-nowrap border-b border-surface-dark bg-background-dark/80 backdrop-blur-md px-6 py-3 z-10">
            <div class="flex items-center gap-8 w-full max-w-4xl">
              <a href="#/app/dashboard" class="flex items-center gap-3 text-white shrink-0">
                <span class="material-symbols-outlined text-primary text-2xl">security</span>
                <span class="text-lg font-bold tracking-tight">RiskMonitor</span>
              </a>
              <div class="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <a href="#/app/dashboard" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Bosh sahifa</a>
                <a href="#/app/tenders" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Tenderlar</a>
                <a href="#/app/cases" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Keyslar</a>
                <a href="#/app/analytics" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Tahlillar</a>
                <a href="#/app/knowledge-base" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bilimlar bazasi</a>
                <a href="#/app/reports" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Hisobot</a>
                ${isAdmin() ? '<a href="#/app/admin" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark flex items-center gap-1"><span class="material-symbols-outlined text-sm">shield_person</span>Admin</a>' : ''}
              </div>
            </div>
            ${renderHeaderUserSection()}
          </header>

          <!-- Main Content -->
          <main class="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
            <div class="max-w-[1200px] mx-auto flex flex-col gap-8">
              <!-- KPI Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a href="#/app/tenders/filter/all" class="flex flex-col gap-3 rounded-xl p-5 border border-border-dark bg-background-dark shadow-sm hover:border-primary/50 hover:bg-surface-dark/50 transition-all cursor-pointer group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium">Jami tenderlar</p>
                    <span class="material-symbols-outlined text-primary text-[20px]">folder_open</span>
                  </div>
                  <div>
                    <p class="text-white text-3xl font-bold tracking-tight">${stats.total.toLocaleString()}</p>
                  </div>
                  <div class="flex items-center gap-1 bg-green-500/10 w-fit px-2 py-0.5 rounded text-green-500 text-xs font-medium">
                    <span class="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>+5.2%</span>
                  </div>
                  <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">Batafsil ko'rish →</span>
                </a>
                
                <a href="#/app/tenders/filter/high" class="flex flex-col gap-3 rounded-xl p-5 border border-red-500/30 bg-red-500/5 shadow-sm hover:bg-red-500/10 hover:border-red-500/50 transition-all cursor-pointer group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium">Yuqori riskli</p>
                    <span class="material-symbols-outlined text-red-500 text-[20px]">warning</span>
                  </div>
                  <div>
                    <p class="text-white text-3xl font-bold tracking-tight">${stats.high.toLocaleString()}</p>
                  </div>
                  <div class="flex items-center gap-1 bg-red-500/10 w-fit px-2 py-0.5 rounded text-red-500 text-xs font-medium">
                    <span class="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>+12%</span>
                  </div>
                  <span class="text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Batafsil ko'rish →</span>
                </a>
                
                <a href="#/app/tenders/filter/medium" class="flex flex-col gap-3 rounded-xl p-5 border border-border-dark bg-background-dark shadow-sm hover:border-orange-500/50 hover:bg-surface-dark/50 transition-all cursor-pointer group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium">O'rta risk</p>
                    <span class="material-symbols-outlined text-orange-500 text-[20px]">error</span>
                  </div>
                  <div>
                    <p class="text-white text-3xl font-bold tracking-tight">${stats.medium.toLocaleString()}</p>
                  </div>
                  <div class="flex items-center gap-1 bg-orange-500/10 w-fit px-2 py-0.5 rounded text-orange-500 text-xs font-medium">
                    <span class="material-symbols-outlined text-[14px]">trending_down</span>
                    <span>-2.1%</span>
                  </div>
                  <span class="text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Batafsil ko'rish →</span>
                </a>
                
                <a href="#/app/tenders/filter/low" class="flex flex-col gap-3 rounded-xl p-5 border border-border-dark bg-background-dark shadow-sm hover:border-green-500/50 hover:bg-surface-dark/50 transition-all cursor-pointer group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium">Past risk</p>
                    <span class="material-symbols-outlined text-green-500 text-[20px]">verified</span>
                  </div>
                  <div>
                    <p class="text-white text-3xl font-bold tracking-tight">${stats.low.toLocaleString()}</p>
                  </div>
                  <div class="flex items-center gap-1 bg-green-500/10 w-fit px-2 py-0.5 rounded text-green-500 text-xs font-medium">
                    <span class="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>+0.8%</span>
                  </div>
                  <span class="text-green-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Batafsil ko'rish →</span>
                </a>
              </div>

              <!-- Chart and AI Panel -->
              <div class="flex flex-col lg:flex-row gap-6">
                <a href="#/app/risk-trend" class="flex-1 rounded-xl border border-border-dark bg-background-dark p-6 shadow-sm hover:border-primary/50 hover:bg-surface-dark/30 transition-all cursor-pointer group">
                  <div class="flex justify-between items-center mb-6">
                    <div>
                      <h3 class="text-white text-lg font-bold group-hover:text-primary transition-colors">Risk trendi</h3>
                      <p class="text-text-secondary text-sm">Oxirgi 30 kun ichida aniqlangan xavflar</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="flex items-baseline gap-2">
                        <span class="text-3xl font-bold text-white">156</span>
                        <span class="text-sm text-text-secondary">aniqlangan</span>
                      </div>
                      <span class="material-symbols-outlined text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                    </div>
                  </div>
                  <div class="relative w-full h-[200px] mt-4">
                    <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 478 150">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stop-color="#256af4" stop-opacity="0.3"></stop>
                          <stop offset="100%" stop-color="#256af4" stop-opacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <path d="M0 109 C50 109 50 21 100 21 C150 21 150 93 200 93 C250 93 250 33 300 33 C350 33 350 101 400 101 C450 101 450 61 478 61 V150 H0 Z" fill="url(#chartGradient)"></path>
                      <path d="M0 109 C50 109 50 21 100 21 C150 21 150 93 200 93 C250 93 250 33 300 33 C350 33 350 101 400 101 C450 101 450 61 478 61" fill="none" stroke="#256af4" stroke-linecap="round" stroke-width="3"></path>
                    </svg>
                    <div class="flex justify-between mt-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                      <span>1 NOY</span>
                      <span>5 NOY</span>
                      <span>10 NOY</span>
                      <span>15 NOY</span>
                      <span>20 NOY</span>
                      <span>25 NOY</span>
                      <span>30 NOY</span>
                    </div>
                  </div>
                  <div class="text-primary text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-center">Batafsil tahlil uchun bosing →</div>
                </a>

                <!-- AI Insights Panel -->
                <div class="lg:w-80 flex flex-col gap-4">
                  <a href="#/app/risk-trend" class="rounded-xl bg-gradient-to-br from-primary to-blue-700 p-6 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                      <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 bg-white/20 rounded-lg">
                          <span class="material-symbols-outlined text-white">psychology</span>
                        </div>
                        <span class="font-semibold tracking-wide text-sm opacity-90">AI INSIGHTS</span>
                      </div>
                      <h4 class="text-xl font-bold mb-2">3 yangi sxema aniqlandi</h4>
                      <p class="text-blue-100 text-sm mb-4">Sun'iy intellekt qurilish tenderlarida yangi kelishuv turlarini aniqladi.</p>
                      <div class="w-full py-2 bg-white text-primary text-sm font-bold rounded-lg text-center group-hover:bg-blue-50 transition-colors">
                        Batafsil ko'rish
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <!-- AI Anomaly Detection -->
              <div>
                <a href="#/app/anomaly" class="flex items-center gap-2 mb-4 group hover:opacity-80 transition-opacity cursor-pointer">
                  <span class="text-2xl">🤖</span>
                  <h3 class="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">AI aniqlagan anomaliyalar</h3>
                  <span class="material-symbols-outlined text-primary text-lg opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </a>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="anomalyGrid">
                  ${renderAnomalyCards()}
                </div>
                <a href="#/app/anomaly" class="mt-4 inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                  Barcha anomaliyalarni ko'rish
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>

              <!-- Recent Tenders -->
              <div class="glass-panel rounded-xl overflow-hidden">
                <div class="p-6 border-b border-border-dark/50 flex justify-between items-center bg-white/5">
                  <a href="#/app/tenders/filter/high" class="flex items-center gap-2 group">
                    <h2 class="text-xl font-bold text-white group-hover:text-primary transition-colors">🔴 Qizil tenderlar</h2>
                    <span class="material-symbols-outlined text-primary text-lg opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </a>
                  <a href="#/app/tenders/filter/high" class="text-primary text-sm font-medium hover:underline">Barchasini ko'rish →</a>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="bg-white/5 text-text-secondary text-xs font-bold uppercase tracking-wider">
                        <th class="px-6 py-4">ID</th>
                        <th class="px-6 py-4">Buyurtmachi</th>
                        <th class="px-6 py-4">Summa</th>
                        <th class="px-6 py-4 text-center">Risk</th>
                        <th class="px-6 py-4">Band</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-border-dark/20">
                      ${tenders.filter(t => t.riskBand === 'high').slice(0, 5).map(t => `
                        <tr class="hover:bg-white/5 transition-colors cursor-pointer" onclick="window.location.hash='/app/tenders/${t.id}'">
                          <td class="px-6 py-4 text-sm font-mono text-text-secondary">${t.id}</td>
                          <td class="px-6 py-4">
                            <div class="text-sm font-semibold text-white">${t.buyurtmachi.slice(0, 30)}${t.buyurtmachi.length > 30 ? '...' : ''}</div>
                            <div class="text-xs text-text-secondary">${t.soha}</div>
                          </td>
                          <td class="px-6 py-4 text-sm font-bold text-white">${mockData.formatSum(t.summa)}</td>
                          <td class="px-6 py-4 text-center">
                            <div class="inline-flex items-center justify-center size-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs">${t.riskScore}</div>
                          </td>
                          <td class="px-6 py-4">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                              <span class="size-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                              KRITIK XAVF
                            </span>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
  
  // Load anomalies after render
  setTimeout(() => loadAnomalies(), 500);
}

function renderAnomalyCards() {
  const anomalies = [
    {
      id: 'ANM-001',
      icon: '💰',
      title: 'Narx anomaliyasi',
      severity: 'high',
      confidence: 87,
      description: 'Tender #4920 da bozor narxidan 45% yuqori narx taklifi aniqlandi.',
      time: '2 soat oldin'
    },
    {
      id: 'ANM-002',
      icon: '🔗',
      title: 'Kompaniya aloqasi',
      severity: 'medium',
      confidence: 72,
      description: '"Build Master MChJ" va "Grand Stroy" o\'rtasida yashirin aloqalar mavjud bo\'lishi mumkin.',
      time: '5 soat oldin'
    },
    {
      id: 'ANM-003',
      icon: '📄',
      title: 'Hujjat nomuvofiqlik',
      severity: 'low',
      confidence: 58,
      description: 'Texnik topshiriqda ko\'rsatilgan talablar va taklif mos kelmayapti.',
      time: '1 kun oldin'
    }
  ];
  
  const severityColors = {
    high: { badge: 'bg-red-500/10 text-red-500 border-red-500/20', iconBg: 'bg-red-500/10', iconText: 'text-red-500', label: 'YUQORI XAVF' },
    medium: { badge: 'bg-orange-500/10 text-orange-500 border-orange-500/20', iconBg: 'bg-orange-500/10', iconText: 'text-orange-500', label: 'O\'RTA XAVF' },
    low: { badge: 'bg-blue-500/10 text-primary border-blue-500/20', iconBg: 'bg-blue-500/10', iconText: 'text-primary', label: 'TAHLIL TALAB' }
  };
  
  return anomalies.map(a => {
    const colors = severityColors[a.severity] || severityColors.medium;
    return `
      <div class="group relative overflow-hidden rounded-xl border border-border-dark bg-surface-dark/40 backdrop-blur-md p-5 hover:bg-surface-dark/60 transition-all duration-300 cursor-pointer" onclick="showAnomalyDetail('${a.id}')">
        <div class="flex justify-between items-start mb-3">
          <div class="size-10 rounded-full ${colors.iconBg} flex items-center justify-center ${colors.iconText}">
            <span class="text-lg">${a.icon}</span>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${colors.badge} border">${colors.label}</span>
        </div>
        <h4 class="text-white font-bold text-lg mb-1">${a.title}</h4>
        <p class="text-text-secondary text-sm mb-4 line-clamp-2">${a.description}</p>
        <div class="flex items-center gap-2 text-xs text-text-secondary/70">
          <span class="material-symbols-outlined text-[16px]">schedule</span>
          <span>${a.time}</span>
        </div>
      </div>
    `;
  }).join('');
}

window.renderDashboard = renderDashboard;

// Anomaly detail modal
function showAnomalyDetail(id) {
  const anomalies = {
    'ANM-001': {
      id: 'ANM-001',
      icon: '💰',
      title: 'Narx anomaliyasi',
      severity: 'high',
      confidence: 87,
      description: 'Tender #4920 da bozor narxidan 45% yuqori narx taklifi aniqlandi.',
      time: '2 soat oldin',
      signals: ['Bozor narxidan yuqori', 'Yagona taklif', 'Shoshilinch xarid'],
      targetUrl: '/app/anomaly'
    },
    'ANM-002': {
      id: 'ANM-002',
      icon: '🔗',
      title: 'Kompaniya aloqasi',
      severity: 'medium',
      confidence: 72,
      description: '"Build Master MChJ" va "Grand Stroy" ortasida yashirin aloqalar mavjud bolishi mumkin.',
      time: '5 soat oldin',
      signals: ['Birgalikda galaba', 'Bir xil bank', 'Yaqin manzillar'],
      targetUrl: '/app/analytics'
    },
    'ANM-003': {
      id: 'ANM-003',
      icon: '📄',
      title: 'Hujjat nomuvofiqlik',
      severity: 'low',
      confidence: 58,
      description: 'Texnik topshiriqda korsatilgan talablar va taklif mos kelmayapti.',
      time: '1 kun oldin',
      signals: ['Hujjat yetishmovchiligi', 'Talablarga mos kelmaslik'],
      targetUrl: '/app/tenders'
    }
  };
  
  const a = anomalies[id];
  if (!a) return;
  
  const severityConfig = {
    high: { bgClass: 'bg-red-500', textClass: 'text-red-500', label: 'YUQORI XAVF' },
    medium: { bgClass: 'bg-orange-500', textClass: 'text-orange-500', label: 'ORTA XAVF' },
    low: { bgClass: 'bg-blue-500', textClass: 'text-primary', label: 'TAHLIL TALAB' }
  };
  
  const config = severityConfig[a.severity];
  
  // Build signals HTML
  const signalsHtml = a.signals.map(function(s) {
    return '<span class="px-3 py-1 rounded-full text-xs font-medium bg-surface-dark border border-border-dark text-text-secondary">' + s + '</span>';
  }).join('');
  
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'anomalyModal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm';
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
  
  modal.innerHTML = 
    '<div class="bg-surface-dark border border-border-dark rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl">' +
      '<div class="p-6 border-b border-border-dark flex items-start justify-between">' +
        '<div class="flex items-center gap-4">' +
          '<div class="size-14 rounded-xl ' + config.bgClass + '/10 flex items-center justify-center">' +
            '<span class="text-3xl">' + a.icon + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="text-xl font-bold text-white">' + a.title + '</h3>' +
            '<div class="flex items-center gap-2 mt-1">' +
              '<span class="px-2 py-0.5 rounded-full text-xs font-bold ' + config.bgClass + '/10 ' + config.textClass + ' border border-white/10">' + config.label + '</span>' +
              '<span class="text-text-secondary text-xs">' + a.time + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<button onclick="document.getElementById(\'anomalyModal\').remove()" class="text-text-secondary hover:text-white transition-colors">' +
          '<span class="material-symbols-outlined">close</span>' +
        '</button>' +
      '</div>' +
      '<div class="p-6 space-y-4">' +
        '<p class="text-text-secondary">' + a.description + '</p>' +
        '<div class="flex items-center gap-3">' +
          '<span class="text-text-secondary text-sm">Ishonch darajasi:</span>' +
          '<div class="flex-1 h-2 bg-background-dark rounded-full overflow-hidden">' +
            '<div class="h-full ' + config.bgClass + ' rounded-full" style="width: ' + a.confidence + '%"></div>' +
          '</div>' +
          '<span class="text-white font-bold">' + a.confidence + '%</span>' +
        '</div>' +
        '<div>' +
          '<h4 class="text-white font-semibold mb-2">Aniqlangan signallar:</h4>' +
          '<div class="flex flex-wrap gap-2">' + signalsHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p-6 border-t border-border-dark flex gap-3">' +
        '<button onclick="window.location.hash=\'' + a.targetUrl + '\'" class="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">' +
          'Batafsil tahlil' +
        '</button>' +
        '<button onclick="document.getElementById(\'anomalyModal\').remove()" class="px-6 py-3 border border-border-dark text-text-secondary font-medium rounded-xl hover:bg-surface-dark transition-colors">' +
          'Yopish' +
        '</button>' +
      '</div>' +
    '</div>';
  
  document.body.appendChild(modal);
}

window.showAnomalyDetail = showAnomalyDetail;
