// ============================================
// PAGES - Tenders (New Stitch Design)
// ============================================

function renderTenders() {
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
                <a href="#/app/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                  <span class="material-symbols-outlined text-[20px]">dashboard</span>
                  <p class="text-sm font-medium leading-normal">Dashboard</p>
                </a>
                <a href="#/app/tenders" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90">
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
                <a href="#/app/dashboard" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bosh sahifa</a>
                <a href="#/app/tenders" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Tenderlar</a>
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
            <div class="max-w-[1400px] mx-auto flex flex-col gap-8">
              <!-- Page Header -->
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 class="text-2xl font-bold text-white tracking-tight">Tenderlar Monitoringi</h2>
                  <p class="text-text-secondary text-sm">Barcha faol va yakunlangan davlat xaridlari tahlili</p>
                </div>
                <div class="flex items-center gap-3 w-full md:w-auto">
                  <div class="flex bg-surface-dark rounded-lg p-1 border border-border-dark/50">
                    <button id="listViewBtn" onclick="setViewMode('list')" class="p-1.5 rounded bg-primary/20 text-primary" title="Ro'yxat">
                      <span class="material-symbols-outlined text-sm">list</span>
                    </button>
                    <button id="gridViewBtn" onclick="setViewMode('grid')" class="p-1.5 rounded text-text-secondary hover:text-white" title="Setka">
                      <span class="material-symbols-outlined text-sm">grid_view</span>
                    </button>
                  </div>
                  <div class="relative flex-1 md:w-80">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
                    <input 
                      id="searchInput"
                      class="w-full bg-surface-dark/50 border border-border-dark text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary placeholder:text-text-secondary/50" 
                      placeholder="ID yoki buyurtmachi bo'yicha qidiruv..." 
                      type="text"
                      onkeyup="filterTenders()"
                    />
                  </div>
                  <button onclick="toggleFilterPanel()" id="filterToggleBtn" class="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-border-dark text-white text-sm font-medium rounded-lg hover:bg-border-dark transition-colors">
                    <span class="material-symbols-outlined text-lg">filter_alt</span>
                    <span>Filtrlar</span>
                    <span class="material-symbols-outlined text-sm transition-transform" id="filterArrow">expand_more</span>
                  </button>
                </div>
              </div>
              
              <!-- Filter Panel -->
              <div id="filterPanel" class="hidden glass-panel rounded-xl p-6 animate-fadeIn">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <!-- Risk Band Filter -->
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-text-secondary uppercase tracking-wider">Risk darajasi</label>
                    <select id="filterRisk" onchange="applyFilters()" class="bg-surface-dark border border-border-dark text-white rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary">
                      <option value="all">Barchasi</option>
                      <option value="high">🔴 Yuqori xavf</option>
                      <option value="medium">🟡 O'rta xavf</option>
                      <option value="low">🟢 Past xavf</option>
                    </select>
                  </div>
                  
                  <!-- Sector Filter -->
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-text-secondary uppercase tracking-wider">Soha</label>
                    <select id="filterSector" onchange="applyFilters()" class="bg-surface-dark border border-border-dark text-white rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary">
                      <option value="all">Barcha sohalar</option>
                      <option value="Qurilish">🏗️ Qurilish</option>
                      <option value="Sog'liqni saqlash">🏥 Sog'liqni saqlash</option>
                      <option value="Ta'lim">📚 Ta'lim</option>
                      <option value="Transport">🚗 Transport</option>
                      <option value="IT">💻 IT</option>
                      <option value="Energetika">⚡ Energetika</option>
                    </select>
                  </div>
                  
                  <!-- Status Filter -->
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-text-secondary uppercase tracking-wider">Holat</label>
                    <select id="filterStatus" onchange="applyFilters()" class="bg-surface-dark border border-border-dark text-white rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary">
                      <option value="all">Barcha holatlar</option>
                      <option value="active">⚡ Faol</option>
                      <option value="completed">✅ Yakunlangan</option>
                      <option value="pending">⏳ Kutilmoqda</option>
                    </select>
                  </div>
                  
                  <!-- Price Range -->
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-text-secondary uppercase tracking-wider">Summa oralig'i</label>
                    <select id="filterPrice" onchange="applyFilters()" class="bg-surface-dark border border-border-dark text-white rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary">
                      <option value="all">Barcha summalar</option>
                      <option value="small">1 mlrd gacha</option>
                      <option value="medium">1-5 mlrd</option>
                      <option value="large">5 mlrd dan yuqori</option>
                    </select>
                  </div>
                </div>
                
                <!-- Filter Summary & Actions -->
                <div class="flex items-center justify-between mt-6 pt-4 border-t border-border-dark/50">
                  <div id="filterSummary" class="text-sm text-text-secondary">
                    <span id="filteredCount">0</span> ta tender topildi
                  </div>
                  <div class="flex gap-3">
                    <button onclick="resetFilters()" class="px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors">
                      Tozalash
                    </button>
                    <button onclick="toggleFilterPanel()" class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                      Yopish
                    </button>
                  </div>
                </div>
              </div>
              </div>

              <!-- Content Container -->
              <div id="tendersContainer">
              <!-- Table View -->
              <div id="tableView" class="glass-panel rounded-xl overflow-hidden shadow-2xl">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-white/5 border-b border-border-dark/50">
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">ID</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Buyurtmachi</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-center">Qiymat</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-center">Risk Ball</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-center">Holat</th>
                      <th class="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-dark/20" id="tendersTableBody">
                    ${renderTenderRows(tenders, 1)}
                  </tbody>
                </table>
                
                <!-- Pagination -->
                <div id="paginationContainer" class="px-6 py-4 flex items-center justify-between border-t border-border-dark/50 bg-white/5">
                  ${renderPagination(tenders.length, 1)}
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

// Pagination state
let currentPage = 1;
const ITEMS_PER_PAGE = 10;

function renderTenderRows(tenders, page = 1) {
  // Static Tailwind classes for CDN compatibility
  const riskConfig = {
    high: { 
      bgClass: 'bg-red-500/10', 
      borderClass: 'border-red-500/20', 
      textClass: 'text-red-500',
      label: 'KRITIK XAVF', 
      pulse: true 
    },
    medium: { 
      bgClass: 'bg-orange-500/10', 
      borderClass: 'border-orange-500/20', 
      textClass: 'text-orange-500',
      label: "O'RTA XAVF", 
      pulse: false 
    },
    low: { 
      bgClass: 'bg-green-500/10', 
      borderClass: 'border-green-500/20', 
      textClass: 'text-green-500',
      label: 'XAVFSIZ', 
      pulse: false 
    }
  };
  
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  
  return tenders.slice(start, end).map(t => {
    const risk = riskConfig[t.riskBand] || riskConfig.medium;
    return `
      <tr class="hover:bg-white/5 transition-colors group cursor-pointer" onclick="window.location.hash='/app/tenders/${t.id}'">
        <td class="px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-lg bg-surface-dark flex items-center justify-center border border-border-dark/50 shrink-0">
              <span class="material-symbols-outlined text-text-secondary">description</span>
            </div>
            <span class="text-xs font-mono text-text-secondary">${t.id}</span>
          </div>
        </td>
        <td class="px-6 py-5">
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-white">${t.buyurtmachi.slice(0, 35)}${t.buyurtmachi.length > 35 ? '...' : ''}</span>
            <span class="text-[11px] text-text-secondary mt-0.5">${t.soha}</span>
          </div>
        </td>
        <td class="px-6 py-5 text-center">
          <span class="text-sm font-bold text-white">${mockData.formatSum(t.summa)}</span>
        </td>
        <td class="px-6 py-5 text-center">
          <div class="inline-flex items-center justify-center size-8 rounded-full ${risk.bgClass} border ${risk.borderClass} ${risk.textClass} font-bold text-xs">${t.riskScore}</div>
        </td>
        <td class="px-6 py-5 text-center">
          <div class="flex flex-col items-center gap-1.5">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${risk.bgClass} ${risk.textClass} border ${risk.borderClass}">
              ${risk.pulse ? '<span class="size-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>' : ''}
              ${risk.label}
            </span>
          </div>
        </td>
        <td class="px-6 py-5 text-right">
          <button class="p-2 hover:bg-surface-dark rounded-lg text-text-secondary hover:text-white transition-colors">
            <span class="material-symbols-outlined text-xl">visibility</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterTenders() {
  applyFilters();
}

function toggleFilterPanel() {
  const panel = document.getElementById('filterPanel');
  const arrow = document.getElementById('filterArrow');
  const btn = document.getElementById('filterToggleBtn');
  
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    arrow.style.transform = 'rotate(180deg)';
    btn.classList.add('bg-primary/20', 'border-primary/50');
  } else {
    panel.classList.add('hidden');
    arrow.style.transform = 'rotate(0deg)';
    btn.classList.remove('bg-primary/20', 'border-primary/50');
  }
}

function applyFilters() {
  const query = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  const riskFilter = document.getElementById('filterRisk')?.value || 'all';
  const sectorFilter = document.getElementById('filterSector')?.value || 'all';
  const statusFilter = document.getElementById('filterStatus')?.value || 'all';
  const priceFilter = document.getElementById('filterPrice')?.value || 'all';
  
  let filtered = mockData.TENDERS.filter(t => {
    // Search filter
    const matchesSearch = !query || 
      t.id.toLowerCase().includes(query) || 
      t.buyurtmachi.toLowerCase().includes(query) ||
      (t.golib && t.golib.toLowerCase().includes(query));
    
    // Risk filter
    const matchesRisk = riskFilter === 'all' || t.riskBand === riskFilter;
    
    // Sector filter
    const matchesSector = sectorFilter === 'all' || t.soha === sectorFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || t.holat === statusFilter;
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter === 'small') matchesPrice = t.summa < 1000000000;
    else if (priceFilter === 'medium') matchesPrice = t.summa >= 1000000000 && t.summa < 5000000000;
    else if (priceFilter === 'large') matchesPrice = t.summa >= 5000000000;
    
    return matchesSearch && matchesRisk && matchesSector && matchesStatus && matchesPrice;
  });
  
  // Update table
  const tbody = document.getElementById('tendersTableBody');
  if (tbody) {
    tbody.innerHTML = renderTenderRows(filtered);
  }
  
  // Update count
  const countEl = document.getElementById('filteredCount');
  if (countEl) {
    countEl.textContent = filtered.length;
  }
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterRisk').value = 'all';
  document.getElementById('filterSector').value = 'all';
  document.getElementById('filterStatus').value = 'all';
  document.getElementById('filterPrice').value = 'all';
  applyFilters();
}

// View mode state
let currentViewMode = 'list';

function setViewMode(mode) {
  currentViewMode = mode;
  const listBtn = document.getElementById('listViewBtn');
  const gridBtn = document.getElementById('gridViewBtn');
  const tableView = document.getElementById('tableView');
  const container = document.getElementById('tendersContainer');
  
  // Reset to first page when changing view
  currentPage = 1;
  
  // Update button styles
  if (mode === 'list') {
    listBtn.className = 'p-1.5 rounded bg-primary/20 text-primary';
    gridBtn.className = 'p-1.5 rounded text-text-secondary hover:text-white';
  } else {
    listBtn.className = 'p-1.5 rounded text-text-secondary hover:text-white';
    gridBtn.className = 'p-1.5 rounded bg-primary/20 text-primary';
  }
  
  // Get current filtered tenders
  const query = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  const riskFilter = document.getElementById('filterRisk')?.value || 'all';
  const sectorFilter = document.getElementById('filterSector')?.value || 'all';
  const statusFilter = document.getElementById('filterStatus')?.value || 'all';
  const priceFilter = document.getElementById('filterPrice')?.value || 'all';
  
  let filtered = mockData.TENDERS.filter(t => {
    const matchesSearch = !query || t.id.toLowerCase().includes(query) || t.buyurtmachi.toLowerCase().includes(query);
    const matchesRisk = riskFilter === 'all' || t.riskBand === riskFilter;
    const matchesSector = sectorFilter === 'all' || t.soha === sectorFilter;
    const matchesStatus = statusFilter === 'all' || t.holat === statusFilter;
    let matchesPrice = true;
    if (priceFilter === 'small') matchesPrice = t.summa < 1000000000;
    else if (priceFilter === 'medium') matchesPrice = t.summa >= 1000000000 && t.summa < 5000000000;
    else if (priceFilter === 'large') matchesPrice = t.summa >= 5000000000;
    return matchesSearch && matchesRisk && matchesSector && matchesStatus && matchesPrice;
  });
  
  if (mode === 'list') {
    tableView.style.display = 'block';
    // Remove grid view if exists
    const gridView = document.getElementById('gridView');
    if (gridView) gridView.remove();
    // Remove grid pagination if exists
    const gridPagination = document.getElementById('gridPaginationContainer');
    if (gridPagination) gridPagination.remove();
    // Update table
    document.getElementById('tendersTableBody').innerHTML = renderTenderRows(filtered, 1);
    // Update pagination
    const paginationContainer = document.getElementById('paginationContainer');
    if (paginationContainer) {
      paginationContainer.innerHTML = renderPagination(filtered.length, 1);
    }
  } else {
    tableView.style.display = 'none';
    // Remove old grid if exists
    let gridView = document.getElementById('gridView');
    if (gridView) gridView.remove();
    let gridPagination = document.getElementById('gridPaginationContainer');
    if (gridPagination) gridPagination.remove();
    
    // Create grid container
    const gridWrapper = document.createElement('div');
    gridWrapper.id = 'gridViewWrapper';
    gridWrapper.className = 'flex flex-col gap-6';
    
    // Create new grid
    gridView = document.createElement('div');
    gridView.id = 'gridView';
    gridView.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    gridView.innerHTML = renderTenderCards(filtered, 1);
    
    // Create pagination for grid
    gridPagination = document.createElement('div');
    gridPagination.id = 'gridPaginationContainer';
    gridPagination.className = 'glass-panel rounded-xl px-6 py-4 flex items-center justify-between';
    gridPagination.innerHTML = renderPagination(filtered.length, 1);
    
    gridWrapper.appendChild(gridView);
    gridWrapper.appendChild(gridPagination);
    container.insertBefore(gridWrapper, tableView);
  }
}

function renderTenderCards(tenders, page = 1) {
  // Static Tailwind classes for CDN compatibility
  const riskConfig = {
    high: { bgClass: 'bg-red-500/90', label: 'KRITIK XAVF', icon: '🔴' },
    medium: { bgClass: 'bg-orange-500/90', label: "O'RTA XAVF", icon: '🟡' },
    low: { bgClass: 'bg-green-500/90', label: 'XAVFSIZ', icon: '🟢' }
  };
  
  // Soha bo'yicha rasmlar
  const sectorImages = {
    'Qurilish': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=200&fit=crop',
    'Sog\'liqni saqlash': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop',
    'Ta\'lim': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
    'Transport': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=200&fit=crop',
    'IT': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    'Energetika': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop',
    'Oziq-ovqat': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=200&fit=crop',
    'Tibbiyot': 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop',
    'default': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop'
  };
  
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  
  return tenders.slice(start, end).map(t => {
    const risk = riskConfig[t.riskBand] || riskConfig.medium;
    const imageUrl = sectorImages[t.soha] || sectorImages['default'];
    
    return `
      <div class="glass-panel rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group" onclick="window.location.hash='/app/tenders/${t.id}'">
        <!-- Image -->
        <div class="relative h-40 overflow-hidden">
          <img src="${imageUrl}" alt="${t.soha}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
          <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${risk.bgClass} text-white shadow-lg">
              ${risk.icon} ${risk.label}
            </span>
          </div>
          <div class="absolute top-3 right-3 flex items-center justify-center size-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white font-bold text-sm">
            ${t.riskScore}
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <span class="text-xs font-mono text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">${t.id}</span>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-5">
          <h3 class="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">${t.buyurtmachi}</h3>
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-text-secondary text-sm">category</span>
            <p class="text-text-secondary text-xs">${t.soha}</p>
          </div>
          
          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-border-dark/50">
            <div>
              <p class="text-[10px] text-text-secondary uppercase tracking-wider">Qiymat</p>
              <p class="text-white font-bold text-sm">${mockData.formatSum(t.summa)}</p>
            </div>
            <button class="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100">
              <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


window.renderTenders = renderTenders;
window.filterTenders = filterTenders;
window.toggleFilterPanel = toggleFilterPanel;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.setViewMode = setViewMode;
window.renderTenderCards = renderTenderCards;

// Modal functions for info cards
function showMarketAnalysisModal() {
  const modal = document.createElement('div');
  modal.id = 'marketAnalysisModal';
  modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  
  modal.innerHTML = `
    <div class="glass-panel rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-fadeIn">
      <div class="flex items-center justify-between p-6 border-b border-border-dark/50">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-primary/20 rounded-xl text-primary">
            <span class="material-symbols-outlined text-2xl">trending_up</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Bozor Tahlili</h3>
            <p class="text-text-secondary text-sm">Tender bozori statistikasi</p>
          </div>
        </div>
        <button onclick="document.getElementById('marketAnalysisModal').remove()" class="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-primary">28</p>
            <p class="text-xs text-text-secondary">Jami tenderlar</p>
          </div>
          <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-green-500">+12%</p>
            <p class="text-xs text-text-secondary">Qiymat o'sishi</p>
          </div>
          <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-orange-500">3.2B</p>
            <p class="text-xs text-text-secondary">O'rtacha summa</p>
          </div>
          <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
            <p class="text-2xl font-bold text-blue-500">67%</p>
            <p class="text-xs text-text-secondary">Muvaffaqiyat</p>
          </div>
        </div>
        
        <h4 class="text-white font-semibold mb-3">Soha bo'yicha taqsimot</h4>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="text-sm text-text-secondary w-32">Qurilish</span>
            <div class="flex-1 bg-surface-dark rounded-full h-3">
              <div class="bg-primary h-3 rounded-full" style="width: 35%"></div>
            </div>
            <span class="text-sm text-white font-bold">35%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-text-secondary w-32">IT va Texnologiya</span>
            <div class="flex-1 bg-surface-dark rounded-full h-3">
              <div class="bg-blue-500 h-3 rounded-full" style="width: 25%"></div>
            </div>
            <span class="text-sm text-white font-bold">25%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-text-secondary w-32">Tibbiyot</span>
            <div class="flex-1 bg-surface-dark rounded-full h-3">
              <div class="bg-green-500 h-3 rounded-full" style="width: 20%"></div>
            </div>
            <span class="text-sm text-white font-bold">20%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-text-secondary w-32">Oziq-ovqat</span>
            <div class="flex-1 bg-surface-dark rounded-full h-3">
              <div class="bg-orange-500 h-3 rounded-full" style="width: 20%"></div>
            </div>
            <span class="text-sm text-white font-bold">20%</span>
          </div>
        </div>
      </div>
      
      <div class="p-6 border-t border-border-dark/50 flex justify-end gap-3">
        <button onclick="document.getElementById('marketAnalysisModal').remove()" class="px-4 py-2 rounded-lg border border-border-dark text-white hover:bg-white/5">Yopish</button>
        <button onclick="window.location.hash='/app/analytics'" class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark">Batafsil tahlil</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showSuspiciousParticipantsModal() {
  const suspiciousCompanies = [
    { name: 'AlphaGroup LLC', risk: 95, reason: 'Bir xil manzil', tenders: 12 },
    { name: 'BetaTrade Corp', risk: 88, reason: 'Bir xil rahbar', tenders: 8 },
    { name: 'GammaBuild Ltd', risk: 85, reason: 'Moliyaviy bog\'lanish', tenders: 15 },
    { name: 'DeltaSupply Co', risk: 82, reason: 'O\'xshash nomlar', tenders: 6 },
    { name: 'EpsilonTech Inc', risk: 79, reason: 'Til kelishmovchiligi', tenders: 4 }
  ];
  
  const modal = document.createElement('div');
  modal.id = 'suspiciousModal';
  modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  
  modal.innerHTML = `
    <div class="glass-panel rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-fadeIn">
      <div class="flex items-center justify-between p-6 border-b border-border-dark/50">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-red-500/20 rounded-xl text-red-500">
            <span class="material-symbols-outlined text-2xl">gavel</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Shubhali Ishtirokchilar</h3>
            <p class="text-text-secondary text-sm">Affillangan kompaniyalar tarmog'i</p>
          </div>
        </div>
        <button onclick="document.getElementById('suspiciousModal').remove()" class="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
          <div class="flex items-center gap-2 text-red-400 mb-2">
            <span class="material-symbols-outlined">warning</span>
            <span class="font-semibold">Ogohlantirish</span>
          </div>
          <p class="text-text-secondary text-sm">Oxirgi 24 soat ichida 14 ta yangi affillangan kompaniyalar tarmog'i aniqlandi. Bu kompaniyalar o'rtasida moliyaviy, yuridik yoki boshqaruv bog'lanishlari mavjud.</p>
        </div>
        
        <h4 class="text-white font-semibold mb-3">Aniqlangan kompaniyalar</h4>
        <div class="space-y-3">
          ${suspiciousCompanies.map(c => `
            <div class="flex items-center justify-between p-4 bg-surface-dark/50 rounded-xl hover:bg-surface-dark transition-colors cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-sm">${c.risk}</div>
                <div>
                  <p class="text-white font-medium">${c.name}</p>
                  <p class="text-text-secondary text-xs">${c.reason} • ${c.tenders} ta tenderda</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-text-secondary">chevron_right</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="p-6 border-t border-border-dark/50 flex justify-end gap-3">
        <button onclick="document.getElementById('suspiciousModal').remove()" class="px-4 py-2 rounded-lg border border-border-dark text-white hover:bg-white/5">Yopish</button>
        <button onclick="window.location.hash='/app/cases'" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Keyslar sahifasi</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showAIPredictionModal() {
  const modal = document.createElement('div');
  modal.id = 'aiPredictionModal';
  modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  
  modal.innerHTML = `
    <div class="glass-panel rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-fadeIn border-primary/30">
      <div class="flex items-center justify-between p-6 border-b border-border-dark/50 bg-primary/5">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-primary/20 rounded-xl text-primary">
            <span class="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">AI Bashorati</h3>
            <p class="text-text-secondary text-sm">Keyingi hafta uchun prognoz</p>
          </div>
        </div>
        <button onclick="document.getElementById('aiPredictionModal').remove()" class="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
          <div class="flex items-center gap-2 text-primary mb-2">
            <span class="material-symbols-outlined">psychology</span>
            <span class="font-semibold">AI Tahlil xulosasi</span>
          </div>
          <p class="text-white text-sm leading-relaxed">Keyingi haftada <span class="text-primary font-bold">qurilish sohasida</span> xavf darajasi yuqori bo'lishi kutilmoqda. Buning asosiy sabablari: katta hajmdagi loyihalar, yangi ishtirokchilar va o'tgan yilning shu davriga nisbatan 23% ko'proq tender.</p>
        </div>
        
        <h4 class="text-white font-semibold mb-3">Soha bo'yicha prognoz</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-medium">Qurilish</span>
              <span class="text-red-500 font-bold">Yuqori</span>
            </div>
            <p class="text-text-secondary text-xs">18 ta yangi tender kutilmoqda</p>
          </div>
          <div class="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-medium">Tibbiyot</span>
              <span class="text-orange-500 font-bold">O'rta</span>
            </div>
            <p class="text-text-secondary text-xs">12 ta yangi tender kutilmoqda</p>
          </div>
          <div class="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-medium">IT va Texnologiya</span>
              <span class="text-green-500 font-bold">Past</span>
            </div>
            <p class="text-text-secondary text-xs">8 ta yangi tender kutilmoqda</p>
          </div>
          <div class="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-medium">Ta'lim</span>
              <span class="text-green-500 font-bold">Past</span>
            </div>
            <p class="text-text-secondary text-xs">5 ta yangi tender kutilmoqda</p>
          </div>
        </div>
        
        <h4 class="text-white font-semibold mb-3">Tavsiyalar</h4>
        <div class="space-y-2">
          <div class="flex items-start gap-3 p-3 bg-surface-dark/50 rounded-lg">
            <span class="material-symbols-outlined text-primary">tips_and_updates</span>
            <p class="text-text-secondary text-sm">Qurilish sohasidagi tenderlarni ustuvor qilib tekshirish</p>
          </div>
          <div class="flex items-start gap-3 p-3 bg-surface-dark/50 rounded-lg">
            <span class="material-symbols-outlined text-primary">tips_and_updates</span>
            <p class="text-text-secondary text-sm">Yangi ishtirokchilarni diqqat bilan tahlil qilish</p>
          </div>
          <div class="flex items-start gap-3 p-3 bg-surface-dark/50 rounded-lg">
            <span class="material-symbols-outlined text-primary">tips_and_updates</span>
            <p class="text-text-secondary text-sm">O'tgan yilning ma'lumotlari bilan solishtirish</p>
          </div>
        </div>
      </div>
      
      <div class="p-6 border-t border-border-dark/50 flex justify-end gap-3">
        <button onclick="document.getElementById('aiPredictionModal').remove()" class="px-4 py-2 rounded-lg border border-border-dark text-white hover:bg-white/5">Yopish</button>
        <button onclick="window.location.hash='/app/analytics'" class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark">AI Tahlillarga o'tish</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

window.showMarketAnalysisModal = showMarketAnalysisModal;
window.showSuspiciousParticipantsModal = showSuspiciousParticipantsModal;
window.showAIPredictionModal = showAIPredictionModal;

// Pagination functions
function renderPagination(totalItems, currentPage) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
  
  // Generate page buttons
  let pageButtons = '';
  
  // Previous button
  pageButtons += `
    <button onclick="goToPage(${currentPage - 1})" 
            class="p-2 rounded-lg bg-surface-dark border border-border-dark text-white hover:bg-border-dark transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
            ${currentPage === 1 ? 'disabled' : ''}>
      <span class="material-symbols-outlined text-lg">chevron_left</span>
    </button>
  `;
  
  // Page numbers logic
  if (totalPages <= 7) {
    // Show all pages if 7 or less
    for (let i = 1; i <= totalPages; i++) {
      pageButtons += renderPageButton(i, currentPage);
    }
  } else {
    // Always show first page
    pageButtons += renderPageButton(1, currentPage);
    
    if (currentPage > 3) {
      pageButtons += '<span class="text-text-secondary px-2 flex items-center">...</span>';
    }
    
    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageButtons += renderPageButton(i, currentPage);
    }
    
    if (currentPage < totalPages - 2) {
      pageButtons += '<span class="text-text-secondary px-2 flex items-center">...</span>';
    }
    
    // Always show last page
    pageButtons += renderPageButton(totalPages, currentPage);
  }
  
  // Next button
  pageButtons += `
    <button onclick="goToPage(${currentPage + 1})" 
            class="p-2 rounded-lg bg-surface-dark border border-border-dark text-white hover:bg-border-dark transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
            ${currentPage === totalPages ? 'disabled' : ''}>
      <span class="material-symbols-outlined text-lg">chevron_right</span>
    </button>
  `;
  
  return `
    <span class="text-sm text-text-secondary">${start}-${end} dan ${totalItems} tadan</span>
    <div class="flex gap-2">
      ${pageButtons}
    </div>
  `;
}

function renderPageButton(pageNum, currentPage) {
  const isActive = pageNum === currentPage;
  return `
    <button onclick="goToPage(${pageNum})" 
            class="px-3.5 py-1.5 rounded-lg text-sm font-bold transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-surface-dark text-text-secondary'}">
      ${pageNum}
    </button>
  `;
}

function goToPage(page) {
  // Get current filters
  const query = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  const riskFilter = document.getElementById('filterRisk')?.value || 'all';
  const sectorFilter = document.getElementById('filterSector')?.value || 'all';
  const statusFilter = document.getElementById('filterStatus')?.value || 'all';
  const priceFilter = document.getElementById('filterPrice')?.value || 'all';
  
  // Filter tenders
  let filtered = mockData.TENDERS.filter(t => {
    const matchesSearch = !query || t.id.toLowerCase().includes(query) || t.buyurtmachi.toLowerCase().includes(query);
    const matchesRisk = riskFilter === 'all' || t.riskBand === riskFilter;
    const matchesSector = sectorFilter === 'all' || t.soha === sectorFilter;
    const matchesStatus = statusFilter === 'all' || t.holat === statusFilter;
    let matchesPrice = true;
    if (priceFilter === 'small') matchesPrice = t.summa < 1000000000;
    else if (priceFilter === 'medium') matchesPrice = t.summa >= 1000000000 && t.summa < 5000000000;
    else if (priceFilter === 'large') matchesPrice = t.summa >= 5000000000;
    return matchesSearch && matchesRisk && matchesSector && matchesStatus && matchesPrice;
  });
  
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  
  // Validate page number
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  
  currentPage = page;
  
  // Update content based on view mode
  if (currentViewMode === 'list') {
    const tbody = document.getElementById('tendersTableBody');
    if (tbody) {
      tbody.innerHTML = renderTenderRows(filtered, page);
    }
    // Update list pagination
    const paginationContainer = document.getElementById('paginationContainer');
    if (paginationContainer) {
      paginationContainer.innerHTML = renderPagination(filtered.length, page);
    }
  } else {
    const gridView = document.getElementById('gridView');
    if (gridView) {
      gridView.innerHTML = renderTenderCards(filtered, page);
    }
    // Update grid pagination
    const gridPaginationContainer = document.getElementById('gridPaginationContainer');
    if (gridPaginationContainer) {
      gridPaginationContainer.innerHTML = renderPagination(filtered.length, page);
    }
  }
}

window.renderPagination = renderPagination;
window.goToPage = goToPage;
