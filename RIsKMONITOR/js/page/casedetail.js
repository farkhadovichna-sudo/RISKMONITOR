// ============================================
// PAGES - Case Detail (Tailwind Dark Theme)
// ============================================

function renderCaseDetail(params) {
  const caseId = params.id;
  const caseData = mockData.CASES.find(c => c.id === caseId);
  
  if (!caseData) {
    document.body.innerHTML = `
      <div class="bg-background-dark text-white font-display min-h-screen flex items-center justify-center">
        <div class="text-center">
          <span class="material-symbols-outlined text-6xl text-text-secondary mb-4">search_off</span>
          <h2 class="text-2xl font-bold mb-2">Case topilmadi</h2>
          <p class="text-text-secondary mb-6">ID: ${caseId}</p>
          <a href="#/app/cases" class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors">
            <span class="material-symbols-outlined text-lg">arrow_back</span>
            Cases ro'yxatiga qaytish
          </a>
        </div>
      </div>
    `;
    return;
  }
  
  const tender = mockData.TENDERS.find(t => t.id === caseData.tenderId);
  const riskScore = caseData.tenderSummary.riskScore;
  const riskBand = caseData.tenderSummary.riskBand;
  
  const statusConfig = {
    'new': { label: 'Yangi', color: 'blue', icon: 'fiber_new' },
    'in_review': { label: 'Tekshiruvda', color: 'yellow', icon: 'hourglass_top' },
    'decision': { label: 'Qaror kutilmoqda', color: 'purple', icon: 'gavel' },
    'closed': { label: 'Yopilgan', color: 'green', icon: 'check_circle' }
  };
  
  const status = statusConfig[caseData.status] || statusConfig['new'];
  const riskColor = riskScore >= 80 ? '#ef4444' : riskScore >= 60 ? '#f59e0b' : '#22c55e';
  const riskLabel = riskScore >= 80 ? 'Yuqori xavf' : riskScore >= 60 ? "O'rta xavf" : 'Past xavf';

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
            
            <!-- User Profile -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50">
                <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center text-white font-bold">A</div>
                <div class="flex flex-col">
                  <span class="text-white text-sm font-semibold">Admin</span>
                  <span class="text-text-secondary text-xs">Inspektor</span>
                </div>
              </div>
              <a href="#/" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-dark transition-colors">
                <span class="material-symbols-outlined text-[20px]">logout</span>
                <p class="text-sm font-medium leading-normal">Chiqish</p>
              </a>
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
              </div>
            </div>
            <div class="flex flex-1 justify-end gap-6 items-center">
              <button class="flex items-center justify-center rounded-lg size-10 bg-surface-dark text-white hover:bg-[#2d3f61] transition-colors relative">
                <span class="material-symbols-outlined text-[20px]">notifications</span>
                <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
              </button>
              <div class="bg-primary/20 rounded-full size-10 flex items-center justify-center border-2 border-surface-dark text-white font-bold">A</div>
            </div>
          </header>

          <!-- Main Content -->
          <main class="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
            <div class="max-w-[1400px] mx-auto flex flex-col gap-6">
              
              <!-- Breadcrumb -->
              <div class="flex items-center gap-2 text-sm text-text-secondary">
                <a href="#/app/dashboard" class="hover:text-primary">Dashboard</a>
                <span>/</span>
                <a href="#/app/cases" class="hover:text-primary">Cases</a>
                <span>/</span>
                <span class="text-white">${caseData.id}</span>
              </div>
              
              <!-- Page Title -->
              <h1 class="text-3xl font-bold text-white">${caseData.id}</h1>
              
              <!-- Main Info Card -->
              <div class="rounded-xl bg-surface-dark border border-white/10 p-6">
                <div class="flex gap-8">
                  <!-- Left: Case Info -->
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-6">
                      <h2 class="text-2xl font-bold text-white">${caseData.id}</h2>
                      <span class="px-3 py-1 rounded-full text-sm font-medium ${
                        status.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        status.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        status.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }">${status.label}</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <span class="material-symbols-outlined text-base">description</span>
                          Tender
                        </div>
                        <a href="#/app/tenders/${caseData.tenderId}" class="text-primary font-semibold hover:underline">${caseData.tenderId}</a>
                      </div>
                      <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <span class="material-symbols-outlined text-base">apartment</span>
                          Buyurtmachi
                        </div>
                        <div class="text-white font-semibold">${caseData.tenderSummary.buyurtmachi}</div>
                      </div>
                      <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <span class="material-symbols-outlined text-base">emoji_events</span>
                          G'olib
                        </div>
                        <div class="text-white font-semibold">${caseData.tenderSummary.golib}</div>
                      </div>
                      <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <span class="material-symbols-outlined text-base">payments</span>
                          Shartnoma summasi
                        </div>
                        <div class="text-white font-semibold">${mockData.formatSum(caseData.tenderSummary.summa)}</div>
                      </div>
                      <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <span class="material-symbols-outlined text-base">person</span>
                          Tayinlangan inspektor
                        </div>
                        <div class="text-white font-semibold">${caseData.assignedTo}</div>
                      </div>
                      <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="flex items-center gap-2 text-text-secondary text-sm mb-1">
                          <span class="material-symbols-outlined text-base">calendar_month</span>
                          Yaratilgan
                        </div>
                        <div class="text-white font-semibold">${mockData.formatDate(caseData.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Right: Risk Score & Actions -->
                  <div class="w-64 flex flex-col gap-4">
                    <!-- Risk Score -->
                    <div class="bg-background-dark rounded-xl p-6 border border-white/5 text-center">
                      <div class="relative w-24 h-24 mx-auto mb-3">
                        <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
                          <circle cx="50" cy="50" r="40" fill="none" 
                            stroke="${riskColor}" 
                            stroke-width="8" 
                            stroke-dasharray="${riskScore * 2.51} 251" 
                            stroke-linecap="round"/>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                          <span class="text-3xl font-bold" style="color: ${riskColor}">${riskScore}</span>
                          <span class="text-xs text-text-secondary">ball</span>
                        </div>
                      </div>
                      <div class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm" style="background: ${riskColor}20; color: ${riskColor}; border: 1px solid ${riskColor}40">
                        ⚠️ ${riskLabel}
                      </div>
                    </div>
                    
                    <!-- Decision Buttons -->
                    <div class="bg-background-dark rounded-xl p-4 border border-white/5">
                      <div class="text-text-secondary text-xs font-medium mb-3 uppercase tracking-wider">Inspektor Qarori</div>
                      <div class="flex flex-col gap-2">
                        <button onclick="makeDecision('tekshiruv')" class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-500/20">
                          <span class="material-symbols-outlined text-lg">search</span>
                          Tekshiruvga tavsiya
                        </button>
                        <button onclick="makeDecision('yopish')" class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-green-500/20">
                          <span class="material-symbols-outlined text-lg">check_circle</span>
                          Yopish
                        </button>
                        <button onclick="makeDecision('false_positive')" class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-surface-dark hover:bg-white/10 text-white font-medium rounded-lg transition-all border border-white/10">
                          <span class="material-symbols-outlined text-lg">close</span>
                          False positive
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Timeline & Comments -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Timeline -->
                <div class="rounded-xl bg-surface-dark border border-white/10 p-6">
                  <div class="flex items-center gap-2 mb-6">
                    <span class="material-symbols-outlined text-primary">schedule</span>
                    <h3 class="text-lg font-bold text-white">Timeline</h3>
                  </div>
                  <div class="space-y-4" id="timeline">
                    ${caseData.timeline.map(t => `
                      <div class="flex gap-3">
                        <div class="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                        <div class="flex-1 pb-4 border-b border-white/5 last:border-0">
                          <div class="text-white font-medium">${t.event}</div>
                          <div class="text-text-secondary text-sm">${mockData.formatDate(t.date)} • ${t.user}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Comments -->
                <div class="lg:col-span-2 rounded-xl bg-surface-dark border border-white/10 p-6">
                  <div class="flex items-center gap-2 mb-6">
                    <span class="material-symbols-outlined text-primary">chat</span>
                    <h3 class="text-lg font-bold text-white">Izohlar</h3>
                    <span class="px-2 py-0.5 bg-background-dark text-text-secondary text-xs rounded-full">${caseData.comments.length}</span>
                  </div>
                  
                  ${caseData.comments.length > 0 ? `
                    <div class="space-y-3 mb-6">
                      ${caseData.comments.map(c => `
                        <div class="bg-background-dark rounded-lg p-4 border border-white/5">
                          <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                              <div class="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-white text-xs font-bold">${c.user.charAt(0)}</div>
                              <span class="text-white font-medium">${c.user}</span>
                            </div>
                            <span class="text-text-secondary text-sm">${mockData.formatDate(c.date)}</span>
                          </div>
                          <p class="text-text-secondary pl-9">${c.text}</p>
                        </div>
                      `).join('')}
                    </div>
                  ` : `
                    <div class="text-center py-12">
                      <span class="material-symbols-outlined text-4xl text-text-secondary mb-2">forum</span>
                      <p class="text-text-secondary">Hozircha izoh yo'q</p>
                    </div>
                  `}
                  
                  <div class="flex gap-3">
                    <textarea id="newComment" rows="2" placeholder="Izoh qo'shing..." class="flex-1 bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-secondary resize-none focus:outline-none focus:border-primary"></textarea>
                    <button onclick="addComment()" class="px-6 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                      <span class="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Risk Reasons -->
              ${tender ? `
                <div class="rounded-xl bg-surface-dark border border-white/10 p-6">
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-red-500">warning</span>
                      <h3 class="text-lg font-bold text-white">Risk sabablari</h3>
                      <span class="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20">${tender.riskSabablari.length} ta</span>
                    </div>
                    <a href="#/app/tenders/${tender.id}" class="flex items-center gap-2 px-4 py-2 bg-background-dark hover:bg-white/5 text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
                      <span class="material-symbols-outlined text-base">visibility</span>
                      Tenderni ko'rish
                    </a>
                  </div>
                  
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    ${tender.riskSabablari.map((r, i) => `
                      <div class="flex items-start gap-4 bg-background-dark rounded-lg p-4 border border-white/5">
                        <div class="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                          r.ball >= 20 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                          r.ball >= 10 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                          'bg-gradient-to-br from-green-500 to-emerald-500'
                        }">+${r.ball}</div>
                        <div class="flex-1">
                          <div class="text-white font-semibold mb-1">${i + 1}. ${r.sabab}</div>
                          <div class="text-text-secondary text-sm">${r.izoh}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Attachments -->
              <div class="rounded-xl bg-surface-dark border border-white/10 p-6">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">attach_file</span>
                    <h3 class="text-lg font-bold text-white">Ilovalar</h3>
                  </div>
                  <button onclick="uploadAttachment()" class="flex items-center gap-2 px-4 py-2 bg-background-dark hover:bg-white/5 text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
                    <span class="material-symbols-outlined text-base">add</span>
                    Ilova qo'shish
                  </button>
                </div>
                
                <div class="flex flex-wrap gap-4">
                  <div class="bg-background-dark rounded-xl p-5 border border-white/5 text-center min-w-[140px] hover:border-primary/50 transition-colors cursor-pointer">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <span class="material-symbols-outlined text-2xl text-red-500">picture_as_pdf</span>
                    </div>
                    <div class="text-white text-sm font-medium">Tender_docs.pdf</div>
                    <div class="text-text-secondary text-xs">2.4 MB</div>
                  </div>
                  <div class="bg-background-dark rounded-xl p-5 border border-white/5 text-center min-w-[140px] hover:border-primary/50 transition-colors cursor-pointer">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span class="material-symbols-outlined text-2xl text-green-500">table_chart</span>
                    </div>
                    <div class="text-white text-sm font-medium">Analysis.xlsx</div>
                    <div class="text-text-secondary text-xs">156 KB</div>
                  </div>
                  <div onclick="uploadAttachment()" class="bg-background-dark rounded-xl p-5 border border-dashed border-white/20 text-center min-w-[140px] hover:border-primary/50 hover:bg-surface-dark/50 transition-all cursor-pointer">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-lg bg-surface-dark flex items-center justify-center">
                      <span class="material-symbols-outlined text-2xl text-text-secondary">add</span>
                    </div>
                    <div class="text-text-secondary text-sm">Yangi fayl</div>
                    <div class="text-text-secondary text-xs">yuklash</div>
                  </div>
                </div>
              </div>
              
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

function makeDecision(decision) {
  const decisionConfig = {
    tekshiruv: {
      icon: 'search',
      title: 'Tekshiruvga tavsiya',
      message: "Bu case'ni tekshiruvga tavsiya qilishga ishonchingiz komilmi?",
      successMessage: 'Case tekshiruvga tavsiya etildi',
      color: '#ef4444'
    },
    yopish: {
      icon: 'check_circle',
      title: "Case'ni yopish",
      message: "Bu case'ni muvaffaqiyatli yopishga ishonchingiz komilmi?",
      successMessage: 'Case muvaffaqiyatli yopildi',
      color: '#10b981'
    },
    false_positive: {
      icon: 'close',
      title: 'False Positive',
      message: "Bu case'ni noto'g'ri signal (false positive) deb belgilashga ishonchingiz komilmi?",
      successMessage: 'Case false positive deb belgilandi',
      color: '#64748b'
    }
  };
  
  const config = decisionConfig[decision];
  if (!config) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'decisionConfirmModal';
  overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50';
  overlay.innerHTML = `
    <div class="bg-surface-dark border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" style="animation: modalPop 0.2s ease-out;">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center" style="background: ${config.color}20">
          <span class="material-symbols-outlined text-3xl" style="color: ${config.color}">${config.icon}</span>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">${config.title}</h3>
        <p class="text-text-secondary mb-6">${config.message}</p>
        <div class="flex gap-3 justify-center">
          <button onclick="closeDecisionModal()" class="px-6 py-2.5 bg-background-dark hover:bg-white/5 text-white font-medium rounded-lg transition-colors border border-white/10">
            Bekor qilish
          </button>
          <button onclick="confirmDecision('${decision}')" class="px-6 py-2.5 font-medium rounded-lg transition-colors text-white" style="background: ${config.color}">
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDecisionModal();
  });
  
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

function closeDecisionModal() {
  const modal = document.getElementById('decisionConfirmModal');
  if (modal) modal.remove();
}

function confirmDecision(decision) {
  closeDecisionModal();
  
  const successMessages = {
    tekshiruv: 'Case tekshiruvga tavsiya etildi!',
    yopish: 'Case muvaffaqiyatli yopildi!',
    false_positive: 'Case false positive deb belgilandi!'
  };
  
  showToast(successMessages[decision], 'success');
  
  const timeline = document.getElementById('timeline');
  if (timeline) {
    const dateStr = new Date().toLocaleDateString('uz-UZ', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
    
    const newEvent = document.createElement('div');
    newEvent.className = 'flex gap-3';
    newEvent.innerHTML = `
      <div class="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></div>
      <div class="flex-1 pb-4 border-b border-white/5">
        <div class="text-white font-medium">${successMessages[decision].replace('!', '')}</div>
        <div class="text-text-secondary text-sm">${dateStr} • Siz</div>
      </div>
    `;
    timeline.insertBefore(newEvent, timeline.firstChild);
  }
}

window.closeDecisionModal = closeDecisionModal;
window.confirmDecision = confirmDecision;

function addComment() {
  const commentInput = document.getElementById('newComment');
  const comment = commentInput.value.trim();
  if (comment) {
    showToast("Izoh qo'shildi!", 'success');
    commentInput.value = '';
  }
}

function uploadAttachment() {
  showToast('Demo: Fayl yuklash oynasi ochiladi', 'info');
}

window.renderCaseDetail = renderCaseDetail;
window.makeDecision = makeDecision;
window.addComment = addComment;
window.uploadAttachment = uploadAttachment;
