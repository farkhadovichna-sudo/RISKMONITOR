// ============================================
// PAGES - Anomaly (New Stitch Design)
// ============================================

function renderAnomaly() {
  const anomalies = [
    { id: 'PRC-001', tender: 'TND-2024-00089', type: 'Yuqori narx', expected: '45,000,000', actual: '78,500,000', diff: '+74.4%', severity: 'high', date: '2024-01-15', company: 'BuildMax MChJ' },
    { id: 'PRC-002', tender: 'TND-2024-00091', type: 'Past narx', expected: '120,000,000', actual: '42,000,000', diff: '-65.0%', severity: 'high', date: '2024-01-14', company: 'TechSupply Co' },
    { id: 'PRC-003', tender: 'TND-2024-00095', type: 'G\'olib narxi', expected: '85,000,000', actual: '98,200,000', diff: '+15.5%', severity: 'medium', date: '2024-01-13', company: 'Grand Stroy' },
    { id: 'PRC-004', tender: 'TND-2024-00102', type: 'Bozor narxi', expected: '200,000,000', actual: '215,000,000', diff: '+7.5%', severity: 'low', date: '2024-01-12', company: 'Epsilon LLC' },
  ];
  
  document.body.innerHTML = `
    <div class="bg-background-dark font-display text-slate-100 antialiased min-h-screen">
      <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <!-- Header -->
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-6 py-3 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div class="flex items-center gap-8 w-full max-w-4xl">
            <a href="#/app/dashboard" class="flex items-center gap-3 text-white shrink-0">
              <span class="material-symbols-outlined text-primary text-2xl">security</span>
              <span class="text-lg font-bold tracking-tight">RiskMonitor</span>
            </a>
            <nav class="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <a href="#/app/dashboard" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bosh sahifa</a>
              <a href="#/app/tenders" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Tenderlar</a>
              <a href="#/app/cases" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Keyslar</a>
              <a href="#/app/analytics" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Tahlillar</a>
              <a href="#/app/anomaly" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Narx anomaliyasi</a>
              <a href="#/app/reports" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Hisobot</a>
            </nav>
          </div>
          <div class="flex flex-1 justify-end gap-6 items-center">
            <button class="flex items-center justify-center rounded-lg size-10 bg-surface-dark text-white hover:bg-[#2d3f61] transition-colors relative">
              <span class="material-symbols-outlined text-[20px]">notifications</span>
              <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center border-2 border-surface-dark text-white font-bold">A</div>
          </div>
        </header>

        <main class="px-10 py-8 max-w-7xl mx-auto w-full">
          <div class="flex flex-col gap-8">
            <!-- Page Header -->
            <div class="flex flex-wrap justify-between gap-4">
              <div class="flex flex-col gap-2">
                <h1 class="text-white text-4xl font-black leading-tight tracking-tight">Narx Anomaliyasi Tahlili</h1>
                <p class="text-text-secondary text-lg">AI yordamida aniqlangan g'ayrioddiy narx farqlari</p>
              </div>
              <button class="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold transition-all text-sm">
                <span class="material-symbols-outlined text-lg">download</span>
                Hisobot yuklash
              </button>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="glass-panel p-6 rounded-xl flex items-center gap-4 border-red-500/30 bg-red-500/5">
                <div class="size-14 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500">
                  <span class="material-symbols-outlined text-3xl">trending_up</span>
                </div>
                <div>
                  <p class="text-text-secondary text-sm">Yuqori anomaliyalar</p>
                  <p class="text-white text-3xl font-black">24</p>
                  <p class="text-red-400 text-xs">+8 yangi</p>
                </div>
              </div>
              <div class="glass-panel p-6 rounded-xl flex items-center gap-4 border-orange-500/30 bg-orange-500/5">
                <div class="size-14 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <span class="material-symbols-outlined text-3xl">show_chart</span>
                </div>
                <div>
                  <p class="text-text-secondary text-sm">O'rtacha og'ish</p>
                  <p class="text-white text-3xl font-black">32.5%</p>
                  <p class="text-orange-400 text-xs">Bozor narxidan</p>
                </div>
              </div>
              <div class="glass-panel p-6 rounded-xl flex items-center gap-4 border-primary/30 bg-primary/5">
                <div class="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined text-3xl">savings</span>
                </div>
                <div>
                  <p class="text-text-secondary text-sm">Potensial yo'qotish</p>
                  <p class="text-white text-3xl font-black">2.4 <span class="text-lg">mlrd</span></p>
                  <p class="text-primary text-xs">so'm</p>
                </div>
              </div>
            </div>

            <!-- Price Dynamics Chart -->
            <div class="glass-panel p-6 rounded-xl">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="text-white text-xl font-bold">Narx dinamikasi vizualizatsiyasi</h3>
                  <p class="text-text-secondary text-sm">Kutilgan vs haqiqiy narxlar taqqoslash grafigi</p>
                </div>
                <div class="flex gap-4">
                  <div class="flex items-center gap-2">
                    <span class="size-3 rounded-full bg-primary"></span>
                    <span class="text-sm text-text-secondary">Kutilgan narx</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="size-3 rounded-full bg-red-500"></span>
                    <span class="text-sm text-text-secondary">Haqiqiy narx</span>
                  </div>
                </div>
              </div>
              <div class="relative h-64 w-full">
                <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 180">
                  <!-- Grid lines -->
                  <line x1="0" y1="45" x2="500" y2="45" stroke="#2d3a54" stroke-width="1"/>
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#2d3a54" stroke-width="1"/>
                  <line x1="0" y1="135" x2="500" y2="135" stroke="#2d3a54" stroke-width="1"/>
                  
                  <!-- Expected line (blue) -->
                  <path d="M0 100 L100 90 L200 80 L300 95 L400 85 L500 90" fill="none" stroke="#256af4" stroke-width="2.5" stroke-dasharray="8 4"/>
                  
                  <!-- Actual line (red with anomaly spikes) -->
                  <path d="M0 95 L100 40 L200 120 L300 60 L400 75 L500 85" fill="none" stroke="#ef4444" stroke-width="3"/>
                  
                  <!-- Anomaly highlight circles -->
                  <circle cx="100" cy="40" r="8" fill="#ef4444" opacity="0.3"/>
                  <circle cx="100" cy="40" r="4" fill="#ef4444"/>
                  <circle cx="200" cy="120" r="8" fill="#ef4444" opacity="0.3"/>
                  <circle cx="200" cy="120" r="4" fill="#ef4444"/>
                  <circle cx="300" cy="60" r="8" fill="#f59e0b" opacity="0.3"/>
                  <circle cx="300" cy="60" r="4" fill="#f59e0b"/>
                </svg>
              </div>
              <div class="flex justify-between text-xs text-text-secondary uppercase tracking-wider mt-4">
                <span>Yanvar</span>
                <span>Fevral</span>
                <span>Mart</span>
                <span>Aprel</span>
                <span>May</span>
                <span>Iyun</span>
              </div>
            </div>

            <!-- Anomalies Table -->
            <div class="glass-panel rounded-xl overflow-hidden">
              <div class="p-6 border-b border-border-dark flex justify-between items-center">
                <h2 class="text-white text-xl font-bold">Aniqlangan narx anomaliyalari</h2>
                <div class="flex gap-2">
                  <button class="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">Yuqori (${anomalies.filter(a => a.severity === 'high').length})</button>
                  <button class="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 text-xs font-bold border border-orange-500/20">O'rta (${anomalies.filter(a => a.severity === 'medium').length})</button>
                  <button class="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">Past (${anomalies.filter(a => a.severity === 'low').length})</button>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr class="bg-surface-dark/30 text-text-secondary text-xs uppercase tracking-wider">
                      <th class="px-6 py-4 font-semibold">ID</th>
                      <th class="px-6 py-4 font-semibold">Tender</th>
                      <th class="px-6 py-4 font-semibold">Kompaniya</th>
                      <th class="px-6 py-4 font-semibold">Anomaliya turi</th>
                      <th class="px-6 py-4 font-semibold text-right">Kutilgan</th>
                      <th class="px-6 py-4 font-semibold text-right">Haqiqiy</th>
                      <th class="px-6 py-4 font-semibold text-center">Farq</th>
                      <th class="px-6 py-4 font-semibold text-center">Xavf</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-dark">
                    ${anomalies.map(a => {
                      const severityConfig = {
                        high: { color: 'red', label: 'KRITIK' },
                        medium: { color: 'orange', label: 'O\'RTA' },
                        low: { color: 'green', label: 'PAST' }
                      };
                      const config = severityConfig[a.severity];
                      return `
                        <tr class="hover:bg-surface-dark/20 transition-colors">
                          <td class="px-6 py-4 text-xs font-mono text-text-secondary">${a.id}</td>
                          <td class="px-6 py-4">
                            <a href="#/app/tenders/${a.tender}" class="text-primary hover:underline text-sm font-medium">${a.tender}</a>
                          </td>
                          <td class="px-6 py-4 text-white text-sm">${a.company}</td>
                          <td class="px-6 py-4">
                            <span class="px-2 py-1 bg-surface-dark text-text-secondary text-[10px] font-bold rounded">${a.type}</span>
                          </td>
                          <td class="px-6 py-4 text-right text-sm text-text-secondary">${a.expected} so'm</td>
                          <td class="px-6 py-4 text-right text-sm font-bold text-white">${a.actual} so'm</td>
                          <td class="px-6 py-4 text-center">
                            <span class="text-sm font-bold text-${config.color}-500">${a.diff}</span>
                          </td>
                          <td class="px-6 py-4 text-center">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-${config.color}-500/10 text-${config.color}-500 border border-${config.color}-500/20">
                              ${a.severity === 'high' ? '<span class="size-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>' : ''}
                              ${config.label}
                            </span>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Risk Analysis Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="glass-panel p-6 rounded-xl">
                <div class="flex items-center gap-3 mb-4">
                  <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined">psychology</span>
                  </div>
                  <h3 class="text-white text-lg font-bold">AI Tahlili</h3>
                </div>
                <ul class="space-y-3 text-text-secondary text-sm">
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-green-500 text-lg flex-shrink-0">check_circle</span>
                    <span>Eng ko'p anomaliya <strong class="text-white">qurilish</strong> sohasida aniqlangan (67%)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-orange-500 text-lg flex-shrink-0">warning</span>
                    <span>O'rtacha narx og'ishi bozor ko'rsatkichidan <strong class="text-white">2.3 baravar</strong> yuqori</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-red-500 text-lg flex-shrink-0">flag</span>
                    <span>3 ta kompaniya <strong class="text-white">takroriy anomaliyalar</strong> bilan belgilangan</span>
                  </li>
                </ul>
              </div>
              <div class="glass-panel p-6 rounded-xl border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                <div class="flex items-center gap-3 mb-4">
                  <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined">lightbulb</span>
                  </div>
                  <h3 class="text-white text-lg font-bold">Tavsiyalar</h3>
                </div>
                <ul class="space-y-3 text-text-secondary text-sm">
                  <li class="flex items-start gap-2">
                    <span class="text-primary">1.</span>
                    <span>Qurilish sohasidagi tenderlar uchun <strong class="text-white">qo'shimcha tekshiruv</strong> o'tkazish</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">2.</span>
                    <span>Takroriy anomaliyalar aniqlangan kompaniyalarni <strong class="text-white">"Kuzatuv"</strong> ro'yxatiga qo'shish</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">3.</span>
                    <span>Bozor narxlari ma'lumotlar bazasini <strong class="text-white">yangilash</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
}

window.renderAnomaly = renderAnomaly;
