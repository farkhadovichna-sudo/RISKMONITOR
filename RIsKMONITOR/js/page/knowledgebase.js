// ============================================
// PAGES - Knowledge Base (Me'yoriy-huquqiy baza)
// ============================================

function renderKnowledgeBase() {
  // Document categories
  const categories = [
    { id: 'laws', name: 'Qonunlar', icon: 'gavel', color: 'primary' },
    { id: 'decrees', name: 'Qarorlar', icon: 'verified', color: 'green' },
    { id: 'regulations', name: 'Nizomlar', icon: 'menu_book', color: 'orange' },
    { id: 'standards', name: 'Standartlar', icon: 'straighten', color: 'purple' },
    { id: 'guidelines', name: "Yo'riqnomalar", icon: 'description', color: 'cyan' },
    { id: 'internal', name: 'Ichki siyosat', icon: 'policy', color: 'pink' }
  ];

  // Mock documents data
  const documents = [
    {
      id: 'DOC-001',
      title: "O'zbekiston Respublikasining 'Davlat xaridlari to'g'risida'gi Qonuni",
      category: 'laws',
      uploadDate: '2024-01-15',
      validFrom: '2024-01-01',
      validUntil: null,
      status: 'active',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      aiIndexed: true,
      linkedRules: 24,
      version: '2.0',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-002',
      title: "Korrupsiyaga qarshi kurashish to'g'risida Qonun",
      category: 'laws',
      uploadDate: '2024-02-10',
      validFrom: '2017-01-01',
      validUntil: null,
      status: 'active',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      aiIndexed: true,
      linkedRules: 18,
      version: '1.5',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-003',
      title: "Vazirlar Mahkamasi qarori №432 - Tender limitlari",
      category: 'decrees',
      uploadDate: '2024-03-01',
      validFrom: '2024-03-15',
      validUntil: '2025-03-15',
      status: 'active',
      fileType: 'pdf',
      fileSize: '856 KB',
      aiIndexed: true,
      linkedRules: 8,
      version: '1.0',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-004',
      title: "Davlat xaridlarini tashkil etish tartibi to'g'risida Nizom",
      category: 'regulations',
      uploadDate: '2024-01-20',
      validFrom: '2024-02-01',
      validUntil: null,
      status: 'active',
      fileType: 'docx',
      fileSize: '1.2 MB',
      aiIndexed: true,
      linkedRules: 31,
      version: '3.0',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-005',
      title: "Bozor narxlarini aniqlash standarti",
      category: 'standards',
      uploadDate: '2024-02-15',
      validFrom: '2024-03-01',
      validUntil: null,
      status: 'active',
      fileType: 'pdf',
      fileSize: '945 KB',
      aiIndexed: true,
      linkedRules: 12,
      version: '2.1',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-006',
      title: "Texnik talablarni shakllantirish bo'yicha yo'riqnoma",
      category: 'guidelines',
      uploadDate: '2024-04-01',
      validFrom: '2024-04-15',
      validUntil: null,
      status: 'active',
      fileType: 'pdf',
      fileSize: '1.5 MB',
      aiIndexed: true,
      linkedRules: 15,
      version: '1.2',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-007',
      title: "Risk baholash metodikasi",
      category: 'internal',
      uploadDate: '2024-05-10',
      validFrom: '2024-05-15',
      validUntil: null,
      status: 'active',
      fileType: 'pdf',
      fileSize: '2.1 MB',
      aiIndexed: true,
      linkedRules: 42,
      version: '4.0',
      uploadedBy: 'Admin'
    },
    {
      id: 'DOC-008',
      title: "Eski tender qoidalari (arxiv)",
      category: 'regulations',
      uploadDate: '2023-01-15',
      validFrom: '2023-01-01',
      validUntil: '2024-01-31',
      status: 'archived',
      fileType: 'pdf',
      fileSize: '980 KB',
      aiIndexed: false,
      linkedRules: 0,
      version: '1.0',
      uploadedBy: 'Admin'
    }
  ];

  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    indexed: documents.filter(d => d.aiIndexed).length,
    totalRules: documents.reduce((sum, d) => sum + d.linkedRules, 0)
  };

  const categoryColors = {
    'primary': 'blue',
    'green': 'green',
    'orange': 'orange',
    'purple': 'purple',
    'cyan': 'cyan',
    'pink': 'pink'
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
            <a href="#/app/analytics" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Tahlillar</a>
            <a href="#/app/knowledge-base" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Bilimlar bazasi</a>
            <a href="#/app/reports" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark">Hisobot</a>
            ${isAdmin() ? '<a href="#/app/admin" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark flex items-center gap-1"><span class="material-symbols-outlined text-sm">shield_person</span>Admin</a>' : ''}
          </nav>
        </div>
        ${renderHeaderUserSection()}
      </header>

      <main class="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-12 rounded-xl bg-primary/20">
              <span class="material-symbols-outlined text-primary text-2xl">library_books</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-white">AI Bilimlar Bazasi</h1>
              <p class="text-text-secondary text-sm mt-1">Me'yoriy-huquqiy hujjatlar va AI o'qitish resurslari</p>
            </div>
          </div>
          <button onclick="showUploadModal()" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
            <span class="material-symbols-outlined">upload_file</span>
            Hujjat yuklash
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">folder</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Jami hujjatlar</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.total}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-green-500">check_circle</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Faol hujjatlar</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.active}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-purple-500">smart_toy</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">AI indekslangan</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.indexed}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-orange-500">rule</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Bog'langan qoidalar</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.totalRules}</p>
          </div>
        </div>

        <!-- Categories Filter -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button onclick="filterDocs('all')" class="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white" id="filter-all">
            Barchasi
          </button>
          ${categories.map(cat => `
            <button onclick="filterDocs('${cat.id}')" class="px-4 py-2 rounded-lg text-sm font-medium bg-surface-dark text-text-secondary hover:text-white transition-colors flex items-center gap-2" id="filter-${cat.id}">
              <span class="material-symbols-outlined text-sm">${cat.icon}</span>
              ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Documents List -->
        <div class="glass-panel rounded-xl overflow-hidden">
          <div class="p-4 border-b border-border-dark flex items-center justify-between">
            <h3 class="text-white font-semibold">Hujjatlar ro'yxati</h3>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input type="text" placeholder="Qidirish..." class="bg-surface-dark border border-border-dark rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary w-64">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
              </div>
            </div>
          </div>
          
          <div class="divide-y divide-border-dark/50" id="documentsContainer">
            ${documents.map(doc => {
              const category = categories.find(c => c.id === doc.category);
              const statusColor = doc.status === 'active' ? 'green' : 'gray';
              const fileIcon = doc.fileType === 'pdf' ? 'picture_as_pdf' : 'description';
              const fileIconColor = doc.fileType === 'pdf' ? 'red' : 'blue';
              
              return `
                <div class="p-4 hover:bg-surface-dark/50 transition-colors document-item" data-category="${doc.category}">
                  <div class="flex items-start gap-4">
                    <!-- File Icon -->
                    <div class="size-12 rounded-xl bg-${fileIconColor}-500/10 flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-${fileIconColor}-500">${fileIcon}</span>
                    </div>
                    
                    <!-- Document Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 class="text-white font-semibold text-sm mb-1">${doc.title}</h4>
                          <div class="flex flex-wrap items-center gap-2">
                            <span class="px-2 py-0.5 rounded text-xs font-medium bg-${category.color}-500/10 text-${category.color}-500 flex items-center gap-1">
                              <span class="material-symbols-outlined text-xs">${category.icon}</span>
                              ${category.name}
                            </span>
                            <span class="px-2 py-0.5 rounded text-xs font-medium bg-${statusColor}-500/10 text-${statusColor}-500">
                              ${doc.status === 'active' ? 'Faol' : 'Arxiv'}
                            </span>
                            ${doc.aiIndexed ? `
                              <span class="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-500 flex items-center gap-1">
                                <span class="material-symbols-outlined text-xs">smart_toy</span>
                                AI indekslangan
                              </span>
                            ` : ''}
                            <span class="text-text-secondary text-xs">v${doc.version}</span>
                          </div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                          <button onclick="viewDocument('${doc.id}')" class="p-2 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors" title="Ko'rish">
                            <span class="material-symbols-outlined text-lg">visibility</span>
                          </button>
                          <button onclick="editDocument('${doc.id}')" class="p-2 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors" title="Tahrirlash">
                            <span class="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button onclick="downloadDocument('${doc.id}')" class="p-2 rounded-lg bg-surface-dark text-text-secondary hover:text-white hover:bg-primary/20 transition-colors" title="Yuklab olish">
                            <span class="material-symbols-outlined text-lg">download</span>
                          </button>
                        </div>
                      </div>
                      
                      <!-- Document Details -->
                      <div class="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-outlined text-sm">calendar_today</span>
                          Yuklangan: ${new Date(doc.uploadDate).toLocaleDateString('uz-UZ')}
                        </span>
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-outlined text-sm">event_available</span>
                          Amal qiladi: ${new Date(doc.validFrom).toLocaleDateString('uz-UZ')}${doc.validUntil ? ` - ${new Date(doc.validUntil).toLocaleDateString('uz-UZ')}` : ' - Muddatsiz'}
                        </span>
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-outlined text-sm">insert_drive_file</span>
                          ${doc.fileSize}
                        </span>
                        <span class="flex items-center gap-1">
                          <span class="material-symbols-outlined text-sm">rule</span>
                          <span class="text-primary">${doc.linkedRules}</span> ta qoida bog'langan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- AI Training Status -->
        <div class="mt-8 glass-panel p-6 rounded-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-purple-500">psychology</span>
              </div>
              <div>
                <h3 class="text-white font-semibold">AI Model Holati</h3>
                <p class="text-text-secondary text-xs">So'nggi yangilanish: 2 soat oldin</p>
              </div>
            </div>
            <button onclick="retrainAI()" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors text-sm font-medium">
              <span class="material-symbols-outlined text-sm">refresh</span>
              Qayta o'qitish
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-text-secondary text-sm">O'qitish holati</span>
                <span class="size-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <p class="text-white font-semibold">Tayyor</p>
              <p class="text-green-500 text-xs mt-1">Barcha hujjatlar indekslangan</p>
            </div>
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-text-secondary text-sm">Ishlov berilgan</span>
              </div>
              <p class="text-white font-semibold">${stats.indexed} / ${stats.total}</p>
              <div class="w-full h-1.5 bg-surface-dark rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-purple-500 rounded-full" style="width: ${(stats.indexed / stats.total) * 100}%"></div>
              </div>
            </div>
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-text-secondary text-sm">Model versiyasi</span>
              </div>
              <p class="text-white font-semibold">v2.4.1</p>
              <p class="text-text-secondary text-xs mt-1">Yangilangan: 08.02.2026</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Upload Modal -->
    <div id="uploadModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-background-dark border border-border-dark rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border-dark flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">Yangi hujjat yuklash</h2>
          <button onclick="closeUploadModal()" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">close</span>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Hujjat nomi</label>
              <input type="text" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="Hujjat nomini kiriting">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Kategoriya</label>
              <select class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Amal qilish boshlanishi</label>
                <input type="date" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Amal qilish tugashi</label>
                <input type="date" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Fayl yuklash</label>
              <div class="border-2 border-dashed border-border-dark rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer" onclick="document.getElementById('fileInput').click()">
                <span class="material-symbols-outlined text-4xl text-text-secondary mb-2">cloud_upload</span>
                <p class="text-white font-medium">Faylni bu yerga tashlang</p>
                <p class="text-text-secondary text-sm mt-1">yoki yuklash uchun bosing</p>
                <p class="text-text-secondary text-xs mt-2">PDF, DOCX, maksimum 10MB</p>
                <input type="file" id="fileInput" class="hidden" accept=".pdf,.docx,.doc">
              </div>
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" id="aiIndex" checked class="size-4 rounded border-border-dark bg-surface-dark text-primary focus:ring-primary">
              <label for="aiIndex" class="text-sm text-white">AI uchun indekslash</label>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button onclick="closeUploadModal()" class="flex-1 px-4 py-3 rounded-xl bg-surface-dark text-text-secondary hover:text-white transition-colors font-medium">
              Bekor qilish
            </button>
            <button onclick="uploadDocument()" class="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Yuklash
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div id="editModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-background-dark border border-border-dark rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border-dark flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">edit_document</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Hujjatni tahrirlash</h2>
              <p class="text-text-secondary text-sm" id="editDocId"></p>
            </div>
          </div>
          <button onclick="closeEditModal()" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">close</span>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-5">
            <!-- Document Title -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Hujjat nomi *</label>
              <input type="text" id="editTitle" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="Hujjat nomini kiriting">
            </div>
            
            <!-- Category & Status -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Kategoriya</label>
                <select id="editCategory" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                  ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Holat</label>
                <select id="editStatus" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                  <option value="active">Faol</option>
                  <option value="archived">Arxiv</option>
                  <option value="draft">Qoralama</option>
                </select>
              </div>
            </div>
            
            <!-- Validity Dates -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Amal qilish boshlanishi</label>
                <input type="date" id="editValidFrom" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Amal qilish tugashi</label>
                <input type="date" id="editValidUntil" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                <p class="text-text-secondary text-xs mt-1">Bo'sh qoldiring agar muddatsiz bo'lsa</p>
              </div>
            </div>
            
            <!-- Version -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Versiya</label>
                <input type="text" id="editVersion" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="masalan: 2.0">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Fayl almashtirish</label>
                <div class="border border-dashed border-border-dark rounded-lg p-3 text-center hover:border-primary/50 transition-colors cursor-pointer" onclick="document.getElementById('editFileInput').click()">
                  <span class="material-symbols-outlined text-text-secondary text-lg">upload</span>
                  <span class="text-text-secondary text-sm ml-2">Yangi fayl yuklash</span>
                  <input type="file" id="editFileInput" class="hidden" accept=".pdf,.docx,.doc">
                </div>
              </div>
            </div>
            
            <!-- AI Settings -->
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-purple-500">smart_toy</span>
                AI Sozlamalari
              </h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-white text-sm">AI uchun indekslash</p>
                    <p class="text-text-secondary text-xs">Bu hujjatni AI tahlil qilishda ishlatsin</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="editAiIndexed" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-surface-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-white text-sm">Qayta indekslash</p>
                    <p class="text-text-secondary text-xs">O'zgarishlardan keyin qayta tahlil qilish</p>
                  </div>
                  <button onclick="reindexDocument()" class="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors text-sm font-medium flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">refresh</span>
                    Qayta indekslash
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Linked Rules Info -->
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-orange-500">rule</span>
                  <div>
                    <p class="text-white text-sm font-medium">Bog'langan qoidalar</p>
                    <p class="text-text-secondary text-xs" id="editLinkedRulesCount">0 ta qoida bog'langan</p>
                  </div>
                </div>
                <button onclick="manageRules()" class="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors text-sm font-medium">
                  Qoidalarni boshqarish
                </button>
              </div>
            </div>
            
            <!-- Danger Zone -->
            <div class="border border-red-500/30 rounded-xl p-4 bg-red-500/5">
              <h4 class="text-red-500 font-medium mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined">warning</span>
                Xavfli zona
              </h4>
              <div class="flex items-center justify-between">
                <p class="text-text-secondary text-sm">Bu hujjatni butunlay o'chirish</p>
                <button onclick="deleteDocument()" class="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">delete</span>
                  O'chirish
                </button>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-3 mt-6">
            <button onclick="closeEditModal()" class="flex-1 px-4 py-3 rounded-xl bg-surface-dark text-text-secondary hover:text-white transition-colors font-medium">
              Bekor qilish
            </button>
            <button onclick="saveDocument()" class="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-lg">save</span>
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Store documents globally for editing
  window.kbDocuments = documents;
  window.kbCategories = categories;
}

// Filter documents by category
function filterDocs(category) {
  const buttons = document.querySelectorAll('[id^="filter-"]');
  buttons.forEach(btn => {
    btn.classList.remove('bg-primary', 'text-white');
    btn.classList.add('bg-surface-dark', 'text-text-secondary');
  });
  
  const activeBtn = document.getElementById(`filter-${category}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-surface-dark', 'text-text-secondary');
    activeBtn.classList.add('bg-primary', 'text-white');
  }
  
  const items = document.querySelectorAll('.document-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Show upload modal
function showUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Close upload modal
function closeUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Upload document (demo)
function uploadDocument() {
  showToast("Hujjat muvaffaqiyatli yuklandi va AI uchun indekslanmoqda...", 'success');
  closeUploadModal();
}

// View document
function viewDocument(id) {
  showToast(`Hujjat ${id} ko'rilmoqda...`, 'info');
}

// Edit document - show modal with document data
function editDocument(id) {
  const doc = window.kbDocuments?.find(d => d.id === id);
  if (!doc) {
    showToast("Hujjat topilmadi", 'error');
    return;
  }
  
  // Fill form with document data
  document.getElementById('editDocId').textContent = `ID: ${doc.id}`;
  document.getElementById('editTitle').value = doc.title;
  document.getElementById('editCategory').value = doc.category;
  document.getElementById('editStatus').value = doc.status;
  document.getElementById('editValidFrom').value = doc.validFrom;
  document.getElementById('editValidUntil').value = doc.validUntil || '';
  document.getElementById('editVersion').value = doc.version;
  document.getElementById('editAiIndexed').checked = doc.aiIndexed;
  document.getElementById('editLinkedRulesCount').textContent = `${doc.linkedRules} ta qoida bog'langan`;
  
  // Store current document ID for saving
  window.currentEditDocId = id;
  
  // Show modal
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// Close edit modal
function closeEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  window.currentEditDocId = null;
}

// Save document changes
function saveDocument() {
  const id = window.currentEditDocId;
  if (!id) return;
  
  const title = document.getElementById('editTitle').value;
  const category = document.getElementById('editCategory').value;
  const status = document.getElementById('editStatus').value;
  const validFrom = document.getElementById('editValidFrom').value;
  const validUntil = document.getElementById('editValidUntil').value;
  const version = document.getElementById('editVersion').value;
  const aiIndexed = document.getElementById('editAiIndexed').checked;
  
  // Validate
  if (!title.trim()) {
    showToast("Hujjat nomini kiriting", 'error');
    return;
  }
  
  // In a real app, this would send to backend
  showToast(`Hujjat ${id} muvaffaqiyatli yangilandi`, 'success');
  closeEditModal();
  
  // Optionally refresh the page to show changes
  // renderKnowledgeBase();
}

// Reindex document for AI
function reindexDocument() {
  showToast("Hujjat qayta indekslanmoqda...", 'info');
}

// Manage linked rules
function manageRules() {
  showToast("Qoidalar boshqaruv sahifasi ishlab chiqilmoqda", 'info');
}

// Delete document
function deleteDocument() {
  const id = window.currentEditDocId;
  if (!id) return;
  
  if (confirm(`Hujjat ${id} ni o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.`)) {
    showToast(`Hujjat ${id} o'chirildi`, 'success');
    closeEditModal();
    // In a real app, refresh the list
    // renderKnowledgeBase();
  }
}

// Download document
function downloadDocument(id) {
  showToast(`Hujjat ${id} yuklab olinmoqda...`, 'info');
}

// Retrain AI
function retrainAI() {
  showToast("AI modeli qayta o'qitilmoqda. Bu jarayon bir necha daqiqa davom etishi mumkin.", 'info');
}

// Make functions globally available
window.renderKnowledgeBase = renderKnowledgeBase;
window.filterDocs = filterDocs;
window.showUploadModal = showUploadModal;
window.closeUploadModal = closeUploadModal;
window.uploadDocument = uploadDocument;
window.viewDocument = viewDocument;
window.editDocument = editDocument;
window.closeEditModal = closeEditModal;
window.saveDocument = saveDocument;
window.reindexDocument = reindexDocument;
window.manageRules = manageRules;
window.deleteDocument = deleteDocument;
window.downloadDocument = downloadDocument;
window.retrainAI = retrainAI;
