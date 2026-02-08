// ============================================
// PAGES - Landing (New Stitch Design)
// ============================================

function renderLanding() {
  document.body.innerHTML = `
    <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white font-display">
      <!-- Header Section -->
      <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <div class="flex items-center gap-10">
            <a href="#/" class="flex items-center gap-3">
              <div class="size-8 text-primary">
                <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                </svg>
              </div>
              <h2 class="text-xl font-black tracking-tight">RiskMonitor</h2>
            </a>
            <nav class="hidden md:flex items-center gap-8">
              <a class="text-sm font-medium hover:text-primary transition-colors" href="#about">Loyiha haqida</a>
              <a class="text-sm font-medium hover:text-primary transition-colors" href="#features">Imkoniyatlar</a>
              <a class="text-sm font-medium hover:text-primary transition-colors" href="#roadmap">Roadmap</a>
              <a class="text-sm font-medium hover:text-primary transition-colors" href="#contact">Bog'lanish</a>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <button class="hidden lg:flex items-center justify-center p-2 text-white/70 hover:text-white">
              <span class="material-symbols-outlined">search</span>
            </button>
            <div class="flex gap-3">
              <a href="#/login" class="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90">
                Tizimga kirish
              </a>
              <button class="hidden md:flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-white/10 text-white text-sm font-bold border border-white/10 hover:bg-white/20">
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <main class="flex-1">
        <div class="relative w-full max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <div class="absolute inset-0 -z-10 pointer-events-none" style="background: radial-gradient(circle at 50% 50%, rgba(37, 106, 244, 0.15) 0%, transparent 70%);"></div>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="flex flex-col gap-8">
              <div class="space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Davlat nazorati tizimi
                </div>
                <h1 class="text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                  RiskMonitor — Davlat xaridlarida AI tahlili
                </h1>
                <p class="text-slate-400 text-lg lg:text-xl max-w-xl leading-relaxed">
                  Korrupsiya xavfini kamaytirish va shaffoflikni ta'minlash uchun sun'iy intellektga asoslangan aqlli monitoring tizimi.
                </p>
              </div>
              <div class="flex flex-wrap gap-4">
                <a href="#/login" class="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                  Tizimga kirish
                </a>
                <a href="#about" class="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white/5 text-white text-base font-bold border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                  Loyiha haqida
                </a>
              </div>
            </div>
            <div class="relative hidden lg:block">
              <div class="aspect-square rounded-3xl overflow-hidden glass-card p-4">
                <div class="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <span class="text-8xl">🛡️</span>
                </div>
                <!-- Floating Indicator -->
                <div class="absolute top-10 right-10 glass-card p-4 rounded-2xl flex items-center gap-4 animate-pulse">
                  <div class="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <span class="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <p class="text-xs text-white/60">Hozirgi xavf darajasi</p>
                    <p class="font-bold text-white">Past (Xavfsiz)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Metrics Section -->
          <div class="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass-card p-8 rounded-2xl space-y-3 hover:border-primary/50 transition-colors">
              <p class="text-white/60 text-sm font-medium">Tahlil qilingan xaridlar</p>
              <p class="text-3xl font-black text-white">1.2M+</p>
              <div class="flex items-center gap-1 text-emerald-400 text-sm">
                <span class="material-symbols-outlined text-sm">trending_up</span>
                <span>+15% bu oyda</span>
              </div>
            </div>
            <div class="glass-card p-8 rounded-2xl space-y-3 hover:border-primary/50 transition-colors">
              <p class="text-white/60 text-sm font-medium">Aniqlangan xavflar</p>
              <p class="text-3xl font-black text-white">45K+</p>
              <div class="flex items-center gap-1 text-emerald-400 text-sm">
                <span class="material-symbols-outlined text-sm">trending_up</span>
                <span>+5% aniqlik</span>
              </div>
            </div>
            <div class="glass-card p-8 rounded-2xl space-y-3 hover:border-primary/50 transition-colors">
              <p class="text-white/60 text-sm font-medium">Tejalgan mablag'lar</p>
              <p class="text-3xl font-black text-white">500 mlrd</p>
              <div class="flex items-center gap-1 text-orange-400 text-sm">
                <span class="material-symbols-outlined text-sm">savings</span>
                <span>so'm tejab qolindi</span>
              </div>
            </div>
            <div class="glass-card p-8 rounded-2xl space-y-3 hover:border-primary/50 transition-colors">
              <p class="text-white/60 text-sm font-medium">AI aniqlik darajasi</p>
              <p class="text-3xl font-black text-white">99.2%</p>
              <div class="flex items-center gap-1 text-emerald-400 text-sm">
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span>Eng yuqori ko'rsatkich</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <section id="features" class="bg-[#1a2130] py-24">
          <div class="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div class="flex flex-col gap-4 mb-16">
              <h2 class="text-white text-4xl font-black tracking-tight">Tizimning asosiy imkoniyatlari</h2>
              <p class="text-slate-400 text-lg max-w-2xl">Sun'iy intellekt yordamida davlat xaridlarini real vaqt rejimida nazorat qiling va shubhali holatlarni oldindan aniqlang.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="group flex flex-col gap-6 p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                <div class="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span class="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold text-white">Aql-idrok bilan tahlil</h3>
                  <p class="text-slate-400 leading-relaxed">Murakkab AI algoritmlari orqali shubhali tranzaksiyalarni va qonunbuzarliklarni avtomatik aniqlash.</p>
                </div>
              </div>
              <div class="group flex flex-col gap-6 p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                <div class="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span class="material-symbols-outlined text-3xl">query_stats</span>
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold text-white">Real-vaqt monitoringi</h3>
                  <p class="text-slate-400 leading-relaxed">Barcha davlat xaridlarini 24/7 rejimida real vaqtda kuzatish va tezkor bildirishnomalar yuborish.</p>
                </div>
              </div>
              <div class="group flex flex-col gap-6 p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                <div class="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span class="material-symbols-outlined text-3xl">description</span>
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold text-white">Avtomatik hisobotlar</h3>
                  <p class="text-slate-400 leading-relaxed">Inson omilisiz tayyorlanadigan batafsil tahliliy hisobotlar va davlat standartlari asosidagi hujjatlar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-24 relative overflow-hidden">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[120px] -z-10"></div>
          <div class="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div class="glass-card rounded-[2.5rem] p-12 lg:p-20 text-center flex flex-col items-center gap-8">
              <div class="space-y-4 max-w-3xl">
                <h2 class="text-4xl lg:text-6xl font-black text-white tracking-tight">Shaffof kelajakni birgalikda quramiz</h2>
                <p class="text-xl text-slate-300">RiskMonitor tizimidan foydalanish va davlat xaridlaridagi xavflarni nazorat qilish uchun davlat idorasi sifatida ro'yxatdan o'ting.</p>
              </div>
              <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a href="#/login" class="flex min-w-[240px] cursor-pointer items-center justify-center rounded-xl h-16 px-10 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Hoziroq boshlash
                </a>
                <button class="flex min-w-[240px] cursor-pointer items-center justify-center rounded-xl h-16 px-10 bg-white/5 text-white text-lg font-bold border border-white/10 hover:bg-white/10 transition-all">
                  Demo ko'rish
                </button>
              </div>
              <div class="pt-8 border-t border-white/10 w-full mt-4">
                <p class="text-slate-500 text-sm">Xavfsizlik va maxfiylik davlat standartlari darajasida kafolatlanadi.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="border-t border-white/10 bg-background-dark py-12">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="size-6 text-primary">
              <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
              </svg>
            </div>
            <span class="font-bold text-white">RiskMonitor © 2024</span>
          </div>
          <div class="flex gap-8">
            <a class="text-slate-500 hover:text-white text-sm" href="#">Maxfiylik siyosati</a>
            <a class="text-slate-500 hover:text-white text-sm" href="#">Foydalanish shartlari</a>
            <a class="text-slate-500 hover:text-white text-sm" href="#">Yordam</a>
          </div>
          <div class="flex gap-4">
            <div class="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
              <span class="material-symbols-outlined text-xl">language</span>
            </div>
            <div class="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
              <span class="material-symbols-outlined text-xl">mail</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

window.renderLanding = renderLanding;
