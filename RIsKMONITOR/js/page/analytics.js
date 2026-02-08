// ============================================
// PAGES - Analytics (New Stitch Design)
// ============================================

function renderAnalytics() {
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
              <a href="#/app/analytics" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Tahlillar</a>
              <a href="#/app/knowledge-base" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bilimlar bazasi</a>
              <a href="#/app/reports" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Hisobot</a>
              ${isAdmin() ? '<a href="#/app/admin" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark flex items-center gap-1"><span class="material-symbols-outlined text-sm">shield_person</span>Admin</a>' : ''}
            </nav>
          </div>
          ${renderHeaderUserSection()}
        </header>

        <main class="px-10 py-8 max-w-7xl mx-auto w-full">
          <div class="flex flex-col gap-8">
            <!-- Page Header -->
            <div class="flex flex-wrap justify-between gap-4 mb-4">
              <div class="flex flex-col gap-2">
                <h1 class="text-white text-4xl font-black leading-tight tracking-tight">Tahlillar Bo'limi</h1>
                <p class="text-text-secondary text-lg">Davlat xaridlari dinamikasi va AI asosida anomaliyalarni kuzating</p>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div onclick="navigateToTenders()" class="glass-panel p-6 rounded-xl flex flex-col gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                <div class="flex justify-between items-start">
                  <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">Jami tender summasi</p>
                  <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined">payments</span>
                  </div>
                </div>
                <p class="text-white text-3xl font-black tracking-tight">4.2 <span class="text-lg font-medium text-text-secondary">trln so'm</span></p>
                <div class="flex items-center gap-1 text-green-400 text-xs font-bold">
                  <span class="material-symbols-outlined text-sm">trending_up</span>
                  <span>+8.5% o'tgan oyga nisbatan</span>
                </div>
                <span class="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Tenderlarni ko'rish <span class="material-symbols-outlined text-xs">arrow_forward</span></span>
              </div>

              <div onclick="navigateToHighRisk()" class="glass-panel p-6 rounded-xl flex flex-col gap-3 hover:border-red-500/50 transition-colors border-red-500/20 cursor-pointer group">
                <div class="flex justify-between items-start">
                  <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">Yuqori riskli tenderlar</p>
                  <div class="size-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <span class="material-symbols-outlined">warning</span>
                  </div>
                </div>
                <p class="text-white text-3xl font-black tracking-tight">248</p>
                <div class="flex items-center gap-1 text-red-400 text-xs font-bold">
                  <span class="material-symbols-outlined text-sm">trending_up</span>
                  <span>+8 ta yangi aniqlandi</span>
                </div>
                <span class="text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Batafsil ko'rish <span class="material-symbols-outlined text-xs">arrow_forward</span></span>
              </div>

              <div onclick="showAIDetails()" class="glass-panel p-6 rounded-xl flex flex-col gap-3 hover:border-green-500/50 transition-colors cursor-pointer group">
                <div class="flex justify-between items-start">
                  <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">AI aniqlik darajasi</p>
                  <div class="size-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <span class="material-symbols-outlined">auto_awesome</span>
                  </div>
                </div>
                <p class="text-white text-3xl font-black tracking-tight">96.8%</p>
                <div class="flex items-center gap-1 text-green-400 text-xs font-bold">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  <span>Maqsadli ko'rsatkich: 95%</span>
                </div>
                <span class="text-green-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">AI statistikasi <span class="material-symbols-outlined text-xs">arrow_forward</span></span>
              </div>

              <div onclick="showMonitorDetails()" class="glass-panel p-6 rounded-xl flex flex-col gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                <div class="flex justify-between items-start">
                  <p class="text-text-secondary text-sm font-medium group-hover:text-white transition-colors">Faol monitorlar</p>
                  <div class="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <span class="material-symbols-outlined">radar</span>
                  </div>
                </div>
                <p class="text-white text-3xl font-black tracking-tight">24</p>
                <div class="flex items-center gap-1 text-text-secondary text-xs font-medium">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  <span>Real-vaqt rejimida</span>
                </div>
                <span class="text-purple-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Monitorlarni ko'rish <span class="material-symbols-outlined text-xs">arrow_forward</span></span>
              </div>
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Weekly Dynamics -->
              <div class="glass-panel p-6 rounded-xl">
                <h3 class="text-white text-xl font-bold mb-4">Haftalik risk dinamikasi</h3>
                <p class="text-text-secondary text-sm mb-6">Kunlik o'rtacha risk bali (0-100)</p>
                <div class="relative h-64 flex">
                  <!-- Y-axis labels -->
                  <div class="flex flex-col justify-between text-xs text-text-secondary pr-3 py-2">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                  </div>
                  <!-- Chart -->
                  <div class="flex-1 relative">
                    <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 160">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#256af4" stop-opacity="0.3"/>
                          <stop offset="100%" stop-color="#256af4" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                      <!-- Grid lines -->
                      <line x1="0" y1="0" x2="400" y2="0" stroke="#1e293b" stroke-width="1"/>
                      <line x1="0" y1="32" x2="400" y2="32" stroke="#1e293b" stroke-width="1"/>
                      <line x1="0" y1="64" x2="400" y2="64" stroke="#1e293b" stroke-width="1"/>
                      <line x1="0" y1="96" x2="400" y2="96" stroke="#1e293b" stroke-width="1"/>
                      <line x1="0" y1="128" x2="400" y2="128" stroke="#1e293b" stroke-width="1"/>
                      <line x1="0" y1="160" x2="400" y2="160" stroke="#1e293b" stroke-width="1"/>
                      <!-- Area fill - risk scores: 65, 72, 78, 74, 85, 80, 89, 82 -->
                      <path d="M0 104 L57 89 L114 75 L171 82 L228 56 L285 68 L342 42 L400 54 V160 H0 Z" fill="url(#chartGrad)"/>
                      <!-- Line -->
                      <path d="M0 104 L57 89 L114 75 L171 82 L228 56 L285 68 L342 42 L400 54" fill="none" stroke="#256af4" stroke-width="3" stroke-linecap="round"/>
                      <!-- Data points -->
                      <circle cx="0" cy="104" r="5" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="57" cy="89" r="5" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="114" cy="75" r="5" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="171" cy="82" r="5" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="228" cy="56" r="6" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="285" cy="68" r="5" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="342" cy="42" r="6" fill="#256af4" stroke="white" stroke-width="2"/>
                      <circle cx="400" cy="54" r="6" fill="#256af4" stroke="white" stroke-width="2"/>
                      <!-- Value labels (risk scores) -->
                      <text x="8" y="92" fill="white" font-size="10" text-anchor="middle" font-weight="bold">65</text>
                      <text x="57" y="77" fill="white" font-size="10" text-anchor="middle" font-weight="bold">72</text>
                      <text x="114" y="63" fill="white" font-size="10" text-anchor="middle" font-weight="bold">78</text>
                      <text x="171" y="70" fill="white" font-size="10" text-anchor="middle" font-weight="bold">74</text>
                      <text x="228" y="44" fill="white" font-size="10" text-anchor="middle" font-weight="bold">85</text>
                      <text x="285" y="56" fill="white" font-size="10" text-anchor="middle" font-weight="bold">80</text>
                      <text x="342" y="30" fill="white" font-size="10" text-anchor="middle" font-weight="bold">89</text>
                      <text x="392" y="42" fill="white" font-size="10" text-anchor="middle" font-weight="bold">82</text>
                    </svg>
                  </div>
                </div>
                <div class="flex justify-between text-xs text-text-secondary uppercase tracking-wider mt-4 pl-8">
                  <span>Dush</span>
                  <span>Sesh</span>
                  <span>Chor</span>
                  <span>Pay</span>
                  <span>Jum</span>
                  <span>Shan</span>
                  <span>Yak</span>
                </div>
              </div>


              <!-- Risk Distribution -->
              <div class="glass-panel p-6 rounded-xl">
                <h3 class="text-white text-xl font-bold mb-4">Risk taqsimoti</h3>
                <p class="text-text-secondary text-sm mb-6">Xavf darajasi bo'yicha tenderlar ulushi</p>
                <div class="flex items-center justify-center h-48">
                  <div class="relative w-40 h-40">
                    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1a2235" stroke-width="4"/>
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="20 100" stroke-dashoffset="0"/>
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" stroke-width="4" stroke-dasharray="30 100" stroke-dashoffset="-20"/>
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="50 100" stroke-dashoffset="-50"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center flex-col">
                      <span class="text-2xl font-black text-white">1,240</span>
                      <span class="text-xs text-text-secondary">tender</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center gap-8 mt-4">
                  <div class="flex items-center gap-2 cursor-pointer hover:opacity-80" onclick="filterByRisk('high')">
                    <span class="size-3 rounded-full bg-red-500"></span>
                    <span class="text-sm text-text-secondary">Yuqori (20%)</span>
                  </div>
                  <div class="flex items-center gap-2 cursor-pointer hover:opacity-80" onclick="filterByRisk('medium')">
                    <span class="size-3 rounded-full bg-orange-500"></span>
                    <span class="text-sm text-text-secondary">O'rta (30%)</span>
                  </div>
                  <div class="flex items-center gap-2 cursor-pointer hover:opacity-80" onclick="filterByRisk('low')">
                    <span class="size-3 rounded-full bg-green-500"></span>
                    <span class="text-sm text-text-secondary">Past (50%)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sector Analysis -->
            <div class="glass-panel p-6 rounded-xl">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="text-white text-xl font-bold">Soha bo'yicha tahlil</h3>
                  <p class="text-text-secondary text-sm">Eng yuqori riskli sohalar reytingi</p>
                </div>
                <button onclick="showSectorDetails()" class="text-primary text-sm font-medium hover:underline flex items-center gap-1">Batafsil <span class="material-symbols-outlined text-sm">arrow_forward</span></button>
              </div>
              <div class="space-y-4">
                ${[
                  { name: 'Qurilish', percent: 87, color: 'red', amount: '1.2 trln' },
                  { name: 'IT xizmatlari', percent: 65, color: 'orange', amount: '890 mlrd' },
                  { name: 'Tibbiyot uskunalari', percent: 52, color: 'yellow', amount: '450 mlrd' },
                  { name: 'Transport', percent: 38, color: 'green', amount: '320 mlrd' },
                  { name: 'Boshqa sohalar', percent: 25, color: 'blue', amount: '1.34 trln' },
                ].map(sector => `
                  <div class="flex items-center gap-4 cursor-pointer hover:bg-surface-dark/50 p-2 rounded-lg transition-colors" onclick="filterBySector('${sector.name}')">
                    <div class="w-36 text-sm font-medium text-white">${sector.name}</div>
                    <div class="flex-1 h-2 bg-surface-dark rounded-full overflow-hidden">
                      <div class="h-full bg-${sector.color}-500 rounded-full transition-all" style="width: ${sector.percent}%"></div>
                    </div>
                    <div class="w-20 text-right text-sm font-bold text-${sector.color}-500">${sector.percent}%</div>
                    <div class="w-24 text-right text-xs text-text-secondary">${sector.amount}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  // Initialize event handlers
  initAnalyticsEvents();
}

function initAnalyticsEvents() {
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('notificationDropdown');
    const btn = document.getElementById('notificationBtn');
    if (dropdown && !dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

// Toggle notification dropdown
function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  dropdown.classList.toggle('hidden');
}

// Mark all notifications as read
function markAllRead() {
  const badge = document.getElementById('notificationBadge');
  if (badge) badge.classList.add('hidden');
  showToast('Barcha bildirishnomalar o\'qilgan deb belgilandi', 'success');
}

// Show profile modal
function showProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.remove('hidden');
}

// Close profile modal
function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.add('hidden');
}

// Navigate to tenders page
function navigateToTenders() {
  window.location.hash = '#/app/tenders';
}

// Navigate to high risk tenders
function navigateToHighRisk() {
  window.location.hash = '#/app/tenders/filter/high';
  showToast('Yuqori riskli tenderlar filtrlandi', 'info');
}

// Show AI details page
function showAIDetails() {
  window.location.hash = '#/app/ai-stats';
}

// Show monitors page
function showMonitorDetails() {
  window.location.hash = '#/app/monitors';
}

// Filter by risk level
function filterByRisk(level) {
  const labels = { high: 'Yuqori', medium: 'O\'rta', low: 'Past' };
  showToast(`${labels[level]} riskli tenderlar: ${level === 'high' ? 248 : level === 'medium' ? 372 : 620} ta`, 'info');
}

// Show sector details
function showSectorDetails() {
  showToast('Sohalar tahlili sahifasiga yo\'naltirilmoqda...', 'info');
  setTimeout(() => {
    window.location.hash = '#/app/reports';
  }, 1000);
}

// Filter by sector
function filterBySector(sector) {
  showToast(`${sector} sohasi bo'yicha tenderlar filtrlandi`, 'info');
  setTimeout(() => {
    window.location.hash = `#/app/tenders?sector=${encodeURIComponent(sector)}`;
  }, 500);
}

// Toast notification helper
function showToast(message, type = 'info') {
  const existing = document.getElementById('toastNotification');
  if (existing) existing.remove();

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-primary',
    warning: 'bg-yellow-500'
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning'
  };

  const toast = document.createElement('div');
  toast.id = 'toastNotification';
  toast.className = `fixed bottom-6 right-6 ${colors[type]} text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[200] animate-pulse`;
  toast.innerHTML = `
    <span class="material-symbols-outlined">${icons[type]}</span>
    <span class="text-sm font-medium">${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

window.renderAnalytics = renderAnalytics;
window.toggleNotifications = toggleNotifications;
window.markAllRead = markAllRead;
window.showProfileModal = showProfileModal;
window.closeProfileModal = closeProfileModal;
window.navigateToTenders = navigateToTenders;
window.navigateToHighRisk = navigateToHighRisk;
window.showAIDetails = showAIDetails;
window.showMonitorDetails = showMonitorDetails;
window.filterByRisk = filterByRisk;
window.showSectorDetails = showSectorDetails;
window.filterBySector = filterBySector;
window.showToast = showToast;
