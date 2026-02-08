// ============================================
// PAGES - AI Analytics Statistics
// ============================================

function renderAIStats() {
  // AI model statistics data
  const aiStats = {
    accuracy: 96.8,
    targetAccuracy: 95,
    totalAnalyzed: 1240,
    truePositives: 892,
    falsePositives: 28,
    trueNegatives: 287,
    falseNegatives: 33,
    precision: 96.9,
    recall: 96.4,
    f1Score: 96.6
  };
  
  // Monthly accuracy trend
  const monthlyTrend = [
    { month: 'Yanvar', accuracy: 91.2 },
    { month: 'Fevral', accuracy: 92.8 },
    { month: 'Mart', accuracy: 93.5 },
    { month: 'Aprel', accuracy: 94.1 },
    { month: 'May', accuracy: 95.3 },
    { month: 'Iyun', accuracy: 95.9 },
    { month: 'Iyul', accuracy: 96.8 }
  ];
  
  // AI detection categories
  const detectionCategories = [
    { name: 'Narx manipulyatsiyasi', count: 287, accuracy: 97.2, icon: 'currency_exchange' },
    { name: 'Kartel kelishuvlari', count: 156, accuracy: 95.8, icon: 'hub' },
    { name: 'Konflikt manfaatlari', count: 198, accuracy: 96.5, icon: 'warning' },
    { name: 'Texnik talablar buzilishi', count: 234, accuracy: 97.1, icon: 'build' },
    { name: 'Korrupsiya alomatlari', count: 365, accuracy: 96.9, icon: 'gavel' }
  ];

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
            <a href="#/app/analytics" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Tahlillar</a>
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
            <a href="#/app/analytics" class="flex items-center justify-center size-10 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors">
              <span class="material-symbols-outlined">arrow_back</span>
            </a>
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-12 rounded-xl bg-green-500/20">
                <span class="material-symbols-outlined text-green-500 text-2xl">auto_awesome</span>
              </div>
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-white">AI Aniqlik Statistikasi</h1>
                <p class="text-text-secondary text-sm mt-1">Sun'iy intellekt modeli ishlashi va natijalari</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500/10 text-green-500 border border-green-500/20">
              <span class="material-symbols-outlined text-sm align-middle mr-1">check_circle</span>
              Model faol
            </span>
          </div>
        </div>

        <!-- Main Accuracy Card -->
        <div class="glass-panel p-8 rounded-xl mb-8">
          <div class="flex flex-col lg:flex-row items-center gap-8">
            <!-- Accuracy Circle -->
            <div class="relative size-48 shrink-0">
              <svg class="size-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" stroke-width="8" 
                        stroke-dasharray="282.7" stroke-dashoffset="${282.7 * (1 - aiStats.accuracy / 100)}" 
                        stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-4xl font-black text-white">${aiStats.accuracy}%</span>
                <span class="text-text-secondary text-sm">Aniqlik</span>
              </div>
            </div>
            
            <!-- Stats Grid -->
            <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div class="bg-surface-dark/50 rounded-xl p-4">
                <p class="text-text-secondary text-xs font-medium mb-1">Tahlil qilingan</p>
                <p class="text-white text-2xl font-bold">${aiStats.totalAnalyzed.toLocaleString()}</p>
                <p class="text-text-secondary text-xs">tender</p>
              </div>
              <div class="bg-surface-dark/50 rounded-xl p-4">
                <p class="text-text-secondary text-xs font-medium mb-1">Precision</p>
                <p class="text-green-500 text-2xl font-bold">${aiStats.precision}%</p>
                <p class="text-text-secondary text-xs">aniqlik darajasi</p>
              </div>
              <div class="bg-surface-dark/50 rounded-xl p-4">
                <p class="text-text-secondary text-xs font-medium mb-1">Recall</p>
                <p class="text-primary text-2xl font-bold">${aiStats.recall}%</p>
                <p class="text-text-secondary text-xs">qamrov darajasi</p>
              </div>
              <div class="bg-surface-dark/50 rounded-xl p-4">
                <p class="text-text-secondary text-xs font-medium mb-1">F1 Score</p>
                <p class="text-purple-500 text-2xl font-bold">${aiStats.f1Score}%</p>
                <p class="text-text-secondary text-xs">umumiy ko'rsatkich</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Confusion Matrix & Trend -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Confusion Matrix -->
          <div class="glass-panel p-6 rounded-xl">
            <h3 class="text-white text-lg font-bold mb-4">Confusion Matrix</h3>
            <p class="text-text-secondary text-sm mb-6">Model bashoratlarining to'g'riligi</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p class="text-green-500 text-3xl font-bold">${aiStats.truePositives}</p>
                <p class="text-text-secondary text-xs mt-1">True Positives</p>
                <p class="text-green-500/70 text-xs">To'g'ri aniqlangan xavflar</p>
              </div>
              <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                <p class="text-red-500 text-3xl font-bold">${aiStats.falsePositives}</p>
                <p class="text-text-secondary text-xs mt-1">False Positives</p>
                <p class="text-red-500/70 text-xs">Noto'g'ri signal</p>
              </div>
              <div class="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
                <p class="text-orange-500 text-3xl font-bold">${aiStats.falseNegatives}</p>
                <p class="text-text-secondary text-xs mt-1">False Negatives</p>
                <p class="text-orange-500/70 text-xs">O'tkazib yuborilgan</p>
              </div>
              <div class="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                <p class="text-primary text-3xl font-bold">${aiStats.trueNegatives}</p>
                <p class="text-text-secondary text-xs mt-1">True Negatives</p>
                <p class="text-primary/70 text-xs">To'g'ri rad etilgan</p>
              </div>
            </div>
          </div>

          <!-- Monthly Trend -->
          <div class="glass-panel p-6 rounded-xl">
            <h3 class="text-white text-lg font-bold mb-4">Oylik aniqlik dinamikasi</h3>
            <p class="text-text-secondary text-sm mb-6">Model yaxshilanish tendensiyasi</p>
            <div class="space-y-3">
              ${monthlyTrend.map(item => `
                <div class="flex items-center gap-3">
                  <span class="text-text-secondary text-xs w-16">${item.month}</span>
                  <div class="flex-1 h-6 bg-surface-dark rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-primary to-green-500 rounded-full flex items-center justify-end pr-2" 
                         style="width: ${item.accuracy}%">
                      <span class="text-xs font-bold text-white">${item.accuracy}%</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Detection Categories -->
        <div class="glass-panel p-6 rounded-xl">
          <h3 class="text-white text-lg font-bold mb-4">Aniqlash kategoriyalari</h3>
          <p class="text-text-secondary text-sm mb-6">AI modeli tomonidan aniqlanadigan qoidabuzarlik turlari</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${detectionCategories.map(cat => `
              <div class="bg-surface-dark/50 rounded-xl p-4 flex items-start gap-4 hover:bg-surface-dark transition-colors">
                <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">${cat.icon}</span>
                </div>
                <div class="flex-1">
                  <p class="text-white font-semibold text-sm">${cat.name}</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-text-secondary text-xs">${cat.count} ta aniqlangan</span>
                    <span class="text-green-500 text-xs font-bold">${cat.accuracy}%</span>
                  </div>
                  <div class="w-full h-1.5 bg-surface-dark rounded-full mt-2 overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: ${cat.accuracy}%"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

// Make function globally available
window.renderAIStats = renderAIStats;
