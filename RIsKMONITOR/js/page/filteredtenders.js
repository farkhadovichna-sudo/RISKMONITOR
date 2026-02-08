// ============================================
// PAGES - Filtered Tenders (by Risk Level)
// ============================================

function renderFilteredTenders(filter = 'all') {
  const allTenders = mockData.TENDERS;
  
  // Filter tenders based on parameter
  let filteredTenders = allTenders;
  let pageTitle = 'Jami Tenderlar';
  let pageDescription = 'Barcha tenderlar ro\'yxati';
  let headerColor = 'primary';
  let headerIcon = 'folder_open';
  
  switch(filter) {
    case 'high':
      filteredTenders = allTenders.filter(t => t.riskBand === 'high');
      pageTitle = 'Yuqori Riskli Tenderlar';
      pageDescription = 'Diqqatga loyiq tenderlar - 70+ risk balli';
      headerColor = 'red-500';
      headerIcon = 'warning';
      break;
    case 'medium':
      filteredTenders = allTenders.filter(t => t.riskBand === 'medium');
      pageTitle = 'O\'rta Riskli Tenderlar';
      pageDescription = 'O\'rtacha risk darajasidagi tenderlar - 40-69 ball';
      headerColor = 'orange-500';
      headerIcon = 'error';
      break;
    case 'low':
      filteredTenders = allTenders.filter(t => t.riskBand === 'low');
      pageTitle = 'Past Riskli Tenderlar';
      pageDescription = 'Past risk darajasidagi tenderlar - 40 dan kam ball';
      headerColor = 'green-500';
      headerIcon = 'verified';
      break;
    default:
      // All tenders
      break;
  }
  
  // Generate stats for this filter
  const stats = {
    total: filteredTenders.length,
    totalSum: filteredTenders.reduce((sum, t) => sum + t.summa, 0),
    avgRisk: filteredTenders.length > 0 
      ? Math.round(filteredTenders.reduce((sum, t) => sum + t.riskScore, 0) / filteredTenders.length) 
      : 0
  };

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
            <a href="#/app/tenders" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Tenderlar</a>
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
              <div class="flex items-center justify-center size-12 rounded-xl bg-${headerColor}/20">
                <span class="material-symbols-outlined text-${headerColor} text-2xl">${headerIcon}</span>
              </div>
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-white">${pageTitle}</h1>
                <p class="text-text-secondary text-sm mt-1">${pageDescription}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a href="#/app/tenders/filter/all" class="px-3 py-1.5 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-primary text-white' : 'bg-surface-dark text-text-secondary hover:text-white'}">Barchasi</a>
            <a href="#/app/tenders/filter/high" class="px-3 py-1.5 rounded-lg text-sm font-medium ${filter === 'high' ? 'bg-red-500 text-white' : 'bg-surface-dark text-text-secondary hover:text-white'}">Yuqori</a>
            <a href="#/app/tenders/filter/medium" class="px-3 py-1.5 rounded-lg text-sm font-medium ${filter === 'medium' ? 'bg-orange-500 text-white' : 'bg-surface-dark text-text-secondary hover:text-white'}">O'rta</a>
            <a href="#/app/tenders/filter/low" class="px-3 py-1.5 rounded-lg text-sm font-medium ${filter === 'low' ? 'bg-green-500 text-white' : 'bg-surface-dark text-text-secondary hover:text-white'}">Past</a>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-border-dark bg-background-dark">
            <p class="text-text-secondary text-sm font-medium">Tenderlar soni</p>
            <p class="text-white text-3xl font-bold">${stats.total}</p>
          </div>
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-border-dark bg-background-dark">
            <p class="text-text-secondary text-sm font-medium">Jami summa</p>
            <p class="text-white text-xl font-bold">${mockData.formatSum(stats.totalSum)}</p>
          </div>
          <div class="flex flex-col gap-2 rounded-xl p-5 border border-border-dark bg-background-dark">
            <p class="text-text-secondary text-sm font-medium">O'rtacha risk balli</p>
            <p class="text-white text-3xl font-bold">${stats.avgRisk}<span class="text-base text-text-secondary">/100</span></p>
          </div>
        </div>

        <!-- Tenders Table -->
        <div class="rounded-xl border border-border-dark bg-background-dark overflow-hidden">
          <div class="p-4 border-b border-border-dark flex items-center justify-between">
            <h3 class="text-white font-semibold">Tenderlar ro'yxati</h3>
            <span class="text-text-secondary text-sm">${filteredTenders.length} ta tender</span>
          </div>
          
          ${filteredTenders.length > 0 ? `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-dark text-text-secondary text-sm">
                  <th class="text-left py-3 px-4 font-medium">ID</th>
                  <th class="text-left py-3 px-4 font-medium">Buyurtmachi</th>
                  <th class="text-left py-3 px-4 font-medium">Soha</th>
                  <th class="text-left py-3 px-4 font-medium">Summa</th>
                  <th class="text-left py-3 px-4 font-medium">Risk balli</th>
                  <th class="text-left py-3 px-4 font-medium">Harakatlar</th>
                </tr>
              </thead>
              <tbody>
                ${filteredTenders.map(tender => {
                  const riskColor = tender.riskBand === 'high' ? 'red-500' : tender.riskBand === 'medium' ? 'orange-500' : 'green-500';
                  return `
                    <tr class="border-b border-border-dark/50 hover:bg-surface-dark/50 transition-colors">
                      <td class="py-4 px-4">
                        <span class="text-primary font-medium">${tender.id}</span>
                      </td>
                      <td class="py-4 px-4">
                        <div class="max-w-[200px]">
                          <p class="text-white text-sm truncate">${tender.buyurtmachi}</p>
                          <p class="text-text-secondary text-xs truncate">${tender.golib}</p>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <span class="text-text-secondary text-sm">${tender.soha}</span>
                      </td>
                      <td class="py-4 px-4">
                        <span class="text-white text-sm font-medium">${mockData.formatSum(tender.summa)}</span>
                      </td>
                      <td class="py-4 px-4">
                        <div class="flex items-center gap-2">
                          <div class="w-16 h-2 bg-surface-dark rounded-full overflow-hidden">
                            <div class="h-full bg-${riskColor}" style="width: ${tender.riskScore}%"></div>
                          </div>
                          <span class="text-${riskColor} font-bold text-sm">${tender.riskScore}</span>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <a href="#/app/tenders/${tender.id}" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                          <span class="material-symbols-outlined text-[16px]">visibility</span>
                          Ko'rish
                        </a>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
          ` : `
          <div class="p-8 text-center">
            <span class="material-symbols-outlined text-4xl text-text-secondary mb-2">inbox</span>
            <p class="text-text-secondary">Bu kategoriyada tender topilmadi</p>
          </div>
          `}
        </div>
      </main>
    </div>
  `;
}

// Make function globally available
window.renderFilteredTenders = renderFilteredTenders;
