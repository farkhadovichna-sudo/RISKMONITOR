// ============================================
// PAGES - Cases (Redesigned with Risky Tenders)
// ============================================

function renderCases() {
  const cases = mockData.CASES;
  const riskyTenders = mockData.getRiskyTendersWithoutCase();
  
  const statusCounts = {
    new: cases.filter(c => c.status === 'new').length,
    in_review: cases.filter(c => c.status === 'in_review').length,
    closed: cases.filter(c => c.status === 'closed').length
  };
  
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
                <a href="#/app/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">dashboard</span>
                  <p class="text-sm font-medium leading-normal">Dashboard</p>
                </a>
                <a href="#/app/tenders" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">description</span>
                  <p class="text-sm font-medium leading-normal">Tenderlar</p>
                </a>
                <a href="#/app/cases" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90">
                  <span class="material-symbols-outlined text-[20px]">work</span>
                  <p class="text-sm font-medium leading-normal">Case'lar</p>
                </a>
                <div class="pt-2 mt-2 border-t border-surface-dark">
                  <p class="text-text-secondary text-xs px-3 mb-2 uppercase tracking-wider">Hisobotlar</p>
                  <a href="#/app/analytics" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                    <span class="material-symbols-outlined text-[20px]">bar_chart</span>
                    <p class="text-sm font-medium leading-normal">Tahlillar</p>
                  </a>
                </div>
                <div class="pt-2 mt-2 border-t border-surface-dark">
                  <p class="text-text-secondary text-xs px-3 mb-2 uppercase tracking-wider">Sozlamalar</p>
                  <a href="#/app/admin" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                    <span class="material-symbols-outlined text-[20px]">settings</span>
                    <p class="text-sm font-medium leading-normal">Admin Panel</p>
                  </a>
                </div>
              </nav>
            </div>
            
            <!-- User Profile -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50">
                <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center text-white font-bold">A</div>
                <div class="flex flex-col">
                  <span class="text-white text-sm font-semibold">Admin</span>
                  <span class="text-text-secondary text-xs">Inspektor</span>
                </div>
              </div>
              <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <span class="size-2 bg-green-500 rounded-full animate-pulse"></span>
                <span class="text-green-400 text-xs font-medium">Real-time: Online</span>
              </div>
            </div>
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
                <a href="#/app/dashboard" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bosh sahifa</a>
                <a href="#/app/tenders" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Tenderlar</a>
                <a href="#/app/cases" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Keyslar</a>
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
            <div class="max-w-[1400px] mx-auto flex flex-col gap-8">
              <!-- Page Header -->
              <div>
                <h2 class="text-2xl font-bold text-white tracking-tight">Case Management</h2>
                <p class="text-text-secondary text-sm">Tekshiruv ishlari va inspektor qarorlari</p>
              </div>

              <!-- Status Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div id="cardYangi" onclick="filterCasesByCard('Yangi')" class="flex flex-col gap-3 rounded-xl p-5 border border-blue-500/30 bg-blue-500/5 shadow-sm cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">Yangi</p>
                    <span class="material-symbols-outlined text-blue-500 text-[20px]">fiber_new</span>
                  </div>
                  <p class="text-white text-3xl font-bold tracking-tight">${statusCounts.new}</p>
                  <p class="text-blue-400 text-xs flex items-center gap-1">Tekshiruvga tayyor <span class="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span></p>
                </div>
                
                <div id="cardTekshiruvda" onclick="filterCasesByCard('Tekshiruvda')" class="flex flex-col gap-3 rounded-xl p-5 border border-yellow-500/30 bg-yellow-500/5 shadow-sm cursor-pointer hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">Tekshiruvda</p>
                    <span class="material-symbols-outlined text-yellow-500 text-[20px]">search</span>
                  </div>
                  <p class="text-white text-3xl font-bold tracking-tight">${statusCounts.in_review}</p>
                  <p class="text-yellow-400 text-xs flex items-center gap-1">Faol tekshiruv <span class="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span></p>
                </div>
                
                <div id="cardYopilgan" onclick="filterCasesByCard('Yopilgan')" class="flex flex-col gap-3 rounded-xl p-5 border border-green-500/30 bg-green-500/5 shadow-sm cursor-pointer hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all group">
                  <div class="flex justify-between items-start">
                    <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">Yopilgan</p>
                    <span class="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                  </div>
                  <p class="text-white text-3xl font-bold tracking-tight">${statusCounts.closed}</p>
                  <p class="text-green-400 text-xs flex items-center gap-1">Yakunlangan <span class="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span></p>
                </div>
              </div>

              <!-- Risky Tenders Section -->
              ${riskyTenders.length > 0 ? `
                <div class="glass-panel rounded-xl overflow-hidden shadow-2xl">
                  <div class="px-6 py-4 flex items-center justify-between border-b border-red-500/20 bg-red-500/5">
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                      <span class="material-symbols-outlined text-red-500">warning</span>
                      Yuqori riskli tenderlar
                      <span class="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">${riskyTenders.length} ta</span>
                    </h3>
                    <p class="text-text-secondary text-sm">Keys ochilmagan tenderlar</p>
                  </div>
                  <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="riskyTendersGrid">
                    ${renderRiskyTenderCards(riskyTenders)}
                  </div>
                </div>
              ` : `
                <div class="glass-panel rounded-xl p-8 text-center">
                  <span class="material-symbols-outlined text-5xl text-green-500 mb-4">verified</span>
                  <h3 class="text-lg font-bold text-white mb-2">Barcha riskli tenderlar uchun keys ochilgan</h3>
                  <p class="text-text-secondary">Hozircha yangi yuqori riskli tender yo'q</p>
                </div>
              `}

              <!-- Cases Table -->
              <div class="glass-panel rounded-xl overflow-hidden shadow-2xl">
                <div class="px-6 py-4 flex items-center justify-between border-b border-border-dark/50">
                  <h3 class="text-lg font-bold text-white flex items-center gap-2" id="casesTableHeader">
                    <span class="material-symbols-outlined text-primary">folder_open</span>
                    Barcha case'lar
                    <span class="text-sm font-normal text-text-secondary ml-2">(${cases.length} ta)</span>
                  </h3>
                  <select class="bg-surface-dark border border-border-dark text-white rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary" onchange="filterCases(this.value)">
                    <option value="">Barcha statuslar</option>
                    <option value="new">Yangi</option>
                    <option value="in_review">Tekshiruvda</option>
                    <option value="closed">Yopilgan</option>
                  </select>
                </div>
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-white/5 border-b border-border-dark/50">
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Case ID</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Tender</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Buyurtmachi</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-center">Risk</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Inspektor</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-center">Status</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-right">Yangilangan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-dark/20" id="casesTableBody">
                    ${renderCaseRows(cases)}
                  </tbody>
                </table>
              </div>

              <!-- Workflow Info -->
              <div class="glass-panel rounded-xl p-6">
                <h4 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">info</span>
                  Case workflow
                </h4>
                <div class="flex items-center justify-center gap-4 flex-wrap">
                  <div class="flex items-center gap-3">
                    <span class="px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">Riskli Tender</span>
                    <span class="material-symbols-outlined text-text-secondary">arrow_forward</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Yangi Keys</span>
                    <span class="material-symbols-outlined text-text-secondary">arrow_forward</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Tekshiruvda</span>
                    <span class="material-symbols-outlined text-text-secondary">arrow_forward</span>
                  </div>
                  <span class="px-3 py-1.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">Yopilgan</span>
                </div>
                <p class="text-text-secondary text-sm text-center mt-4">
                  Har bir case riskli tender asosida ochiladi va inspektor tomonidan tekshiriladi.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

// Render risky tender cards
function renderRiskyTenderCards(tenders) {
  return tenders.slice(0, 6).map(t => `
    <div class="bg-background-dark rounded-xl p-5 border border-red-500/20 hover:border-red-500/40 transition-all group">
      <div class="flex items-start justify-between mb-3">
        <div>
          <a href="#/app/tenders/${t.id}" class="text-primary font-mono text-sm font-semibold hover:underline">${t.id}</a>
          <p class="text-text-secondary text-xs mt-1">${t.buyurtmachi.slice(0, 30)}...</p>
        </div>
        <div class="flex items-center justify-center size-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold">
          ${t.riskScore}
        </div>
      </div>
      <div class="flex items-center gap-2 mb-3">
        <span class="px-2 py-0.5 bg-surface-dark text-text-secondary text-[10px] rounded">${t.soha}</span>
        <span class="px-2 py-0.5 bg-surface-dark text-text-secondary text-[10px] rounded">${t.hudud.split(' ')[0]}</span>
      </div>
      <div class="text-text-secondary text-xs mb-4">
        <span class="font-semibold text-white">${mockData.formatSum(t.summa).split(' ')[0]}</span> so'm
      </div>
      <button onclick="openCaseModal('${t.id}')" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all text-sm shadow-lg shadow-red-500/20">
        <span class="material-symbols-outlined text-lg">add</span>
        Keys ochish
      </button>
    </div>
  `).join('');
}

function renderCaseRows(cases) {
  // Static Tailwind classes for CDN compatibility
  const statusConfig = {
    new: { bgClass: 'bg-blue-500/10', textClass: 'text-blue-400', borderClass: 'border-blue-500/20', label: 'Yangi' },
    in_review: { bgClass: 'bg-yellow-500/10', textClass: 'text-yellow-400', borderClass: 'border-yellow-500/20', label: 'Tekshiruvda' },
    closed: { bgClass: 'bg-green-500/10', textClass: 'text-green-400', borderClass: 'border-green-500/20', label: 'Yopilgan' }
  };
  
  const riskConfig = {
    high: { bgClass: 'bg-red-500/10', textClass: 'text-red-500', borderClass: 'border-red-500/20' },
    medium: { bgClass: 'bg-orange-500/10', textClass: 'text-orange-500', borderClass: 'border-orange-500/20' },
    low: { bgClass: 'bg-green-500/10', textClass: 'text-green-500', borderClass: 'border-green-500/20' }
  };
  
  if (cases.length === 0) {
    return `
      <tr>
        <td colspan="7" class="px-6 py-12 text-center">
          <span class="material-symbols-outlined text-4xl text-text-secondary mb-2">inbox</span>
          <p class="text-text-secondary">Hozircha case yo'q</p>
        </td>
      </tr>
    `;
  }
  
  return cases.map(c => {
    const status = statusConfig[c.status] || statusConfig.new;
    const risk = riskConfig[c.tenderSummary.riskBand] || riskConfig.medium;
    
    return `
      <tr class="hover:bg-white/5 transition-colors group cursor-pointer" onclick="window.location.hash='/app/cases/${c.id}'">
        <td class="px-6 py-5">
          <span class="text-primary font-mono text-sm font-semibold">${c.id}</span>
        </td>
        <td class="px-6 py-5">
          <span class="text-text-secondary font-mono text-xs">${c.tenderId}</span>
        </td>
        <td class="px-6 py-5">
          <span class="text-sm text-white">${c.tenderSummary.buyurtmachi.slice(0, 25)}...</span>
        </td>
        <td class="px-6 py-5 text-center">
          <div class="inline-flex items-center justify-center size-8 rounded-full ${risk.bgClass} border ${risk.borderClass} ${risk.textClass} font-bold text-xs">
            ${c.tenderSummary.riskScore}
          </div>
        </td>
        <td class="px-6 py-5">
          <span class="text-sm text-text-secondary">${c.assignedTo}</span>
        </td>
        <td class="px-6 py-5 text-center">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${status.bgClass} ${status.textClass} border ${status.borderClass}">
            ${status.label}
          </span>
        </td>
        <td class="px-6 py-5 text-right">
          <span class="text-xs text-text-secondary">${mockData.formatDate(c.updatedAt)}</span>
        </td>
      </tr>
    `;
  }).join('');
}

// Open Case Modal
function openCaseModal(tenderId) {
  const tender = mockData.TENDERS.find(t => t.id === tenderId);
  if (!tender) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'openCaseModal';
  overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50';
  overlay.innerHTML = `
    <div class="bg-surface-dark border border-white/10 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl" style="animation: modalPop 0.2s ease-out;">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/20 flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-red-500">folder_open</span>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Yangi Keys Ochish</h3>
        <p class="text-text-secondary mb-6">${tender.id} uchun yangi keys ochishni tasdiqlang</p>
        
        <div class="bg-background-dark rounded-xl p-4 mb-6 text-left">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-text-secondary">Buyurtmachi</p>
              <p class="text-white font-medium">${tender.buyurtmachi.slice(0, 25)}...</p>
            </div>
            <div>
              <p class="text-text-secondary">G'olib</p>
              <p class="text-white font-medium">${tender.golib.slice(0, 20)}...</p>
            </div>
            <div>
              <p class="text-text-secondary">Summa</p>
              <p class="text-white font-medium">${mockData.formatSum(tender.summa)}</p>
            </div>
            <div>
              <p class="text-text-secondary">Risk balli</p>
              <p class="text-red-500 font-bold">${tender.riskScore} ball</p>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3 justify-center">
          <button onclick="closeCaseModal()" class="px-6 py-2.5 bg-background-dark hover:bg-white/5 text-white font-medium rounded-lg transition-colors border border-white/10">
            Bekor qilish
          </button>
          <button onclick="confirmOpenCase('${tenderId}')" class="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 font-medium rounded-lg transition-colors text-white">
            Keys ochish
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCaseModal();
  });
  
  // Add animation style if not exists
  if (!document.querySelector('#modal-animations')) {
    const style = document.createElement('style');
    style.id = 'modal-animations';
    style.textContent = `
      @keyframes modalPop {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}

function closeCaseModal() {
  const modal = document.getElementById('openCaseModal');
  if (modal) modal.remove();
}

function confirmOpenCase(tenderId) {
  const newCase = mockData.openCase(tenderId);
  closeCaseModal();
  
  if (newCase) {
    showToast(`${newCase.id} muvaffaqiyatli ochildi!`, 'success');
    // Refresh the page to show updated data
    setTimeout(() => {
      renderCases();
    }, 500);
  } else {
    showToast('Keys ochishda xatolik yuz berdi', 'error');
  }
}

function filterCases(status) {
  const cases = status 
    ? mockData.CASES.filter(c => c.status === status)
    : mockData.CASES;
  
  document.getElementById('casesTableBody').innerHTML = renderCaseRows(cases);
}

// Card-based filtering with active state
let activeCardFilter = null;

function filterCasesByCard(cardType) {
  const statusMap = {
    'Yangi': 'new',
    'Tekshiruvda': 'in_review',
    'Yopilgan': 'closed'
  };
  
  const cardIds = ['cardYangi', 'cardTekshiruvda', 'cardYopilgan'];
  
  // If same card clicked, reset filter
  if (activeCardFilter === cardType) {
    activeCardFilter = null;
    cardIds.forEach(id => {
      const card = document.getElementById(id);
      if (card) card.classList.remove('ring-2', 'ring-white/30', 'scale-[1.02]');
    });
    document.getElementById('casesTableBody').innerHTML = renderCaseRows(mockData.CASES);
    updateTableHeader('Barcha case\'lar', mockData.CASES.length);
    return;
  }
  
  activeCardFilter = cardType;
  
  // Reset all cards, highlight active
  cardIds.forEach(id => {
    const card = document.getElementById(id);
    if (card) {
      if (id === 'card' + cardType) {
        card.classList.add('ring-2', 'ring-white/30', 'scale-[1.02]');
      } else {
        card.classList.remove('ring-2', 'ring-white/30', 'scale-[1.02]');
      }
    }
  });
  
  // Filter cases
  const filtered = mockData.CASES.filter(c => c.status === statusMap[cardType]);
  document.getElementById('casesTableBody').innerHTML = renderCaseRows(filtered);
  
  // Update table header
  const labels = {
    'Yangi': 'Yangi case\'lar',
    'Tekshiruvda': 'Tekshiruvdagi case\'lar',
    'Yopilgan': 'Yopilgan case\'lar'
  };
  updateTableHeader(labels[cardType], filtered.length);
}

function updateTableHeader(title, count) {
  const header = document.getElementById('casesTableHeader');
  if (header) {
    header.innerHTML = `
      <span class="material-symbols-outlined text-primary">folder_open</span>
      ${title}
      <span class="text-sm font-normal text-text-secondary ml-2">(${count} ta)</span>
      ${activeCardFilter ? '<button onclick="filterCasesByCard(activeCardFilter)" class="ml-4 text-xs text-text-secondary hover:text-white px-2 py-1 rounded bg-surface-dark">Filtrni tozalash</button>' : ''}
    `;
  }
}

window.renderCases = renderCases;
window.filterCases = filterCases;
window.filterCasesByCard = filterCasesByCard;
window.updateTableHeader = updateTableHeader;
window.openCaseModal = openCaseModal;
window.closeCaseModal = closeCaseModal;
window.confirmOpenCase = confirmOpenCase;
