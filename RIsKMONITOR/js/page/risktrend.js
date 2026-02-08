// ============================================
// PAGES - Risk Trend Analysis (AI-Powered)
// ============================================

function renderRiskTrend() {
  const trendData = mockData.getRiskTrendData();
  const stats = mockData.getStats();
  const topBuyers = mockData.getTopRiskyBuyers();
  const topCompanies = mockData.getTopSignaledCompanies();
  
  // Calculate trend statistics
  const totalSignals = trendData.reduce((sum, w) => sum + w.high + w.medium + w.low, 0);
  const highRiskTotal = trendData.reduce((sum, w) => sum + w.high, 0);
  const avgHighPerWeek = Math.round(highRiskTotal / trendData.length);
  
  // Calculate trend direction (comparing last 2 weeks)
  const lastWeek = trendData[trendData.length - 1];
  const prevWeek = trendData[trendData.length - 2];
  const trendDirection = lastWeek.high > prevWeek.high ? 'up' : lastWeek.high < prevWeek.high ? 'down' : 'stable';
  const trendChange = Math.abs(lastWeek.high - prevWeek.high);
  
  // AI Insights based on data patterns
  const aiInsights = generateAIInsights(trendData, topBuyers, topCompanies);

  document.body.innerHTML = `
    <div class="bg-background-dark text-white font-display min-h-screen overflow-y-auto">
      <!-- Header -->
      <header class="flex items-center justify-between whitespace-nowrap border-b border-surface-dark bg-background-dark/80 backdrop-blur-md px-6 py-3 z-10 sticky top-0">
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
            <a href="#/app/knowledge-base" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bilimlar bazasi</a>
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

      <main class="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div class="flex items-center gap-4">
            <a href="#/app/dashboard" class="flex items-center justify-center size-10 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors">
              <span class="material-symbols-outlined">arrow_back</span>
            </a>
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-12 rounded-xl bg-primary/20">
                <span class="material-symbols-outlined text-primary text-2xl">trending_up</span>
              </div>
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-white">Risk Trendi Tahlili</h1>
                <p class="text-text-secondary text-sm mt-1">AI quvvatlangan chuqur tahlil</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <select class="bg-surface-dark border border-border-dark rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
              <option>Oxirgi 8 hafta</option>
              <option>Oxirgi 30 kun</option>
              <option>Oxirgi 3 oy</option>
              <option>Oxirgi 6 oy</option>
            </select>
            <button class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">download</span>
              Export
            </button>
          </div>
        </div>

        <!-- KPI Summary -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-border-dark bg-background-dark">
            <div class="flex items-center justify-between">
              <p class="text-text-secondary text-sm font-medium">Jami signallar</p>
              <span class="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
            </div>
            <p class="text-white text-3xl font-bold">${totalSignals}</p>
            <p class="text-text-secondary text-xs">8 haftalik davr</p>
          </div>
          
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-red-500/30 bg-red-500/5">
            <div class="flex items-center justify-between">
              <p class="text-text-secondary text-sm font-medium">Yuqori risk signallari</p>
              <span class="material-symbols-outlined text-red-500 text-[20px]">warning</span>
            </div>
            <p class="text-white text-3xl font-bold">${highRiskTotal}</p>
            <div class="flex items-center gap-1 ${trendDirection === 'up' ? 'text-red-500' : trendDirection === 'down' ? 'text-green-500' : 'text-text-secondary'} text-xs">
              <span class="material-symbols-outlined text-[14px]">${trendDirection === 'up' ? 'trending_up' : trendDirection === 'down' ? 'trending_down' : 'trending_flat'}</span>
              <span>${trendDirection === 'up' ? '+' : trendDirection === 'down' ? '-' : ''}${trendChange} oxirgi haftada</span>
            </div>
          </div>
          
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-border-dark bg-background-dark">
            <div class="flex items-center justify-between">
              <p class="text-text-secondary text-sm font-medium">Haftalik o'rtacha</p>
              <span class="material-symbols-outlined text-orange-500 text-[20px]">analytics</span>
            </div>
            <p class="text-white text-3xl font-bold">${avgHighPerWeek}</p>
            <p class="text-text-secondary text-xs">Yuqori risk/hafta</p>
          </div>
          
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-border-dark bg-background-dark">
            <div class="flex items-center justify-between">
              <p class="text-text-secondary text-sm font-medium">Ochiq keyslar</p>
              <span class="material-symbols-outlined text-blue-500 text-[20px]">folder_open</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.openCases}</p>
            <a href="#/app/cases" class="text-primary text-xs hover:underline">Keyslarni ko'rish →</a>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Main Trend Chart -->
          <div class="lg:col-span-2 rounded-xl border border-border-dark bg-background-dark p-6">
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="text-white text-lg font-bold">Haftalik Risk Trendi</h3>
                <p class="text-text-secondary text-sm">Oxirgi 8 hafta ichida aniqlangan xavflar</p>
              </div>
              <div class="flex items-center gap-4 text-xs">
                <div class="flex items-center gap-2">
                  <div class="size-3 rounded-full bg-red-500"></div>
                  <span class="text-text-secondary">Yuqori</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="size-3 rounded-full bg-orange-500"></div>
                  <span class="text-text-secondary">O'rta</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="size-3 rounded-full bg-green-500"></div>
                  <span class="text-text-secondary">Past</span>
                </div>
              </div>
            </div>
            
            <!-- Bar Chart -->
            <div class="relative h-[300px] flex items-end gap-2">
              ${trendData.map((week, idx) => {
                const maxValue = Math.max(...trendData.map(w => w.high + w.medium + w.low));
                const total = week.high + week.medium + week.low;
                const highHeight = (week.high / maxValue) * 100;
                const mediumHeight = (week.medium / maxValue) * 100;
                const lowHeight = (week.low / maxValue) * 100;
                
                return `
                  <div class="flex-1 flex flex-col items-center gap-1">
                    <div class="w-full flex flex-col-reverse items-center" style="height: 250px;">
                      <div class="w-full bg-green-500 rounded-t-sm transition-all hover:opacity-80" style="height: ${lowHeight}%" title="${week.low} past risk"></div>
                      <div class="w-full bg-orange-500 transition-all hover:opacity-80" style="height: ${mediumHeight}%" title="${week.medium} o'rta risk"></div>
                      <div class="w-full bg-red-500 rounded-t-lg transition-all hover:opacity-80" style="height: ${highHeight}%" title="${week.high} yuqori risk"></div>
                    </div>
                    <span class="text-text-secondary text-xs font-medium">${week.week.split(' ')[0]}</span>
                    <span class="text-white text-sm font-bold">${total}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- AI Insights Panel -->
          <div class="flex flex-col gap-4">
            <div class="rounded-xl bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-6 text-white shadow-lg relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-2 bg-white/20 rounded-lg">
                    <span class="material-symbols-outlined text-white">psychology</span>
                  </div>
                  <span class="font-semibold tracking-wide text-sm opacity-90">AI TAHLILI</span>
                </div>
                <h4 class="text-xl font-bold mb-3">${aiInsights.title}</h4>
                <p class="text-blue-100 text-sm mb-4 leading-relaxed">${aiInsights.summary}</p>
                <div class="flex items-center gap-2 text-xs text-blue-200 mb-4">
                  <span class="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Yangilangan: Hozirgina</span>
                </div>
              </div>
            </div>

            <!-- Risk Predictions -->
            <div class="rounded-xl border border-border-dark bg-background-dark p-5">
              <div class="flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-purple-500">auto_awesome</span>
                <h4 class="text-white font-semibold">AI Prognoz</h4>
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-dark/50">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-red-500 text-[18px]">arrow_upward</span>
                    <span class="text-text-secondary text-sm">Keyingi hafta</span>
                  </div>
                  <span class="text-red-500 font-bold">+${Math.floor(Math.random() * 3) + 1} signal</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-dark/50">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-orange-500 text-[18px]">warning</span>
                    <span class="text-text-secondary text-sm">Risk zonasi</span>
                  </div>
                  <span class="text-orange-500 font-bold">Qurilish</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-dark/50">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-blue-500 text-[18px]">trending_up</span>
                    <span class="text-text-secondary text-sm">Ishonch darajasi</span>
                  </div>
                  <span class="text-blue-500 font-bold">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Analysis Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- AI Pattern Detection -->
          <div class="rounded-xl border border-border-dark bg-background-dark p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-purple-500/20 rounded-lg">
                  <span class="material-symbols-outlined text-purple-500">pattern</span>
                </div>
                <h3 class="text-white font-bold">Aniqlangan Patternlar</h3>
              </div>
              <span class="text-xs text-text-secondary bg-surface-dark px-2 py-1 rounded">AI tomonidan</span>
            </div>
            <div class="space-y-4">
              ${aiInsights.patterns.map((pattern, idx) => `
                <div class="flex items-start gap-4 p-4 rounded-lg bg-surface-dark/30 border border-border-dark/50">
                  <div class="flex items-center justify-center size-8 rounded-lg bg-${pattern.color}/20 shrink-0">
                    <span class="material-symbols-outlined text-${pattern.color} text-[18px]">${pattern.icon}</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-white font-semibold text-sm mb-1">${pattern.title}</h4>
                    <p class="text-text-secondary text-xs leading-relaxed">${pattern.description}</p>
                  </div>
                  <span class="px-2 py-1 rounded text-xs font-medium ${pattern.severity === 'high' ? 'bg-red-500/20 text-red-500' : pattern.severity === 'medium' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}">${pattern.severity === 'high' ? 'Yuqori' : pattern.severity === 'medium' ? 'O\'rta' : 'Past'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Top Risky Buyers -->
          <div class="rounded-xl border border-border-dark bg-background-dark p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-red-500/20 rounded-lg">
                  <span class="material-symbols-outlined text-red-500">business</span>
                </div>
                <h3 class="text-white font-bold">Eng Ko'p Signalli Buyurtmachilar</h3>
              </div>
            </div>
            <div class="space-y-3">
              ${topBuyers.slice(0, 5).map((buyer, idx) => `
                <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-dark/50 transition-colors">
                  <div class="flex items-center justify-center size-8 rounded-full bg-surface-dark text-text-secondary font-bold text-sm">${idx + 1}</div>
                  <div class="flex-1 min-w-0">
                    <p class="text-white text-sm font-medium truncate">${buyer.name}</p>
                    <p class="text-text-secondary text-xs">${buyer.tenderCount} tender</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-20 h-2 bg-surface-dark rounded-full overflow-hidden">
                      <div class="h-full ${buyer.avgRisk >= 70 ? 'bg-red-500' : buyer.avgRisk >= 40 ? 'bg-orange-500' : 'bg-green-500'}" style="width: ${buyer.avgRisk}%"></div>
                    </div>
                    <span class="text-${buyer.avgRisk >= 70 ? 'red' : buyer.avgRisk >= 40 ? 'orange' : 'green'}-500 font-bold text-sm w-8">${buyer.avgRisk}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- AI Recommendations -->
        <div class="rounded-xl border border-border-dark bg-background-dark p-6 mb-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 bg-green-500/20 rounded-lg">
              <span class="material-symbols-outlined text-green-500">lightbulb</span>
            </div>
            <h3 class="text-white font-bold">AI Tavsiyalari</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${aiInsights.recommendations.map((rec, idx) => `
              <div class="p-4 rounded-lg bg-surface-dark/30 border border-border-dark/50">
                <div class="flex items-center gap-2 mb-3">
                  <span class="material-symbols-outlined text-${rec.color} text-[20px]">${rec.icon}</span>
                  <span class="text-white text-sm font-semibold">${rec.title}</span>
                </div>
                <p class="text-text-secondary text-xs leading-relaxed mb-3">${rec.description}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs px-2 py-1 rounded ${rec.priority === 'high' ? 'bg-red-500/20 text-red-500' : rec.priority === 'medium' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}">${rec.priority === 'high' ? 'Shoshilinch' : rec.priority === 'medium' ? 'Muhim' : 'Maslahat'}</span>
                  <button class="text-primary text-xs font-medium hover:underline">Amallar →</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

// Generate AI Insights based on trend data
function generateAIInsights(trendData, topBuyers, topCompanies) {
  // Analyze trend direction
  const recentHigh = trendData.slice(-3).reduce((sum, w) => sum + w.high, 0);
  const earlierHigh = trendData.slice(0, 3).reduce((sum, w) => sum + w.high, 0);
  const isIncreasing = recentHigh > earlierHigh;
  
  return {
    title: isIncreasing 
      ? "Risk signallari o'sish tendensiyasida" 
      : "Risk signallari barqaror holatda",
    summary: isIncreasing
      ? "Oxirgi 3 haftada yuqori risk signallari oldingi davrlarga nisbatan 15% ko'paydi. Ayniqsa qurilish va energetika sohalarida ehtiyot bo'lish tavsiya etiladi."
      : "Tizim barqaror ishlayapti. Biroq, bir nechta takroriy patternlar aniqlandi va ularni tekshirish tavsiya etiladi.",
    patterns: [
      {
        title: "Takroriy g'oliblar",
        description: "3 ta kompaniya oxirgi 8 haftada 5+ marta tender yutgan. Bu kartel kelishuvlariga ishora qilishi mumkin.",
        icon: "repeat",
        color: "red-500",
        severity: "high"
      },
      {
        title: "Narx o'xshashligi",
        description: "18% hollarda ishtirokchilar narxlari 5% dan kam farq qiladi. Bu koordinatsiyalangan harakatga dalil bo'lishi mumkin.",
        icon: "attach_money",
        color: "orange-500",
        severity: "medium"
      },
      {
        title: "Yangi kompaniyalar",
        description: "Oxirgi 30 kunda tashkil etilgan 4 ta kompaniya yirik tenderlar yutdi.",
        icon: "apartment",
        color: "blue-500",
        severity: "low"
      }
    ],
    recommendations: [
      {
        title: "Qurilish sohasi tekshiruvi",
        description: "Qurilish tenderlarida yuqori risk signallari aniqlandi. Ushbu sohada chuqurroq tekshiruv o'tkazishni tavsiya etamiz.",
        icon: "construction",
        color: "red-500",
        priority: "high"
      },
      {
        title: "Kompaniya aloqalarini tahlil qilish",
        description: "Bir nechta kompaniyalar o'rtasida bog'liqlik aniqlandi. Ularning ta'sischilarini tekshiring.",
        icon: "share",
        color: "orange-500",
        priority: "medium"
      },
      {
        title: "Haftalik monitoring",
        description: "Risk signallarini real-time kuzatib boring va haftalik hisobotlar tayyorlang.",
        icon: "schedule",
        color: "blue-500",
        priority: "low"
      }
    ]
  };
}

// Make function globally available
window.renderRiskTrend = renderRiskTrend;
