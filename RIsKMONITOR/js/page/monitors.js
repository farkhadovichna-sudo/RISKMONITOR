// ============================================
// PAGES - Active Monitors Dashboard
// ============================================

function renderMonitors() {
  // Active monitors data
  const monitors = [
    {
      id: 'MON-001',
      name: 'Narx oshishi monitoring',
      description: "Tender narxlarining bozor narxidan 20% dan ko'p oshishini kuzatadi",
      status: 'active',
      type: 'price',
      alertsToday: 12,
      alertsWeek: 45,
      lastAlert: '2 daqiqa oldin',
      sensitivity: 'Yuqori',
      icon: 'trending_up'
    },
    {
      id: 'MON-002',
      name: 'Kartel aniqlash',
      description: "Bir xil ishtirokchilar o'rtasidagi g'ayrioddiy munosabatlarni aniqlaydi",
      status: 'active',
      type: 'cartel',
      alertsToday: 3,
      alertsWeek: 18,
      lastAlert: '15 daqiqa oldin',
      sensitivity: "O'rta",
      icon: 'hub'
    },
    {
      id: 'MON-003',
      name: 'Texnik talablar tahlili',
      description: "G'ayritabiiy texnik talablarni va cheklovlarni aniqlaydi",
      status: 'active',
      type: 'technical',
      alertsToday: 8,
      alertsWeek: 32,
      lastAlert: '1 soat oldin',
      sensitivity: 'Yuqori',
      icon: 'build'
    },
    {
      id: 'MON-004',
      name: 'Korrupsiya signallari',
      description: "Korrupsiyaga xos bo'lgan alomatlarni real vaqtda aniqlaydi",
      status: 'active',
      type: 'corruption',
      alertsToday: 5,
      alertsWeek: 21,
      lastAlert: '45 daqiqa oldin',
      sensitivity: 'Kritik',
      icon: 'gavel'
    },
    {
      id: 'MON-005',
      name: 'Muddatlar nazorati',
      description: "G'ayritabiiy qisqa yoki uzun tender muddatlarini kuzatadi",
      status: 'active',
      type: 'deadline',
      alertsToday: 2,
      alertsWeek: 9,
      lastAlert: '3 soat oldin',
      sensitivity: "O'rta",
      icon: 'schedule'
    },
    {
      id: 'MON-006',
      name: "Bo'linish nazorati",
      description: "Yirik tenderlarning sun'iy bo'linishini aniqlaydi",
      status: 'active',
      type: 'split',
      alertsToday: 1,
      alertsWeek: 7,
      lastAlert: '5 soat oldin',
      sensitivity: 'Yuqori',
      icon: 'call_split'
    },
    {
      id: 'MON-007',
      name: "Firma bog'liqligi",
      description: "Tender ishtirokchilari orasidagi yashirin aloqalarni kuzatadi",
      status: 'paused',
      type: 'relation',
      alertsToday: 0,
      alertsWeek: 4,
      lastAlert: '1 kun oldin',
      sensitivity: "O'rta",
      icon: 'people'
    },
    {
      id: 'MON-008',
      name: 'Geo-lokatsiya tahlili',
      description: "Bir hududga to'plangan tenderlarni aniqlaydi",
      status: 'active',
      type: 'geo',
      alertsToday: 4,
      alertsWeek: 15,
      lastAlert: '2 soat oldin',
      sensitivity: "O'rta",
      icon: 'location_on'
    }
  ];

  const activeCount = monitors.filter(m => m.status === 'active').length;
  const pausedCount = monitors.filter(m => m.status === 'paused').length;
  const totalAlertsToday = monitors.reduce((sum, m) => sum + m.alertsToday, 0);
  const totalAlertsWeek = monitors.reduce((sum, m) => sum + m.alertsWeek, 0);

  const sensitivityColors = {
    'Kritik': 'red',
    'Yuqori': 'orange',
    "O'rta": 'primary'
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
              <div class="flex items-center justify-center size-12 rounded-xl bg-purple-500/20">
                <span class="material-symbols-outlined text-purple-500 text-2xl">radar</span>
              </div>
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-white">Faol Monitorlar</h1>
                <p class="text-text-secondary text-sm mt-1">Real vaqt rejimida ishlayotgan monitoring tizimlari</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-2">
              <span class="size-2 bg-green-500 rounded-full animate-pulse"></span>
              Real-time faol
            </span>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-green-500">play_circle</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Faol</span>
            </div>
            <p class="text-white text-3xl font-bold">${activeCount}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-orange-500">pause_circle</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">To'xtatilgan</span>
            </div>
            <p class="text-white text-3xl font-bold">${pausedCount}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-red-500">notifications_active</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Bugungi signallar</span>
            </div>
            <p class="text-white text-3xl font-bold">${totalAlertsToday}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">calendar_month</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Haftalik signallar</span>
            </div>
            <p class="text-white text-3xl font-bold">${totalAlertsWeek}</p>
          </div>
        </div>

        <!-- Monitors List -->
        <div class="glass-panel rounded-xl overflow-hidden">
          <div class="p-4 border-b border-border-dark flex items-center justify-between">
            <h3 class="text-white font-semibold">Monitoring tizimlari</h3>
            <span class="text-text-secondary text-sm">${monitors.length} ta monitor</span>
          </div>
          
          <div class="divide-y divide-border-dark/50">
            ${monitors.map(monitor => {
              const statusColor = monitor.status === 'active' ? 'green' : 'orange';
              const sensitivityColor = sensitivityColors[monitor.sensitivity] || 'primary';
              return `
                <div class="p-4 hover:bg-surface-dark/50 transition-colors">
                  <div class="flex items-start gap-4">
                    <div class="size-12 rounded-xl bg-${sensitivityColor}-500/10 flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-${sensitivityColor}-500">${monitor.icon}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-white font-semibold">${monitor.name}</h4>
                        <span class="px-2 py-0.5 rounded text-xs font-medium bg-${statusColor}-500/10 text-${statusColor}-500">
                          ${monitor.status === 'active' ? 'Faol' : "To'xtatilgan"}
                        </span>
                        <span class="px-2 py-0.5 rounded text-xs font-medium bg-${sensitivityColor}-500/10 text-${sensitivityColor}-500">
                          ${monitor.sensitivity}
                        </span>
                      </div>
                      <p class="text-text-secondary text-sm mb-3">${monitor.description}</p>
                      <div class="flex flex-wrap items-center gap-4 text-xs">
                        <span class="flex items-center gap-1 text-text-secondary">
                          <span class="material-symbols-outlined text-sm">today</span>
                          Bugun: <span class="text-white font-semibold">${monitor.alertsToday}</span> signal
                        </span>
                        <span class="flex items-center gap-1 text-text-secondary">
                          <span class="material-symbols-outlined text-sm">date_range</span>
                          Hafta: <span class="text-white font-semibold">${monitor.alertsWeek}</span> signal
                        </span>
                        <span class="flex items-center gap-1 text-text-secondary">
                          <span class="material-symbols-outlined text-sm">schedule</span>
                          Oxirgi: <span class="text-primary">${monitor.lastAlert}</span>
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                      <button class="p-2 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors">
                        <span class="material-symbols-outlined text-lg">settings</span>
                      </button>
                      <button class="p-2 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors">
                        <span class="material-symbols-outlined text-lg">${monitor.status === 'active' ? 'pause' : 'play_arrow'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

// Make function globally available
window.renderMonitors = renderMonitors;
