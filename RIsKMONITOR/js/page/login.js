// ============================================
// PAGES - Login (New Stitch Design)
// ============================================

function renderLogin() {
  document.body.innerHTML = `
    <div class="bg-background-dark text-white font-display antialiased overflow-hidden">
      <div class="relative min-h-screen w-full flex flex-col justify-center items-center p-4">
        <!-- Background Decor -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-gradient-to-b from-[#1e293b]/20 to-background-dark z-10"></div>
          <div class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at 30% 20%, rgba(37, 106, 244, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);"></div>
        </div>

        <!-- Main Card -->
        <div class="relative z-20 w-full max-w-[440px] rounded-2xl flex flex-col overflow-hidden" style="background: rgba(27, 31, 39, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          <!-- Header Section -->
          <div class="pt-10 pb-2 px-8 flex flex-col items-center">
            <div class="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 border border-primary/30 shadow-[0_0_15px_rgba(37,106,244,0.3)]">
              <span class="material-symbols-outlined text-primary text-3xl">shield_lock</span>
            </div>
            <h1 class="text-2xl font-bold tracking-tight text-white mb-1">RiskMonitor</h1>
            <p class="text-[#9ca6ba] text-sm font-medium">Davlat xaridlari monitoring tizimi</p>
          </div>

          <!-- Title -->
          <div class="px-8 pt-6 pb-2">
            <h2 class="text-white tracking-tight text-[22px] font-semibold text-center">Tizimga kirish</h2>
          </div>

          <!-- Form Content -->
          <div class="px-8 pb-10 pt-2 flex flex-col gap-5">
            <!-- Login Input -->
            <label class="flex flex-col w-full">
              <p class="text-[#9ca6ba] text-sm font-medium pb-2 pl-1">Login</p>
              <input 
                id="loginInput"
                class="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4354] bg-[#101622]/80 focus:border-primary h-12 placeholder:text-[#586174] px-4 text-sm font-normal transition-all" 
                placeholder="Loginni kiriting" 
                type="text" 
                value="admin"
              />
            </label>

            <!-- Password Input -->
            <label class="flex flex-col w-full">
              <p class="text-[#9ca6ba] text-sm font-medium pb-2 pl-1">Parol</p>
              <div class="flex w-full relative">
                <input 
                  id="passwordInput"
                  class="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4354] bg-[#101622]/80 focus:border-primary h-12 placeholder:text-[#586174] pl-4 pr-12 text-sm font-normal transition-all" 
                  placeholder="Parolni kiriting" 
                  type="password" 
                  value="admin123"
                />
                <button class="absolute right-0 top-0 h-full px-3 text-[#9ca6ba] hover:text-white transition-colors flex items-center justify-center" onclick="togglePassword()">
                  <span class="material-symbols-outlined text-[20px]" id="passwordToggleIcon">visibility_off</span>
                </button>
              </div>
            </label>

            <!-- Error Message (hidden by default) -->
            <div class="hidden items-center justify-center gap-2 py-1" id="errorMessage">
              <span class="material-symbols-outlined text-red-400 text-[16px]">error</span>
              <p class="text-red-400/90 text-sm font-medium">Login yoki parol noto'g'ri</p>
            </div>

            <!-- Submit Button -->
            <button 
              onclick="handleLogin()"
              class="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg font-semibold text-sm transition-all shadow-[0_4px_14px_0_rgba(37,106,244,0.39)] hover:shadow-[0_6px_20px_rgba(37,106,244,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <span>Kirish</span>
              <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <!-- Footer Links -->
            <div class="mt-4 flex flex-col items-center gap-3">
              <a class="text-[#586174] hover:text-primary text-xs font-medium transition-colors" href="#">Parolni unutdingizmi?</a>
            </div>
          </div>

          <!-- Bottom Border Accent -->
          <div class="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent absolute bottom-0"></div>
        </div>

        <div class="absolute bottom-6 text-[#586174] text-xs z-20">
          © 2024 RiskMonitor AI Platform. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </div>
  `;
}

function togglePassword() {
  const input = document.getElementById('passwordInput');
  const icon = document.getElementById('passwordToggleIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = 'visibility';
  } else {
    input.type = 'password';
    icon.textContent = 'visibility_off';
  }
}

function handleLogin() {
  const login = document.getElementById('loginInput').value;
  const password = document.getElementById('passwordInput').value;
  
  // Demo users
  const users = {
    'admin': { password: 'admin123', name: 'Anvar Abdullayev', role: 'admin' },
    'inspektor': { password: '123456', name: 'Nilufar Karimova', role: 'inspector' },
    'tahlilchi': { password: '123456', name: 'Bobur Rahimov', role: 'analyst' },
    'user': { password: '123456', name: 'Jamshid Toshmatov', role: 'viewer' }
  };
  
  const user = users[login];
  
  if (user && user.password === password) {
    // Set user in localStorage for auth check
    localStorage.setItem('user', JSON.stringify({ name: user.name, role: user.role }));
    localStorage.setItem('userData', JSON.stringify({ name: user.name, role: user.role, login: login }));
    
    // Set admin flag for easy checking
    if (user.role === 'admin') {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.removeItem('isAdmin');
    }
    
    window.location.hash = '/app/dashboard';
  } else {
    document.getElementById('errorMessage').classList.remove('hidden');
    document.getElementById('errorMessage').classList.add('flex');
  }
}

window.renderLogin = renderLogin;
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
