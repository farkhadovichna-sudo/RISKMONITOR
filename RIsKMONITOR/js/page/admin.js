// ============================================
// PAGES - Admin Panel (Foydalanuvchilar va ruxsatlar boshqaruvi)
// ============================================

function renderAdminPanel() {
  // Mock users data
  const users = [
    { id: 'USR-001', name: 'Abdullayev Anvar', email: 'anvar@riskmonitor.uz', role: 'admin', status: 'active', lastLogin: '08.02.2026, 17:20', avatar: 'A', department: 'IT Bo\'limi' },
    { id: 'USR-002', name: 'Karimova Nilufar', email: 'nilufar@riskmonitor.uz', role: 'inspector', status: 'active', lastLogin: '08.02.2026, 16:45', avatar: 'N', department: 'Nazorat bo\'limi' },
    { id: 'USR-003', name: 'Rahimov Bobur', email: 'bobur@riskmonitor.uz', role: 'analyst', status: 'active', lastLogin: '08.02.2026, 14:30', avatar: 'R', department: 'Tahlil bo\'limi' },
    { id: 'USR-004', name: 'Toshmatov Jamshid', email: 'jamshid@riskmonitor.uz', role: 'viewer', status: 'active', lastLogin: '07.02.2026, 11:00', avatar: 'T', department: 'Moliya bo\'limi' },
    { id: 'USR-005', name: 'Ergasheva Madina', email: 'madina@riskmonitor.uz', role: 'inspector', status: 'inactive', lastLogin: '01.02.2026, 09:15', avatar: 'E', department: 'Nazorat bo\'limi' },
    { id: 'USR-006', name: 'Qodirov Sardor', email: 'sardor@riskmonitor.uz', role: 'viewer', status: 'blocked', lastLogin: '25.01.2026, 14:00', avatar: 'Q', department: 'Tashqi aloqalar' },
  ];

  // Roles with permissions
  const roles = [
    { 
      id: 'admin', 
      name: 'Administrator', 
      color: 'red',
      permissions: ['users.manage', 'reports.full', 'tenders.full', 'cases.full', 'analytics.full', 'settings.full'],
      description: 'Tizimga to\'liq kirish huquqi'
    },
    { 
      id: 'inspector', 
      name: 'Inspektor', 
      color: 'blue',
      permissions: ['tenders.view', 'tenders.analyze', 'cases.create', 'cases.manage', 'reports.create'],
      description: 'Tenderlarni tekshirish va keyslar yaratish'
    },
    { 
      id: 'analyst', 
      name: 'Tahlilchi', 
      color: 'purple',
      permissions: ['tenders.view', 'analytics.full', 'reports.view', 'reports.create'],
      description: 'Tahlil va hisobotlar bilan ishlash'
    },
    { 
      id: 'viewer', 
      name: 'Ko\'ruvchi', 
      color: 'gray',
      permissions: ['tenders.view', 'reports.view', 'analytics.view'],
      description: 'Faqat ko\'rish huquqi'
    },
  ];

  // Activity logs
  const activityLogs = [
    { user: 'Anvar A.', action: 'Yangi foydalanuvchi qo\'shdi', target: 'Sardor Qodirov', time: '5 daqiqa oldin', icon: 'person_add', color: 'green' },
    { user: 'Nilufar K.', action: 'Keysni yopdi', target: 'KS-2024-0156', time: '15 daqiqa oldin', icon: 'check_circle', color: 'blue' },
    { user: 'Bobur R.', action: 'Hisobot yaratdi', target: 'Oylik tahlil', time: '1 soat oldin', icon: 'description', color: 'purple' },
    { user: 'Tizim', action: 'Bloklangan', target: 'Sardor Qodirov', time: '2 kun oldin', icon: 'block', color: 'red' },
    { user: 'Anvar A.', action: 'Rolni o\'zgartirdi', target: 'Madina E. → Inspektor', time: '3 kun oldin', icon: 'swap_horiz', color: 'orange' },
  ];

  // Store data globally
  window.adminUsers = users;
  window.adminRoles = roles;

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    blocked: users.filter(u => u.status === 'blocked').length,
  };

  document.body.innerHTML = `
    <div class="bg-background-dark font-display text-slate-100 antialiased min-h-screen overflow-y-auto">
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
            <a href="#/app/admin" class="text-primary font-semibold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">Admin Panel</a>
          </nav>
        </div>
        ${renderHeaderUserSection()}
      </header>

      <main class="px-10 py-8 max-w-7xl mx-auto w-full">
        <!-- Page Title -->
        <div class="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div class="flex items-center gap-4">
            <div class="size-14 rounded-xl bg-red-500/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-red-500 text-3xl">admin_panel_settings</span>
            </div>
            <div>
              <h1 class="text-white text-3xl font-black tracking-tight">Admin Panel</h1>
              <p class="text-text-secondary text-base font-normal">Foydalanuvchilar va ruxsatlarni boshqarish</p>
            </div>
          </div>
          <button onclick="openAddUserModal()" class="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined">person_add</span>
            Foydalanuvchi qo'shish
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">group</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Jami foydalanuvchilar</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.total}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-green-500">check_circle</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Faol</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.active}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-yellow-500">pause_circle</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Nofaol</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.inactive}</p>
          </div>
          <div class="glass-panel p-5 rounded-xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="size-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-red-500">block</span>
              </div>
              <span class="text-text-secondary text-sm font-medium">Bloklangan</span>
            </div>
            <p class="text-white text-3xl font-bold">${stats.blocked}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Users Table -->
          <div class="lg:col-span-2 glass-panel rounded-xl overflow-hidden">
            <div class="p-5 border-b border-border-dark flex justify-between items-center">
              <h2 class="text-white text-lg font-bold">Foydalanuvchilar ro'yxati</h2>
              <div class="flex items-center gap-3">
                <div class="relative">
                  <input type="text" placeholder="Qidirish..." class="bg-surface-dark border border-border-dark rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary w-48">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
                </div>
                <select class="bg-surface-dark border border-border-dark rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                  <option value="all">Barchasi</option>
                  <option value="active">Faol</option>
                  <option value="inactive">Nofaol</option>
                  <option value="blocked">Bloklangan</option>
                </select>
              </div>
            </div>
            <div class="divide-y divide-border-dark/50">
              ${users.map(user => {
                const role = roles.find(r => r.id === user.role);
                const statusColors = { active: 'green', inactive: 'yellow', blocked: 'red' };
                const statusLabels = { active: 'Faol', inactive: 'Nofaol', blocked: 'Bloklangan' };
                return `
                  <div class="p-4 hover:bg-surface-dark/30 transition-colors">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="size-11 rounded-full bg-${role?.color || 'gray'}-500/20 flex items-center justify-center text-${role?.color || 'gray'}-500 font-bold text-lg">${user.avatar}</div>
                        <div>
                          <h4 class="text-white font-semibold text-sm">${user.name}</h4>
                          <p class="text-text-secondary text-xs">${user.email}</p>
                          <p class="text-text-secondary text-xs mt-0.5">${user.department}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="text-right">
                          <span class="px-2 py-1 rounded text-xs font-medium bg-${role?.color || 'gray'}-500/10 text-${role?.color || 'gray'}-500">${role?.name || user.role}</span>
                          <p class="text-text-secondary text-xs mt-1">Oxirgi kirish: ${user.lastLogin}</p>
                        </div>
                        <div class="flex items-center gap-1">
                          <span class="size-2 rounded-full bg-${statusColors[user.status]}-500"></span>
                          <span class="text-${statusColors[user.status]}-500 text-xs">${statusLabels[user.status]}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <button onclick="editUser('${user.id}')" class="p-2 rounded-lg hover:bg-surface-dark text-text-secondary hover:text-white transition-colors" title="Tahrirlash">
                            <span class="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button onclick="toggleUserStatus('${user.id}')" class="p-2 rounded-lg hover:bg-surface-dark text-text-secondary hover:text-yellow-500 transition-colors" title="Holatni o'zgartirish">
                            <span class="material-symbols-outlined text-lg">${user.status === 'blocked' ? 'lock_open' : 'block'}</span>
                          </button>
                          <button onclick="deleteUser('${user.id}')" class="p-2 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-500 transition-colors" title="O'chirish">
                            <span class="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="space-y-6">
            <!-- Roles Card -->
            <div class="glass-panel rounded-xl overflow-hidden">
              <div class="p-4 border-b border-border-dark flex justify-between items-center">
                <h3 class="text-white font-bold">Rollar va ruxsatlar</h3>
                <button onclick="openRolesModal()" class="text-primary text-xs font-medium hover:underline">Boshqarish</button>
              </div>
              <div class="p-4 space-y-3">
                ${roles.map(role => `
                  <div class="flex items-center justify-between p-3 bg-surface-dark/30 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="size-8 rounded-lg bg-${role.color}-500/20 flex items-center justify-center">
                        <span class="material-symbols-outlined text-${role.color}-500 text-sm">badge</span>
                      </div>
                      <div>
                        <p class="text-white text-sm font-medium">${role.name}</p>
                        <p class="text-text-secondary text-xs">${role.permissions.length} ta ruxsat</p>
                      </div>
                    </div>
                    <span class="text-white text-sm font-bold">${users.filter(u => u.role === role.id).length}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Activity Log -->
            <div class="glass-panel rounded-xl overflow-hidden">
              <div class="p-4 border-b border-border-dark flex justify-between items-center">
                <h3 class="text-white font-bold">So'nggi faoliyat</h3>
                <button onclick="viewAllActivity()" class="text-primary text-xs font-medium hover:underline">Barchasini ko'rish</button>
              </div>
              <div class="divide-y divide-border-dark/30">
                ${activityLogs.map(log => `
                  <div class="p-3 hover:bg-surface-dark/20 transition-colors">
                    <div class="flex items-start gap-3">
                      <div class="size-8 rounded-lg bg-${log.color}-500/10 flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-${log.color}-500 text-sm">${log.icon}</span>
                      </div>
                      <div>
                        <p class="text-white text-xs"><span class="font-semibold">${log.user}</span> ${log.action}</p>
                        <p class="text-primary text-xs">${log.target}</p>
                        <p class="text-text-secondary text-xs mt-1">${log.time}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add/Edit User Modal -->
    <div id="userModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-background-dark border border-border-dark rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border-dark flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary" id="userModalIcon">person_add</span>
            </div>
            <h2 id="userModalTitle" class="text-xl font-bold text-white">Yangi foydalanuvchi</h2>
          </div>
          <button onclick="closeUserModal()" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">close</span>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Ism *</label>
                <input type="text" id="userName" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="To'liq ism">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Email *</label>
                <input type="email" id="userEmail" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="email@example.com">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Bo'lim</label>
                <input type="text" id="userDepartment" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="Bo'lim nomi">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">Telefon</label>
                <input type="tel" id="userPhone" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="+998 XX XXX XX XX">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Rol *</label>
              <select id="userRole" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
                ${roles.map(r => `<option value="${r.id}">${r.name} - ${r.description}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">Parol *</label>
              <input type="password" id="userPassword" class="w-full bg-surface-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary" placeholder="Kamida 8 ta belgi">
            </div>
            
            <!-- Permissions Preview -->
            <div class="bg-surface-dark/50 rounded-xl p-4">
              <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">verified_user</span>
                Rol ruxsatlari
              </h4>
              <div id="permissionsPreview" class="flex flex-wrap gap-2"></div>
            </div>
          </div>
          
          <div class="flex gap-3 mt-6">
            <button onclick="closeUserModal()" class="flex-1 px-4 py-3 rounded-xl bg-surface-dark text-text-secondary hover:text-white transition-colors font-medium">Bekor qilish</button>
            <button onclick="saveUser()" class="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-lg">save</span>
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Roles Management Modal -->
    <div id="rolesModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-background-dark border border-border-dark rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border-dark flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-500">shield_person</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Rollar va ruxsatlar</h2>
              <p class="text-text-secondary text-sm">Har bir rol uchun kirish huquqlarini belgilang</p>
            </div>
          </div>
          <button onclick="closeRolesModal()" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">close</span>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            ${roles.map(role => `
              <div class="bg-surface-dark/30 rounded-xl p-4">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="size-10 rounded-lg bg-${role.color}-500/20 flex items-center justify-center">
                      <span class="material-symbols-outlined text-${role.color}-500">badge</span>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">${role.name}</h4>
                      <p class="text-text-secondary text-xs">${role.description}</p>
                    </div>
                  </div>
                  <span class="text-text-secondary text-sm">${users.filter(u => u.role === role.id).length} foydalanuvchi</span>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <label class="flex items-center gap-2 text-sm text-white">
                    <input type="checkbox" ${role.permissions.some(p => p.includes('tenders')) ? 'checked' : ''} class="rounded border-border-dark text-primary focus:ring-primary">
                    Tenderlar
                  </label>
                  <label class="flex items-center gap-2 text-sm text-white">
                    <input type="checkbox" ${role.permissions.some(p => p.includes('cases')) ? 'checked' : ''} class="rounded border-border-dark text-primary focus:ring-primary">
                    Keyslar
                  </label>
                  <label class="flex items-center gap-2 text-sm text-white">
                    <input type="checkbox" ${role.permissions.some(p => p.includes('reports')) ? 'checked' : ''} class="rounded border-border-dark text-primary focus:ring-primary">
                    Hisobotlar
                  </label>
                  <label class="flex items-center gap-2 text-sm text-white">
                    <input type="checkbox" ${role.permissions.some(p => p.includes('analytics')) ? 'checked' : ''} class="rounded border-border-dark text-primary focus:ring-primary">
                    Tahlillar
                  </label>
                  <label class="flex items-center gap-2 text-sm text-white">
                    <input type="checkbox" ${role.permissions.includes('users.manage') ? 'checked' : ''} class="rounded border-border-dark text-primary focus:ring-primary">
                    Foydalanuvchilar
                  </label>
                  <label class="flex items-center gap-2 text-sm text-white">
                    <input type="checkbox" ${role.permissions.includes('settings.full') ? 'checked' : ''} class="rounded border-border-dark text-primary focus:ring-primary">
                    Sozlamalar
                  </label>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="flex gap-3 mt-6">
            <button onclick="closeRolesModal()" class="flex-1 px-4 py-3 rounded-xl bg-surface-dark text-text-secondary hover:text-white transition-colors font-medium">Bekor qilish</button>
            <button onclick="saveRoles()" class="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors">O'zgarishlarni saqlash</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize permissions preview
  updatePermissionsPreview();
  document.getElementById('userRole')?.addEventListener('change', updatePermissionsPreview);
}

function updatePermissionsPreview() {
  const roleId = document.getElementById('userRole')?.value;
  const role = window.adminRoles?.find(r => r.id === roleId);
  const container = document.getElementById('permissionsPreview');
  
  if (container && role) {
    const permissionLabels = {
      'users.manage': 'Foydalanuvchilar',
      'reports.full': 'Hisobotlar (to\'liq)',
      'reports.view': 'Hisobotlar (ko\'rish)',
      'reports.create': 'Hisobotlar (yaratish)',
      'tenders.full': 'Tenderlar (to\'liq)',
      'tenders.view': 'Tenderlar (ko\'rish)',
      'tenders.analyze': 'Tenderlar (tahlil)',
      'cases.full': 'Keyslar (to\'liq)',
      'cases.create': 'Keyslar (yaratish)',
      'cases.manage': 'Keyslar (boshqarish)',
      'analytics.full': 'Tahlillar (to\'liq)',
      'analytics.view': 'Tahlillar (ko\'rish)',
      'settings.full': 'Sozlamalar',
    };
    
    container.innerHTML = role.permissions.map(p => 
      `<span class="px-2 py-1 rounded text-xs bg-${role.color}-500/10 text-${role.color}-500">${permissionLabels[p] || p}</span>`
    ).join('');
  }
}

function openAddUserModal() {
  document.getElementById('userModalTitle').textContent = 'Yangi foydalanuvchi';
  document.getElementById('userModalIcon').textContent = 'person_add';
  document.getElementById('userName').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userDepartment').value = '';
  document.getElementById('userPhone').value = '';
  document.getElementById('userRole').value = 'viewer';
  document.getElementById('userPassword').value = '';
  window.editingUserId = null;
  updatePermissionsPreview();
  
  const modal = document.getElementById('userModal');
  if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}

function editUser(id) {
  const user = window.adminUsers?.find(u => u.id === id);
  if (!user) return;
  
  document.getElementById('userModalTitle').textContent = 'Foydalanuvchini tahrirlash';
  document.getElementById('userModalIcon').textContent = 'edit';
  document.getElementById('userName').value = user.name;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userDepartment').value = user.department;
  document.getElementById('userRole').value = user.role;
  document.getElementById('userPassword').value = '';
  window.editingUserId = id;
  updatePermissionsPreview();
  
  const modal = document.getElementById('userModal');
  if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}

function closeUserModal() {
  const modal = document.getElementById('userModal');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}

function saveUser() {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  
  if (!name.trim() || !email.trim()) {
    showToast("Iltimos, majburiy maydonlarni to'ldiring", 'error');
    return;
  }
  
  showToast(window.editingUserId ? "Foydalanuvchi yangilandi" : "Yangi foydalanuvchi qo'shildi", 'success');
  closeUserModal();
}

function toggleUserStatus(id) {
  const user = window.adminUsers?.find(u => u.id === id);
  if (!user) return;
  
  if (user.status === 'active') {
    showToast(`${user.name} bloklandi`, 'info');
  } else {
    showToast(`${user.name} faollashtirildi`, 'success');
  }
}

function deleteUser(id) {
  const user = window.adminUsers?.find(u => u.id === id);
  if (confirm(`${user?.name} ni o'chirishni tasdiqlaysizmi?`)) {
    showToast("Foydalanuvchi o'chirildi", 'success');
  }
}

function openRolesModal() {
  const modal = document.getElementById('rolesModal');
  if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}

function closeRolesModal() {
  const modal = document.getElementById('rolesModal');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}

function saveRoles() {
  showToast("Rol va ruxsatlar saqlandi", 'success');
  closeRolesModal();
}

function viewAllActivity() {
  showToast("Faoliyat tarixi sahifasi ishlab chiqilmoqda", 'info');
}

// Make functions globally available
window.renderAdminPanel = renderAdminPanel;
window.openAddUserModal = openAddUserModal;
window.editUser = editUser;
window.closeUserModal = closeUserModal;
window.saveUser = saveUser;
window.toggleUserStatus = toggleUserStatus;
window.deleteUser = deleteUser;
window.updatePermissionsPreview = updatePermissionsPreview;
window.openRolesModal = openRolesModal;
window.closeRolesModal = closeRolesModal;
window.saveRoles = saveRoles;
window.viewAllActivity = viewAllActivity;
