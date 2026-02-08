// ============================================
// PAGES - Reports (New Stitch Design)
// ============================================

function renderReports() {
  const reports = [
    { id: 'RPT-001', name: 'Qurilish sohasidagi korrupsiya risklari - Oktabr 2023', date: '05.11.2023, 14:20', type: 'Oylik', typeColor: 'blue', icon: 'picture_as_pdf', status: 'active' },
    { id: 'RPT-002', name: 'Narx anomaliyalari bo\'yicha tahliliy jadval', date: '03.11.2023, 09:15', type: 'Maxsus', typeColor: 'purple', icon: 'table_chart', status: 'active' },
    { id: 'RPT-003', name: 'Toshkent shahar tenderlari monitoringi (Haftalik)', date: '01.11.2023, 18:45', type: 'Haftalik', typeColor: 'yellow', icon: 'picture_as_pdf', status: 'active' },
    { id: 'RPT-004', name: 'AI yordamida aniqlangan riskli bitimlar hisoboti', date: '30.10.2023, 11:00', type: 'AI Tahlil', typeColor: 'indigo', icon: 'picture_as_pdf', status: 'active' },
    { id: 'RPT-005', name: 'Sog\'liqni saqlash sohasi tenderlari - 2023 Q3', date: '15.09.2023, 10:00', type: 'Oylik', typeColor: 'blue', icon: 'picture_as_pdf', status: 'archived' },
    { id: 'RPT-006', name: 'Yillik korrupsiya risklari xulosasi 2022', date: '01.01.2023, 09:00', type: 'Yillik', typeColor: 'green', icon: 'picture_as_pdf', status: 'archived' },
  ];
  
  // Store reports globally
  window.reportsData = reports;
  window.currentReportsTab = 'all';
  window.selectedFormat = 'pdf';
  
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
              <a href="#/app/knowledge-base" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Bilimlar bazasi</a>
              <a href="#/app/reports" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Hisobot</a>
              ${isAdmin() ? '<a href="#/app/admin" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark flex items-center gap-1"><span class="material-symbols-outlined text-sm">shield_person</span>Admin</a>' : ''}
            </nav>
          </div>
          ${renderHeaderUserSection()}
        </header>

        <main class="px-10 py-8 max-w-7xl mx-auto w-full">
          <!-- Page Title -->
          <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div class="flex flex-col gap-2">
              <h1 class="text-white text-4xl font-black tracking-tight">Hisobotlar Bo'limi</h1>
              <p class="text-text-secondary text-lg font-normal">Tizimdagi risklarni tahlil qilish va AI yordamida hisobotlarni shakllantirish</p>
            </div>
            <button onclick="openCreateReportModal()" class="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined">smart_toy</span>
              🤖 AI Hisobot yaratish
            </button>
          </div>

          <!-- Status Tabs -->
          <div class="flex border-b border-border-dark gap-8 mb-8">
            <button onclick="switchReportsTab('all')" id="tab-all" class="border-b-2 border-primary text-white pb-4 font-bold text-sm px-2">Barcha hisobotlar</button>
            <button onclick="switchReportsTab('archived')" id="tab-archived" class="border-b-2 border-transparent text-text-secondary hover:text-white pb-4 font-bold text-sm px-2 transition-colors">Arxiv</button>
            <button onclick="switchReportsTab('new')" id="tab-new" class="border-b-2 border-transparent text-text-secondary hover:text-white pb-4 font-bold text-sm px-2 transition-colors">Yangi hisobot</button>
          </div>

          <!-- Quick Config Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="glass-panel p-6 rounded-xl flex flex-col gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">event_note</span>
              </div>
              <div>
                <h3 class="text-white text-lg font-bold">Hisobot turi</h3>
                <select id="reportTypeSelect" onchange="updateReportConfig()" class="w-full mt-2 bg-background-dark border border-border-dark rounded-lg text-sm text-text-secondary focus:border-primary focus:ring-0 p-2">
                  <option value="oylik">Oylik tahlil</option>
                  <option value="haftalik">Haftalik monitoring</option>
                  <option value="maxsus">Maxsus (Custom)</option>
                  <option value="ai">AI Tahlil</option>
                </select>
              </div>
            </div>
            <div class="glass-panel p-6 rounded-xl flex flex-col gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">date_range</span>
              </div>
              <div>
                <h3 class="text-white text-lg font-bold">Sana oralig'i</h3>
                <div class="flex items-center gap-2 mt-2">
                  <input id="dateFrom" class="bg-background-dark border border-border-dark rounded-lg text-xs text-white w-full p-2" type="date" value="2023-10-01" onchange="updateReportConfig()" />
                  <span class="text-text-secondary text-xs">—</span>
                  <input id="dateTo" class="bg-background-dark border border-border-dark rounded-lg text-xs text-white w-full p-2" type="date" value="2023-10-31" onchange="updateReportConfig()" />
                </div>
              </div>
            </div>
            <div class="glass-panel p-6 rounded-xl flex flex-col gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">description</span>
              </div>
              <div>
                <h3 class="text-white text-lg font-bold">Format</h3>
                <div class="flex gap-2 mt-2">
                  <button onclick="selectFormat('pdf')" id="format-pdf" class="flex-1 bg-background-dark border border-primary text-primary py-2 rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors">PDF</button>
                  <button onclick="selectFormat('excel')" id="format-excel" class="flex-1 bg-background-dark border border-border-dark text-text-secondary py-2 rounded-lg text-xs font-bold hover:border-primary transition-colors">EXCEL</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Reports Table -->
          <div class="glass-panel rounded-xl overflow-hidden">
            <div class="p-6 border-b border-border-dark flex justify-between items-center">
              <h2 class="text-white text-xl font-bold">Mavjud hisobotlar ro'yxati</h2>
              <span id="reportsCount" class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">Jami: ${reports.length} ta</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-surface-dark/30 text-text-secondary text-xs uppercase tracking-wider">
                    <th class="px-6 py-4 font-semibold">Hisobot nomi</th>
                    <th class="px-6 py-4 font-semibold">Yaratilgan sana</th>
                    <th class="px-6 py-4 font-semibold">Turi</th>
                    <th class="px-6 py-4 font-semibold text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody id="reportsTableBody" class="divide-y divide-border-dark">
                  ${renderReportsTable(reports)}
                </tbody>
              </table>
            </div>
            <div class="p-4 border-t border-border-dark flex items-center justify-between">
              <p id="reportsInfo" class="text-text-secondary text-xs">1-${reports.filter(r => r.status === 'active').length} gacha ko'rsatilmoqda</p>
              <div class="flex gap-2">
                <button class="h-8 w-8 rounded bg-surface-dark flex items-center justify-center text-text-secondary hover:bg-primary transition-colors hover:text-white">
                  <span class="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button class="h-8 w-8 rounded bg-primary flex items-center justify-center text-white text-xs font-bold">1</button>
                <button class="h-8 w-8 rounded bg-surface-dark flex items-center justify-center text-text-secondary hover:bg-primary transition-colors hover:text-white">
                  <span class="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        <!-- AI Floating Stats -->
        <div class="fixed bottom-6 right-6 flex flex-col gap-4">
          <div class="glass-panel p-4 rounded-xl shadow-2xl border-primary/30 flex items-center gap-4 max-w-xs animate-pulse">
            <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <p class="text-xs text-primary font-bold">AI Status</p>
              <p class="text-white text-sm">Monitoring faol: ${mockData.TENDERS.length} tender tahlil qilinmoqda...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Report Modal -->
    <div id="createReportModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-background-dark border border-border-dark rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border-dark flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">smart_toy</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">AI Hisobot Yaratish</h2>
              <p class="text-text-secondary text-sm">AI yordamida avtomatik hisobot generatsiya qiling</p>
            </div>
          </div>
          <button onclick="closeCreateReportModal()" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">close</span>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-5">
            <!-- Report Name -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Hisobot nomi *</label>
              <input type="text" id="newReportName" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="Masalan: Qurilish sohasi risklari - Noyabr 2023">
            </div>
            
            <!-- Report Type -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Hisobot turi</label>
                <select id="newReportType" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                  <option value="oylik">Oylik tahlil</option>
                  <option value="haftalik">Haftalik monitoring</option>
                  <option value="maxsus">Maxsus (Custom)</option>
                  <option value="ai">AI Tahlil</option>
                  <option value="yillik">Yillik hisobot</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Format</label>
                <select id="newReportFormat" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="both">Ikkalasi</option>
                </select>
              </div>
            </div>
            
            <!-- Date Range -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Boshlanish sanasi</label>
                <input type="date" id="newReportDateFrom" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Tugash sanasi</label>
                <input type="date" id="newReportDateTo" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
              </div>
            </div>
            
            <!-- Sector Selection -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Soha tanlash</label>
              <div class="grid grid-cols-3 gap-2">
                <label class="flex items-center gap-2 bg-surface-dark/50 p-3 rounded-lg cursor-pointer hover:bg-surface-dark transition-colors">
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary" checked>
                  <span class="text-white text-sm">Qurilish</span>
                </label>
                <label class="flex items-center gap-2 bg-surface-dark/50 p-3 rounded-lg cursor-pointer hover:bg-surface-dark transition-colors">
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary" checked>
                  <span class="text-white text-sm">Sog'liqni saqlash</span>
                </label>
                <label class="flex items-center gap-2 bg-surface-dark/50 p-3 rounded-lg cursor-pointer hover:bg-surface-dark transition-colors">
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary">
                  <span class="text-white text-sm">Ta'lim</span>
                </label>
                <label class="flex items-center gap-2 bg-surface-dark/50 p-3 rounded-lg cursor-pointer hover:bg-surface-dark transition-colors">
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary">
                  <span class="text-white text-sm">Transport</span>
                </label>
                <label class="flex items-center gap-2 bg-surface-dark/50 p-3 rounded-lg cursor-pointer hover:bg-surface-dark transition-colors">
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary">
                  <span class="text-white text-sm">IT</span>
                </label>
                <label class="flex items-center gap-2 bg-surface-dark/50 p-3 rounded-lg cursor-pointer hover:bg-surface-dark transition-colors">
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary">
                  <span class="text-white text-sm">Boshqa</span>
                </label>
              </div>
            </div>
            
            <!-- AI Options -->
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-purple-500">psychology</span>
                AI Tahlil Sozlamalari
              </h4>
              <div class="space-y-3">
                <label class="flex items-center justify-between">
                  <div>
                    <p class="text-white text-sm">Risk tahlili</p>
                    <p class="text-text-secondary text-xs">Barcha tenderlar risklarini tahlil qilish</p>
                  </div>
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary" checked>
                </label>
                <label class="flex items-center justify-between">
                  <div>
                    <p class="text-white text-sm">Narx anomaliyalarini aniqlash</p>
                    <p class="text-text-secondary text-xs">Bozor narxlaridan chetga chiqishlarni aniqlash</p>
                  </div>
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary" checked>
                </label>
                <label class="flex items-center justify-between">
                  <div>
                    <p class="text-white text-sm">Trend prognozi</p>
                    <p class="text-text-secondary text-xs">Kelajakdagi tendentsiyalarni bashorat qilish</p>
                  </div>
                  <input type="checkbox" class="rounded border-border-dark text-primary focus:ring-primary">
                </label>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-3 mt-6">
            <button onclick="closeCreateReportModal()" class="flex-1 px-4 py-3 rounded-xl bg-surface-dark text-text-secondary hover:text-white transition-colors font-medium">
              Bekor qilish
            </button>
            <button onclick="generateAIReport()" class="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-lg">auto_awesome</span>
              Generatsiya qilish
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Report Modal -->
    <div id="viewReportModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-background-dark border border-border-dark rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border-dark flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">description</span>
            </div>
            <div>
              <h2 id="viewReportTitle" class="text-xl font-bold text-white">Hisobot nomi</h2>
              <p id="viewReportMeta" class="text-text-secondary text-sm">05.11.2023 • Oylik tahlil</p>
            </div>
          </div>
          <button onclick="closeViewReportModal()" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">close</span>
          </button>
        </div>
        <div class="p-6">
          <!-- Report Summary -->
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
              <p class="text-3xl font-bold text-white">156</p>
              <p class="text-text-secondary text-xs mt-1">Tahlil qilingan tenderlar</p>
            </div>
            <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
              <p class="text-3xl font-bold text-red-500">23</p>
              <p class="text-text-secondary text-xs mt-1">Yuqori xatarli</p>
            </div>
            <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
              <p class="text-3xl font-bold text-yellow-500">47</p>
              <p class="text-text-secondary text-xs mt-1">O'rtacha xatarli</p>
            </div>
            <div class="bg-surface-dark/50 rounded-xl p-4 text-center">
              <p class="text-3xl font-bold text-green-500">86</p>
              <p class="text-text-secondary text-xs mt-1">Past xatarli</p>
            </div>
          </div>
          
          <!-- Report Content Preview -->
          <div class="bg-surface-dark/30 rounded-xl p-6 mb-6">
            <h3 class="text-white font-semibold mb-4">Asosiy topilmalar</h3>
            <ul class="space-y-3 text-text-secondary text-sm">
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-lg">warning</span>
                <span>23 ta tender yuqori risk ko'rsatkichlariga ega - shubhali narx belgilash aniqlangan</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-yellow-500 text-lg">info</span>
                <span>5 ta tashkilot bir xil manfaatdor tomonlar bilan bog'langan</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-primary text-lg">lightbulb</span>
                <span>Qurilish sohasida narx anomaliyalari 15% ko'paygan</span>
              </li>
            </ul>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button onclick="downloadReportPDF()" class="flex-1 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">picture_as_pdf</span>
              PDF yuklab olish
            </button>
            <button onclick="downloadReportExcel()" class="flex-1 px-4 py-3 rounded-xl bg-green-500/10 text-green-500 font-medium hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">table_chart</span>
              Excel yuklab olish
            </button>
            <button onclick="shareReport()" class="flex-1 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">share</span>
              Ulashish
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render reports table
function renderReportsTable(reports) {
  const tab = window.currentReportsTab || 'all';
  let filteredReports = reports;
  
  if (tab === 'archived') {
    filteredReports = reports.filter(r => r.status === 'archived');
  } else if (tab === 'all') {
    filteredReports = reports.filter(r => r.status === 'active');
  }
  
  if (filteredReports.length === 0) {
    return `
      <tr>
        <td colspan="4" class="px-6 py-12 text-center text-text-secondary">
          <span class="material-symbols-outlined text-4xl mb-2 block">folder_open</span>
          <p>Hisobotlar topilmadi</p>
        </td>
      </tr>
    `;
  }
  
  return filteredReports.map(r => `
    <tr class="hover:bg-surface-dark/20 transition-colors">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-${r.typeColor === 'blue' ? 'primary' : r.typeColor + '-500'}">${r.icon}</span>
          <span class="text-white font-medium">${r.name}</span>
        </div>
      </td>
      <td class="px-6 py-4 text-text-secondary text-sm">${r.date}</td>
      <td class="px-6 py-4">
        <span class="px-2 py-1 bg-${r.typeColor}-500/10 text-${r.typeColor}-400 text-[10px] font-bold rounded uppercase">${r.type}</span>
      </td>
      <td class="px-6 py-4 text-right">
        <div class="flex justify-end gap-2">
          <button onclick="downloadReport('${r.id}')" class="text-primary hover:text-white transition-colors p-1 hover:bg-primary/20 rounded" title="Yuklab olish">
            <span class="material-symbols-outlined">download</span>
          </button>
          <button onclick="viewReport('${r.id}')" class="text-text-secondary hover:text-white transition-colors p-1 hover:bg-surface-dark rounded" title="Ko'rish">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button onclick="deleteReport('${r.id}')" class="text-text-secondary hover:text-red-500 transition-colors p-1 hover:bg-red-500/10 rounded" title="O'chirish">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Switch tabs
function switchReportsTab(tab) {
  window.currentReportsTab = tab;
  
  // Update tab styles
  ['all', 'archived', 'new'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      if (t === tab) {
        btn.classList.add('border-primary', 'text-white');
        btn.classList.remove('border-transparent', 'text-text-secondary');
      } else {
        btn.classList.remove('border-primary', 'text-white');
        btn.classList.add('border-transparent', 'text-text-secondary');
      }
    }
  });
  
  // Handle "new" tab - open modal
  if (tab === 'new') {
    openCreateReportModal();
    // Reset to "all" tab
    window.currentReportsTab = 'all';
    document.getElementById('tab-all').classList.add('border-primary', 'text-white');
    document.getElementById('tab-all').classList.remove('border-transparent', 'text-text-secondary');
    document.getElementById('tab-new').classList.remove('border-primary', 'text-white');
    document.getElementById('tab-new').classList.add('border-transparent', 'text-text-secondary');
    return;
  }
  
  // Update table
  const tbody = document.getElementById('reportsTableBody');
  if (tbody && window.reportsData) {
    tbody.innerHTML = renderReportsTable(window.reportsData);
    
    // Update count
    const count = tab === 'archived' 
      ? window.reportsData.filter(r => r.status === 'archived').length
      : window.reportsData.filter(r => r.status === 'active').length;
    document.getElementById('reportsCount').textContent = `Jami: ${count} ta`;
    document.getElementById('reportsInfo').textContent = `1-${count} gacha ko'rsatilmoqda`;
  }
}

// Select format
function selectFormat(format) {
  window.selectedFormat = format;
  
  const pdfBtn = document.getElementById('format-pdf');
  const excelBtn = document.getElementById('format-excel');
  
  if (format === 'pdf') {
    pdfBtn.classList.add('border-primary', 'text-primary');
    pdfBtn.classList.remove('border-border-dark', 'text-text-secondary');
    excelBtn.classList.remove('border-primary', 'text-primary');
    excelBtn.classList.add('border-border-dark', 'text-text-secondary');
  } else {
    excelBtn.classList.add('border-primary', 'text-primary');
    excelBtn.classList.remove('border-border-dark', 'text-text-secondary');
    pdfBtn.classList.remove('border-primary', 'text-primary');
    pdfBtn.classList.add('border-border-dark', 'text-text-secondary');
  }
  
  showToast(`Format ${format.toUpperCase()} tanlandi`, 'info');
}

// Update report config
function updateReportConfig() {
  // This function can be extended to update preview or other UI elements
  console.log('Report config updated');
}

// Open create report modal
function openCreateReportModal() {
  const modal = document.getElementById('createReportModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Close create report modal
function closeCreateReportModal() {
  const modal = document.getElementById('createReportModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Generate AI Report
function generateAIReport() {
  const name = document.getElementById('newReportName').value;
  if (!name.trim()) {
    showToast("Iltimos, hisobot nomini kiriting", 'error');
    return;
  }
  
  showToast("AI hisobot generatsiya qilinmoqda... Bu jarayon 1-2 daqiqa davom etishi mumkin", 'info');
  
  // Simulate progress
  setTimeout(() => {
    showToast("Hisobot muvaffaqiyatli yaratildi!", 'success');
    closeCreateReportModal();
  }, 2000);
}

// View report
function viewReport(id) {
  const report = window.reportsData?.find(r => r.id === id);
  if (!report) {
    showToast("Hisobot topilmadi", 'error');
    return;
  }
  
  document.getElementById('viewReportTitle').textContent = report.name;
  document.getElementById('viewReportMeta').textContent = `${report.date} • ${report.type}`;
  
  const modal = document.getElementById('viewReportModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Close view report modal
function closeViewReportModal() {
  const modal = document.getElementById('viewReportModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Download report
function downloadReport(id) {
  const report = window.reportsData?.find(r => r.id === id);
  const format = window.selectedFormat || 'pdf';
  showToast(`${report?.name || 'Hisobot'} ${format.toUpperCase()} formatida yuklab olinmoqda...`, 'info');
}

// Download PDF
function downloadReportPDF() {
  showToast("PDF yuklab olinmoqda...", 'info');
  closeViewReportModal();
}

// Download Excel
function downloadReportExcel() {
  showToast("Excel yuklab olinmoqda...", 'info');
  closeViewReportModal();
}

// Share report
function shareReport() {
  showToast("Ulashish havolasi clipboard'ga nusxalandi!", 'success');
}

// Delete report
function deleteReport(id) {
  if (confirm("Bu hisobotni o'chirishni tasdiqlaysizmi?")) {
    showToast("Hisobot o'chirildi", 'success');
    // In a real app, would remove from array and refresh table
  }
}

// Make functions globally available
window.renderReports = renderReports;
window.renderReportsTable = renderReportsTable;
window.switchReportsTab = switchReportsTab;
window.selectFormat = selectFormat;
window.updateReportConfig = updateReportConfig;
window.openCreateReportModal = openCreateReportModal;
window.closeCreateReportModal = closeCreateReportModal;
window.generateAIReport = generateAIReport;
window.viewReport = viewReport;
window.closeViewReportModal = closeViewReportModal;
window.downloadReport = downloadReport;
window.downloadReportPDF = downloadReportPDF;
window.downloadReportExcel = downloadReportExcel;
window.shareReport = shareReport;
window.deleteReport = deleteReport;
