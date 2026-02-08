// ============================================
// PAGES - Tender Detail (Modern Dark Theme)
// ============================================

function renderTenderDetail(params) {
  const tenderId = params.id;
  const tender = mockData.TENDERS.find(t => t.id === tenderId);
  
  if (!tender) {
    document.body.innerHTML = `
      <div class="min-h-screen bg-background-dark flex items-center justify-center">
        <div class="text-center">
          <div class="text-6xl mb-4">🔍</div>
          <h2 class="text-2xl font-bold text-white mb-2">Tender topilmadi</h2>
          <p class="text-text-secondary mb-6">ID: ${tenderId}</p>
          <a href="#/app/dashboard" class="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors inline-block">
            Dashboardga qaytish
          </a>
        </div>
      </div>
    `;
    return;
  }

  const riskConfig = {
    high: { bg: 'bg-red-500', text: 'text-red-500', label: 'YUQORI XAVF', glow: 'shadow-red-500/30' },
    medium: { bg: 'bg-orange-500', text: 'text-orange-500', label: 'ORTA XAVF', glow: 'shadow-orange-500/30' },
    low: { bg: 'bg-green-500', text: 'text-green-500', label: 'PAST XAVF', glow: 'shadow-green-500/30' }
  };
  
  const risk = riskConfig[tender.riskBand] || riskConfig.medium;

  document.body.innerHTML = `
    <div class="min-h-screen bg-background-dark text-white">
      <!-- Navigation -->
      ${renderModernNav('tenders')}
      
      <!-- AI Disclaimer Banner -->
      <div class="bg-primary/10 border-b border-primary/20">
        <div class="max-w-7xl mx-auto px-6 py-3">
          <div class="flex items-center gap-3 text-primary">
            <span class="material-symbols-outlined text-lg">info</span>
            <span class="text-sm font-medium">AI qaror qabul qilmaydi — faqat signal va izoh beradi. Yakuniy qaror inspektor mas'uliyati.</span>
          </div>
        </div>
      </div>
      
      <!-- Breadcrumb -->
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center gap-2 text-sm text-text-secondary">
          <a href="#/app/dashboard" class="hover:text-primary transition-colors">Dashboard</a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <a href="#/app/tenders" class="hover:text-primary transition-colors">Tenderlar</a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-white font-medium">${tender.id}</span>
        </div>
      </div>
      
      <main class="max-w-7xl mx-auto px-6 pb-12 space-y-8">
        <!-- Header Card with Risk Score -->
        <div class="rounded-2xl border border-border-dark bg-surface-dark/50 backdrop-blur-md overflow-hidden">
          <div class="p-8">
            <div class="flex flex-col lg:flex-row lg:items-center gap-8">
              <!-- Risk Score -->
              <div class="flex items-center gap-6">
                <div class="relative">
                  <div class="size-24 rounded-2xl ${risk.bg}/10 flex items-center justify-center border-2 ${risk.bg.replace('bg-', 'border-')}/30 shadow-lg ${risk.glow}">
                    <span class="text-4xl font-bold ${risk.text}">${tender.riskScore}</span>
                  </div>
                  <div class="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold ${risk.bg} text-white uppercase tracking-wider shadow-lg">
                      ${risk.label}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-white mb-1">${tender.id}</h1>
                  <p class="text-text-secondary">Risk ball</p>
                </div>
              </div>
              
              <!-- Divider -->
              <div class="hidden lg:block w-px h-20 bg-border-dark"></div>
              
              <!-- Tender Info Grid -->
              <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div class="text-text-secondary text-sm mb-1">Buyurtmachi</div>
                  <div class="font-semibold text-white">${tender.buyurtmachi}</div>
                </div>
                <div>
                  <div class="text-text-secondary text-sm mb-1">G'olib kompaniya</div>
                  <div class="font-semibold text-white">${tender.golib}</div>
                </div>
                <div>
                  <div class="text-text-secondary text-sm mb-1">Shartnoma summasi</div>
                  <div class="font-semibold text-white">${mockData.formatSum(tender.summa)}</div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button onclick="runAIAnalysis('${tender.id}')" class="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/30">
                  <span class="text-lg">🤖</span>
                  AI Tahlil
                </button>
                <button onclick="openCaseFromTender('${tender.id}')" class="flex items-center gap-2 px-5 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
                  <span class="material-symbols-outlined">folder_open</span>
                  Case ochish
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- AI Analysis Panel (Hidden by default) -->
        <div id="aiAnalysisPanel" class="hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-md overflow-hidden">
          <div class="p-6 border-b border-purple-500/20 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <span class="text-xl">🤖</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">AI Risk Tahlili</h3>
                <span id="aiModelBadge" class="text-xs text-purple-400">GPT-4o</span>
              </div>
            </div>
            <button onclick="closeAIPanel()" class="size-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="aiAnalysisContent" class="p-6 ai-analysis-content">
            <!-- AI response will be typed here -->
          </div>
        </div>
        
        <!-- Risk Reasons Panel -->
        <div class="rounded-2xl border border-border-dark bg-surface-dark/50 backdrop-blur-md overflow-hidden">
          <div class="p-6 border-b border-border-dark flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">💡</span>
              <div>
                <h3 class="text-lg font-bold text-white">Top-5 risk sabablari (AI tahlili)</h3>
                <p class="text-text-secondary text-sm">Qonuniy asoslar bilan</p>
              </div>
            </div>
          </div>
          
          <div class="divide-y divide-border-dark">
            ${tender.riskSabablari.map((r, i) => `
              <div class="p-6 hover:bg-white/[0.02] transition-colors">
                <div class="flex items-start gap-4">
                  <div class="size-12 rounded-xl ${r.ball >= 20 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'} border flex items-center justify-center font-bold text-lg shrink-0">
                    +${r.ball}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-white mb-1">${i + 1}. ${r.sabab}</h4>
                    <p class="text-text-secondary text-sm">${r.izoh}</p>
                    
                    <!-- Legal Basis (Collapsible) -->
                    <div id="legalInfo-${i}" class="hidden mt-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <div class="flex items-center gap-2 text-yellow-500 font-semibold mb-3">
                        <span class="material-symbols-outlined text-lg">gavel</span>
                        ${r.qonuniyAsos ? r.qonuniyAsos.qonun : "Davlat xaridlari to'g'risida qonun"}
                      </div>
                      <div class="space-y-2 text-sm">
                        <div class="flex gap-3">
                          <span class="text-yellow-500/70 min-w-[60px]">Modda:</span>
                          <span class="text-text-secondary">${r.qonuniyAsos ? r.qonuniyAsos.modda : '—'}</span>
                        </div>
                        <div class="flex gap-3">
                          <span class="text-yellow-500/70 min-w-[60px]">Matn:</span>
                          <span class="text-text-secondary">"${r.qonuniyAsos ? r.qonuniyAsos.matn : "Ma'lumot mavjud emas"}"</span>
                        </div>
                        <div class="flex gap-3">
                          <span class="text-yellow-500/70 min-w-[60px]">Jazosi:</span>
                          <span class="text-red-400">${r.qonuniyAsos ? r.qonuniyAsos.jazosi : '—'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onclick="toggleLegalInfo(${i})" class="px-4 py-2 rounded-xl bg-yellow-500/10 text-yellow-500 text-sm font-medium hover:bg-yellow-500/20 transition-all flex items-center gap-2 shrink-0">
                    <span class="material-symbols-outlined text-lg">gavel</span>
                    Qonuniy asos
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Disclaimer -->
          <div class="p-4 bg-primary/5 border-t border-border-dark">
            <div class="flex items-center gap-3 text-primary text-sm">
              <span class="material-symbols-outlined text-lg">info</span>
              Bu avtomatik signal. Yuqoridagi qonuniy asoslar faqat ma'lumot sifatida beriladi. Yakuniy qaror inspektor tomonidan qabul qilinadi.
            </div>
          </div>
        </div>
        
        <!-- Tabs Section -->
        <div class="rounded-2xl border border-border-dark bg-surface-dark/50 backdrop-blur-md overflow-hidden">
          <div class="flex border-b border-border-dark">
            <button onclick="switchTab('overview')" id="tab-overview" class="px-6 py-4 text-sm font-semibold text-white border-b-2 border-primary bg-white/5">
              📋 Overview
            </button>
            <button onclick="switchTab('bids')" id="tab-bids" class="px-6 py-4 text-sm font-semibold text-text-secondary hover:text-white border-b-2 border-transparent hover:bg-white/5 transition-all">
              🏢 Takliflar
            </button>
            <button onclick="switchTab('audit')" id="tab-audit" class="px-6 py-4 text-sm font-semibold text-text-secondary hover:text-white border-b-2 border-transparent hover:bg-white/5 transition-all">
              📝 Audit
            </button>
          </div>
          
          <!-- Tab Contents -->
          <div id="tabContent-overview" class="p-6">
            ${renderModernOverview(tender)}
          </div>
          <div id="tabContent-bids" class="p-6 hidden">
            ${renderModernBids(tender)}
          </div>
          <div id="tabContent-audit" class="p-6 hidden">
            ${renderModernAudit(tender)}
          </div>
        </div>
      </main>
    </div>
  `;
}

function renderModernNav(active) {
  const navItems = [
    { id: 'dashboard', label: 'Bosh sahifa', href: '#/app/dashboard' },
    { id: 'tenders', label: 'Tenderlar', href: '#/app/tenders' },
    { id: 'cases', label: 'Keyslar', href: '#/app/cases' },
    { id: 'analytics', label: 'Tahlillar', href: '#/app/analytics' },
    { id: 'anomaly', label: 'Narx anomaliyasi', href: '#/app/anomaly' },
    { id: 'reports', label: 'Hisobot', href: '#/app/reports' }
  ];
  
  return `
    <nav class="sticky top-0 z-40 bg-background-dark/95 backdrop-blur-md border-b border-border-dark">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <a href="#/app/dashboard" class="flex items-center gap-3">
              <div class="size-9 rounded-xl bg-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xl">shield</span>
              </div>
              <span class="text-lg font-bold text-white">RiskMonitor</span>
            </a>
            <div class="hidden md:flex items-center gap-1">
              ${navItems.map(item => `
                <a href="${item.href}" class="px-4 py-2 rounded-lg text-sm font-medium ${active === item.id ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white hover:bg-white/5'} transition-all">
                  ${item.label}
                </a>
              `).join('')}
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="relative size-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all">
              <span class="material-symbols-outlined">notifications</span>
              <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="size-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderModernOverview(tender) {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Tender Info -->
      <div class="space-y-4">
        <h4 class="font-semibold text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">description</span>
          Tender ma'lumotlari
        </h4>
        <div class="space-y-3">
          ${[
            { label: 'Tender ID', value: tender.id },
            { label: 'Buyurtmachi', value: tender.buyurtmachi },
            { label: 'Soha', value: tender.soha },
            { label: 'Hudud', value: tender.hudud },
            { label: "E'lon sanasi", value: mockData.formatDate(tender.sana) },
            { label: 'Shartnoma summasi', value: mockData.formatSum(tender.summa) }
          ].map(item => `
            <div class="flex justify-between py-3 border-b border-border-dark last:border-0">
              <span class="text-text-secondary">${item.label}</span>
              <span class="font-medium text-white">${item.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Risk Stats -->
      <div class="space-y-4">
        <h4 class="font-semibold text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">analytics</span>
          Risk statistikasi
        </h4>
        <div class="space-y-3">
          <div class="flex justify-between items-center py-3 border-b border-border-dark">
            <span class="text-text-secondary">Risk ball</span>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-bold ${tender.riskBand === 'high' ? 'text-red-500' : tender.riskBand === 'medium' ? 'text-orange-500' : 'text-green-500'}">${tender.riskScore}</span>
              <span class="text-text-secondary">/ 100</span>
            </div>
          </div>
          ${[
            { label: 'Risk band', value: tender.riskBand === 'high' ? 'Yuqori' : tender.riskBand === 'medium' ? "O'rta" : 'Past' },
            { label: 'Ishtirokchilar soni', value: tender.ishtirokchilar },
            { label: "G'olib kompaniya", value: tender.golib },
            { label: 'Risk sabablari', value: tender.riskSabablari.length + ' ta' }
          ].map(item => `
            <div class="flex justify-between py-3 border-b border-border-dark last:border-0">
              <span class="text-text-secondary">${item.label}</span>
              <span class="font-medium text-white">${item.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderModernBids(tender) {
  return `
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-left text-text-secondary text-xs uppercase tracking-wider border-b border-border-dark">
            <th class="pb-4 font-semibold">#</th>
            <th class="pb-4 font-semibold">Kompaniya</th>
            <th class="pb-4 font-semibold">INN</th>
            <th class="pb-4 font-semibold">Taklif narxi</th>
            <th class="pb-4 font-semibold">Farq</th>
            <th class="pb-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-dark">
          ${tender.bids.map((bid, i) => {
            const winnerPrice = tender.bids.find(b => b.golib)?.narx || bid.narx;
            const diff = ((bid.narx - winnerPrice) / winnerPrice * 100).toFixed(1);
            return `
              <tr class="hover:bg-white/[0.02] transition-colors">
                <td class="py-4 text-text-secondary">${i + 1}</td>
                <td class="py-4 font-medium text-white">${bid.kompaniya}</td>
                <td class="py-4 text-text-secondary font-mono text-sm">${bid.inn}</td>
                <td class="py-4 font-medium text-white">${mockData.formatSum(bid.narx)}</td>
                <td class="py-4">
                  <span class="${diff > 0 ? 'text-orange-500' : 'text-green-500'} font-medium">
                    ${diff > 0 ? '+' : ''}${diff}%
                  </span>
                </td>
                <td class="py-4">
                  ${bid.golib 
                    ? '<span class="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20">G\'olib</span>'
                    : '<span class="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">Rad</span>'}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderModernAudit(tender) {
  return `
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${[
          { label: 'Qoidalar versiyasi', value: tender.rulesVersion },
          { label: "Ma'lumot manbasi", value: tender.dataSource },
          { label: 'Tahlil sanasi', value: mockData.formatDate(new Date().toISOString().split('T')[0]) },
          { label: 'Risk model', value: 'Rule-based v1.2 (ML placeholder)' }
        ].map(item => `
          <div class="p-4 rounded-xl bg-background-dark border border-border-dark">
            <div class="text-text-secondary text-sm mb-1">${item.label}</div>
            <div class="font-medium text-white">${item.value}</div>
          </div>
        `).join('')}
      </div>
      
      <!-- Audit Log -->
      <div class="p-6 rounded-xl bg-background-dark border border-border-dark">
        <h4 class="font-semibold text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">history</span>
          Audit log
        </h4>
        <div class="space-y-3">
          ${[
            { time: tender.sana, text: "Tender ma'lumotlari yuklandi" },
            { time: tender.sana, text: "Risk ball hisoblandi: " + tender.riskScore },
            { time: tender.sana, text: tender.riskSabablari.length + " ta risk sababi aniqlandi" }
          ].map(log => `
            <div class="flex items-start gap-3 py-3 border-b border-border-dark last:border-0">
              <span class="text-text-secondary text-sm font-mono">[${mockData.formatDate(log.time)}]</span>
              <span class="text-text-secondary">${log.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function switchTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('[id^="tabContent-"]').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('[id^="tab-"]').forEach(el => {
    el.classList.remove('text-white', 'border-primary', 'bg-white/5');
    el.classList.add('text-text-secondary', 'border-transparent');
  });
  
  // Show selected tab
  const content = document.getElementById('tabContent-' + tabId);
  const tab = document.getElementById('tab-' + tabId);
  if (content) content.classList.remove('hidden');
  if (tab) {
    tab.classList.remove('text-text-secondary', 'border-transparent');
    tab.classList.add('text-white', 'border-primary', 'bg-white/5');
  }
}

function openCaseFromTender(tenderId) {
  const existingCase = mockData.CASES.find(c => c.tenderId === tenderId);
  if (existingCase) {
    window.location.hash = '/app/cases/' + existingCase.id;
  } else {
    alert("Demo: Yangi case ochildi. Case sahifasiga o'ting.");
    window.location.hash = '/app/cases';
  }
}

function toggleLegalInfo(index) {
  const el = document.getElementById('legalInfo-' + index);
  if (el) {
    if (el.classList.contains('hidden')) {
      document.querySelectorAll('[id^="legalInfo-"]').forEach(section => {
        section.classList.add('hidden');
      });
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  }
}

// AI Analysis Functions
async function runAIAnalysis(tenderId) {
  const tender = mockData.TENDERS.find(t => t.id === tenderId);
  if (!tender) return;
  
  const panel = document.getElementById('aiAnalysisPanel');
  const content = document.getElementById('aiAnalysisContent');
  const modelBadge = document.getElementById('aiModelBadge');
  
  // Show panel with loading state
  panel.classList.remove('hidden');
  content.innerHTML = `
    <div class="flex items-center justify-center gap-4 py-8">
      <div class="size-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <span class="text-purple-400">AI tahlil qilmoqda...</span>
    </div>
  `;
  
  // Scroll to panel
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  try {
    const result = await AIService.analyzeRisk({
      id: tender.id,
      buyurtmachi: tender.buyurtmachi,
      summa: mockData.formatSum(tender.summa),
      golib: tender.golib,
      ishtirokchilar: tender.ishtirokchilar,
      riskBall: tender.riskScore,
      riskBand: tender.riskBand,
      riskReasons: tender.riskSabablari
    });
    
    if (result.success) {
      modelBadge.textContent = result.model === 'mock-gpt-4o' ? 'Mock GPT-4o' : result.model;
      content.innerHTML = '';
      await AIService.typeText(content, result.analysis, AIConfig.typingDelay);
    } else {
      content.innerHTML = `
        <div class="flex items-center gap-3 text-red-400">
          <span class="material-symbols-outlined">error</span>
          <div>
            <div class="font-semibold">Xatolik yuz berdi</div>
            <div class="text-sm text-text-secondary">${result.error}</div>
          </div>
        </div>
      `;
    }
  } catch (error) {
    content.innerHTML = `
      <div class="flex items-center gap-3 text-red-400">
        <span class="material-symbols-outlined">error</span>
        <div>
          <div class="font-semibold">Xatolik yuz berdi</div>
          <div class="text-sm text-text-secondary">${error.message}</div>
        </div>
      </div>
    `;
  }
}

function closeAIPanel() {
  const panel = document.getElementById('aiAnalysisPanel');
  if (panel) {
    panel.classList.add('hidden');
  }
}

window.renderTenderDetail = renderTenderDetail;
window.openCaseFromTender = openCaseFromTender;
window.toggleLegalInfo = toggleLegalInfo;
window.switchTab = switchTab;
window.runAIAnalysis = runAIAnalysis;
window.closeAIPanel = closeAIPanel;
