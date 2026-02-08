// ============================================
// PAGES - User Profile
// ============================================

function renderProfile() {
  const user = getCurrentUser();
  const initials = getUserInitials();
  const roleColors = getRoleColorClasses();
  
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
            ${isAdmin() ? '<a href="#/app/admin" class="hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-dark flex items-center gap-1"><span class="material-symbols-outlined text-sm">shield_person</span>Admin</a>' : ''}
          </nav>
        </div>
        ${renderHeaderUserSection()}
      </header>

      <main class="px-10 py-8 max-w-5xl mx-auto w-full">
        <!-- Page Header -->
        <div class="flex items-center gap-4 mb-8">
          <a href="#/app/dashboard" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">arrow_back</span>
          </a>
          <div>
            <h1 class="text-white text-3xl font-black tracking-tight">Profilim</h1>
            <p class="text-text-secondary">Shaxsiy ma'lumotlar va statistika</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Profile Card -->
          <div class="glass-panel rounded-xl p-6">
            <div class="flex flex-col items-center text-center">
              <div class="${roleColors.bg} rounded-full size-24 flex items-center justify-center border-4 ${roleColors.border} ${roleColors.text} font-bold text-3xl mb-4">
                ${initials}
              </div>
              <h2 class="text-white text-xl font-bold">${user.name || 'Foydalanuvchi'}</h2>
              <p class="text-text-secondary text-sm">${getRoleName(user.role)}</p>
              <p class="text-primary text-xs mt-1">${user.email || user.login || ''}</p>
              
              <div class="w-full mt-6 space-y-3">
                <div class="flex justify-between items-center p-3 bg-surface-dark/50 rounded-lg">
                  <span class="text-text-secondary text-sm">Bo'lim</span>
                  <span class="text-white text-sm font-medium">${user.department || 'IT Bo\'limi'}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-surface-dark/50 rounded-lg">
                  <span class="text-text-secondary text-sm">Oxirgi kirish</span>
                  <span class="text-white text-sm font-medium">Bugun, ${new Date().toLocaleTimeString('uz-UZ', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
              </div>
              
              <button onclick="showToast('Profil tahrirlash sahifasi ishlab chiqilmoqda', 'info')" class="mt-6 w-full py-3 px-4 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-lg">edit</span>
                Profilni tahrirlash
              </button>
            </div>
          </div>

          <!-- Stats & Activity -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Stats -->
            <div class="glass-panel rounded-xl p-6">
              <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">analytics</span>
                Mening statistikam
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-surface-dark/50 rounded-lg p-4 text-center">
                  <p class="text-3xl font-bold text-white">47</p>
                  <p class="text-text-secondary text-xs mt-1">Tekshirilgan tenderlar</p>
                </div>
                <div class="bg-surface-dark/50 rounded-lg p-4 text-center">
                  <p class="text-3xl font-bold text-green-400">23</p>
                  <p class="text-text-secondary text-xs mt-1">Yaratilgan keyslar</p>
                </div>
                <div class="bg-surface-dark/50 rounded-lg p-4 text-center">
                  <p class="text-3xl font-bold text-blue-400">12</p>
                  <p class="text-text-secondary text-xs mt-1">Hisobotlar</p>
                </div>
                <div class="bg-surface-dark/50 rounded-lg p-4 text-center">
                  <p class="text-3xl font-bold text-purple-400">94%</p>
                  <p class="text-text-secondary text-xs mt-1">Aniqlik darajasi</p>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="glass-panel rounded-xl overflow-hidden">
              <div class="p-4 border-b border-border-dark">
                <h3 class="text-white font-bold flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">history</span>
                  So'nggi faoliyat
                </h3>
              </div>
              <div class="divide-y divide-border-dark/30">
                <div class="p-4 flex items-center gap-4">
                  <div class="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-green-500">check_circle</span>
                  </div>
                  <div class="flex-1">
                    <p class="text-white text-sm">Keys yaratildi: <span class="text-primary">KS-2024-0157</span></p>
                    <p class="text-text-secondary text-xs">30 daqiqa oldin</p>
                  </div>
                </div>
                <div class="p-4 flex items-center gap-4">
                  <div class="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-blue-500">search</span>
                  </div>
                  <div class="flex-1">
                    <p class="text-white text-sm">Tender tekshirildi: <span class="text-primary">TND-2024-0891</span></p>
                    <p class="text-text-secondary text-xs">1 soat oldin</p>
                  </div>
                </div>
                <div class="p-4 flex items-center gap-4">
                  <div class="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-purple-500">description</span>
                  </div>
                  <div class="flex-1">
                    <p class="text-white text-sm">Hisobot yaratildi: <span class="text-primary">Haftalik tahlil</span></p>
                    <p class="text-text-secondary text-xs">3 soat oldin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

// Make function globally available
window.renderProfile = renderProfile;
