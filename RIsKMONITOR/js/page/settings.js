// ============================================
// PAGES - Settings
// ============================================

function renderSettings() {
  const user = getCurrentUser();
  
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

      <main class="px-10 py-8 max-w-4xl mx-auto w-full">
        <!-- Page Header -->
        <div class="flex items-center gap-4 mb-8">
          <a href="#/app/dashboard" class="p-2 rounded-lg hover:bg-surface-dark transition-colors">
            <span class="material-symbols-outlined text-text-secondary">arrow_back</span>
          </a>
          <div>
            <h1 class="text-white text-3xl font-black tracking-tight">Sozlamalar</h1>
            <p class="text-text-secondary">Tizim sozlamalari va shaxsiy parametrlar</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Notifications Settings -->
          <div class="glass-panel rounded-xl overflow-hidden">
            <div class="p-5 border-b border-border-dark flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">notifications</span>
              <h2 class="text-white font-bold">Bildirishnomalar</h2>
            </div>
            <div class="p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white text-sm font-medium">Yuqori xatarli tenderlar</p>
                  <p class="text-text-secondary text-xs">Yangi yuqori xatarli tender aniqlanganda xabar olish</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-11 h-6 bg-surface-dark peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white text-sm font-medium">Keys yangilanishlari</p>
                  <p class="text-text-secondary text-xs">Keys holati o'zgarganda xabar olish</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-11 h-6 bg-surface-dark peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white text-sm font-medium">Tizim yangilanishlari</p>
                  <p class="text-text-secondary text-xs">Tizim yangiliklari haqida xabar olish</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-surface-dark peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="glass-panel rounded-xl overflow-hidden">
            <div class="p-5 border-b border-border-dark flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">security</span>
              <h2 class="text-white font-bold">Xavfsizlik</h2>
            </div>
            <div class="p-5 space-y-4">
              <button onclick="showToast('Parol o\\'zgartirish ishlab chiqilmoqda', 'info')" class="w-full flex items-center justify-between p-4 bg-surface-dark/50 rounded-lg hover:bg-surface-dark transition-colors">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-text-secondary">lock</span>
                  <div class="text-left">
                    <p class="text-white text-sm font-medium">Parolni o'zgartirish</p>
                    <p class="text-text-secondary text-xs">Oxirgi o'zgartirilgan: 30 kun oldin</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-text-secondary">chevron_right</span>
              </button>
              <button onclick="showToast('Ikki bosqichli autentifikatsiya ishlab chiqilmoqda', 'info')" class="w-full flex items-center justify-between p-4 bg-surface-dark/50 rounded-lg hover:bg-surface-dark transition-colors">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-text-secondary">verified_user</span>
                  <div class="text-left">
                    <p class="text-white text-sm font-medium">Ikki bosqichli autentifikatsiya</p>
                    <p class="text-text-secondary text-xs">Holat: O'chirilgan</p>
                  </div>
                </div>
                <span class="material-symbols-outlined text-text-secondary">chevron_right</span>
              </button>
            </div>
          </div>

          <!-- Display Settings -->
          <div class="glass-panel rounded-xl overflow-hidden">
            <div class="p-5 border-b border-border-dark flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">palette</span>
              <h2 class="text-white font-bold">Ko'rinish</h2>
            </div>
            <div class="p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white text-sm font-medium">Til</p>
                  <p class="text-text-secondary text-xs">Interfeys tili</p>
                </div>
                <select class="bg-surface-dark border border-border-dark rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary">
                  <option value="uz" selected>O'zbek (Lotin)</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white text-sm font-medium">Mavzu</p>
                  <p class="text-text-secondary text-xs">Interfeys rangi</p>
                </div>
                <select class="bg-surface-dark border border-border-dark rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary">
                  <option value="dark" selected>Qora mavzu</option>
                  <option value="light">Oq mavzu</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end gap-3">
            <button onclick="window.location.hash = '/app/dashboard'" class="px-6 py-3 bg-surface-dark text-text-secondary rounded-lg hover:text-white transition-colors font-medium">
              Bekor qilish
            </button>
            <button onclick="showToast('Sozlamalar saqlandi', 'success')" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2">
              <span class="material-symbols-outlined">save</span>
              Saqlash
            </button>
          </div>
        </div>
      </main>
    </div>
  `;
}

// Make function globally available
window.renderSettings = renderSettings;
