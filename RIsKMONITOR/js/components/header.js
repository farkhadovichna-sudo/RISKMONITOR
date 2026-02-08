// ============================================
// SHARED - Header Components (Profile & Notifications)
// ============================================

// Sample notifications data
const sampleNotifications = [
  { id: 1, type: 'warning', title: 'Yuqori xatarli tender aniqlandi', message: 'TNR-2024-0891 - 89% risk balli', time: '2 daqiqa oldin', read: false },
  { id: 2, type: 'info', title: 'Yangi keys yaratildi', message: 'KS-2024-0157 - Qurilish sohasi', time: '15 daqiqa oldin', read: false },
  { id: 3, type: 'success', title: 'Hisobot tayyor', message: 'Oylik tahlil hisoboti yuklab olishga tayyor', time: '1 soat oldin', read: false },
  { id: 4, type: 'ai', title: 'AI tavsiya', message: '5 ta tender qo\'shimcha tekshiruvni talab qiladi', time: '2 soat oldin', read: true },
  { id: 5, type: 'system', title: 'Tizim yangilandi', message: 'v2.4.1 versiyasi o\'rnatildi', time: '1 kun oldin', read: true },
];

// Get current user info
function getCurrentUser() {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  } catch (e) {
    console.error('Error getting user data:', e);
  }
  return { name: 'Foydalanuvchi', role: 'user' };
}

// Get user initials
function getUserInitials() {
  const user = getCurrentUser();
  if (user.name) {
    const parts = user.name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return user.name[0];
  }
  return 'F';
}

// Get role color classes
function getRoleColorClasses() {
  const user = getCurrentUser();
  switch (user.role) {
    case 'admin': 
      return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-500' };
    case 'inspector': 
      return { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-500' };
    case 'analyst': 
      return { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-500' };
    default: 
      return { bg: 'bg-primary/20', border: 'border-primary/50', text: 'text-primary' };
  }
}

// Get unread notifications count
function getUnreadCount() {
  return sampleNotifications.filter(n => !n.read).length;
}

// Render header user section HTML
function renderHeaderUserSection() {
  const user = getCurrentUser();
  const initials = getUserInitials();
  const roleColors = getRoleColorClasses();
  const unreadCount = getUnreadCount();
  
  return `
    <div class="flex flex-1 justify-end gap-3 items-center">
      <!-- Notifications Button -->
      <div class="relative">
        <button onclick="toggleNotifications()" class="flex items-center justify-center rounded-lg size-10 bg-surface-dark text-white hover:bg-[#2d3f61] transition-colors relative" id="notificationBtn">
          <span class="material-symbols-outlined text-[20px]">notifications</span>
          ${unreadCount > 0 ? `<span class="absolute -top-1 -right-1 size-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-background-dark">${unreadCount}</span>` : ''}
        </button>
        
        <!-- Notifications Dropdown -->
        <div id="notificationsDropdown" class="absolute right-0 top-12 w-80 bg-background-dark border border-border-dark rounded-xl shadow-2xl z-50 hidden">
          <div class="p-4 border-b border-border-dark flex justify-between items-center">
            <h4 class="text-white font-bold">Bildirishnomalar</h4>
            <button onclick="markAllAsRead()" class="text-primary text-xs font-medium hover:underline">Barchasini o'qilgan qilish</button>
          </div>
          <div class="max-h-80 overflow-y-auto divide-y divide-border-dark/50" id="notificationsList">
            ${renderNotificationsList()}
          </div>
          <div class="p-3 border-t border-border-dark">
            <a href="#/app/notifications" class="text-primary text-sm font-medium hover:underline flex items-center justify-center gap-1">
              Barchasini ko'rish
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- User Profile Button -->
      <div class="relative">
        <button onclick="toggleProfileMenu()" class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-dark transition-colors" id="profileBtn">
          <div class="${roleColors.bg} rounded-full size-9 flex items-center justify-center border-2 ${roleColors.border} ${roleColors.text} font-bold text-sm">
            ${initials}
          </div>
          <div class="text-left hidden sm:block">
            <p class="text-white text-sm font-medium leading-tight">${user.name || 'Foydalanuvchi'}</p>
            <p class="text-text-secondary text-xs">${getRoleName(user.role)}</p>
          </div>
          <span class="material-symbols-outlined text-text-secondary text-lg hidden sm:block">expand_more</span>
        </button>
        
        <!-- Profile Dropdown -->
        <div id="profileDropdown" class="absolute right-0 top-12 w-56 bg-background-dark border border-border-dark rounded-xl shadow-2xl z-50 hidden">
          <div class="p-4 border-b border-border-dark">
            <div class="flex items-center gap-3">
              <div class="${roleColors.bg} rounded-full size-11 flex items-center justify-center border-2 ${roleColors.border} ${roleColors.text} font-bold">
                ${initials}
              </div>
              <div>
                <p class="text-white font-semibold text-sm">${user.name || 'Foydalanuvchi'}</p>
                <p class="text-text-secondary text-xs">${user.login || user.email || ''}</p>
              </div>
            </div>
          </div>
          <div class="py-2">
            <a href="#/app/profile" class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-dark transition-colors text-text-secondary hover:text-white">
              <span class="material-symbols-outlined text-lg">person</span>
              <span class="text-sm">Profilim</span>
            </a>
            <a href="#/app/settings" class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-dark transition-colors text-text-secondary hover:text-white">
              <span class="material-symbols-outlined text-lg">settings</span>
              <span class="text-sm">Sozlamalar</span>
            </a>
            ${isAdmin() ? `
            <a href="#/app/admin" class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-dark transition-colors text-text-secondary hover:text-white">
              <span class="material-symbols-outlined text-lg">admin_panel_settings</span>
              <span class="text-sm">Admin Panel</span>
            </a>
            ` : ''}
          </div>
          <div class="py-2 border-t border-border-dark">
            <button onclick="handleLogout()" class="flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 transition-colors text-red-500 w-full text-left">
              <span class="material-symbols-outlined text-lg">logout</span>
              <span class="text-sm font-medium">Chiqish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render notifications list
function renderNotificationsList() {
  // Static Tailwind classes for CDN compatibility
  const iconMap = {
    warning: { icon: 'warning', bgClass: 'bg-red-500/10', textClass: 'text-red-500' },
    info: { icon: 'info', bgClass: 'bg-blue-500/10', textClass: 'text-blue-500' },
    success: { icon: 'check_circle', bgClass: 'bg-green-500/10', textClass: 'text-green-500' },
    ai: { icon: 'smart_toy', bgClass: 'bg-purple-500/10', textClass: 'text-purple-500' },
    system: { icon: 'settings', bgClass: 'bg-gray-500/10', textClass: 'text-gray-500' }
  };
  
  return sampleNotifications.map(n => {
    const { icon, bgClass, textClass } = iconMap[n.type] || iconMap.info;
    return `
      <div class="p-3 hover:bg-surface-dark/30 transition-colors cursor-pointer ${n.read ? 'opacity-60' : ''}" onclick="viewNotification(${n.id})">
        <div class="flex gap-3">
          <div class="size-8 rounded-lg ${bgClass} flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined ${textClass} text-sm">${icon}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium truncate">${n.title}</p>
            <p class="text-text-secondary text-xs truncate">${n.message}</p>
            <p class="text-text-secondary text-xs mt-1">${n.time}</p>
          </div>
          ${!n.read ? '<span class="size-2 rounded-full bg-primary shrink-0 mt-2"></span>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Get role name in Uzbek
function getRoleName(role) {
  const roles = {
    admin: 'Administrator',
    inspector: 'Inspektor',
    analyst: 'Tahlilchi',
    viewer: 'Ko\'ruvchi'
  };
  return roles[role] || 'Foydalanuvchi';
}

// Toggle notifications dropdown
function toggleNotifications() {
  const dropdown = document.getElementById('notificationsDropdown');
  const profileDropdown = document.getElementById('profileDropdown');
  
  if (profileDropdown) profileDropdown.classList.add('hidden');
  if (dropdown) dropdown.classList.toggle('hidden');
}

// Toggle profile menu
function toggleProfileMenu() {
  const dropdown = document.getElementById('profileDropdown');
  const notificationsDropdown = document.getElementById('notificationsDropdown');
  
  if (notificationsDropdown) notificationsDropdown.classList.add('hidden');
  if (dropdown) dropdown.classList.toggle('hidden');
}

// Mark all notifications as read
function markAllAsRead() {
  sampleNotifications.forEach(n => n.read = true);
  updateNotificationsBadge();
  const list = document.getElementById('notificationsList');
  if (list) list.innerHTML = renderNotificationsList();
  showToast('Barcha bildirishnomalar o\'qilgan deb belgilandi', 'success');
}

// View notification
function viewNotification(id) {
  const notification = sampleNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    updateNotificationsBadge();
    showToast(notification.title, 'info');
  }
  toggleNotifications();
}

// Update notifications badge
function updateNotificationsBadge() {
  const count = getUnreadCount();
  const btn = document.getElementById('notificationBtn');
  if (btn) {
    const badge = btn.querySelector('.bg-red-500');
    if (badge) {
      if (count > 0) {
        badge.textContent = count;
      } else {
        badge.remove();
      }
    }
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('userData');
  localStorage.removeItem('isAdmin');
  showToast('Tizimdan chiqdingiz', 'info');
  setTimeout(() => {
    window.location.hash = '/login';
  }, 500);
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  const notifBtn = document.getElementById('notificationBtn');
  const notifDropdown = document.getElementById('notificationsDropdown');
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  
  if (notifDropdown && !notifDropdown.contains(e.target) && notifBtn && !notifBtn.contains(e.target)) {
    notifDropdown.classList.add('hidden');
  }
  
  if (profileDropdown && !profileDropdown.contains(e.target) && profileBtn && !profileBtn.contains(e.target)) {
    profileDropdown.classList.add('hidden');
  }
});

// Export functions globally
window.getCurrentUser = getCurrentUser;
window.getUserInitials = getUserInitials;
window.getRoleColorClasses = getRoleColorClasses;
window.getUnreadCount = getUnreadCount;
window.renderHeaderUserSection = renderHeaderUserSection;
window.renderNotificationsList = renderNotificationsList;
window.getRoleName = getRoleName;
window.toggleNotifications = toggleNotifications;
window.toggleProfileMenu = toggleProfileMenu;
window.markAllAsRead = markAllAsRead;
window.viewNotification = viewNotification;
window.updateNotificationsBadge = updateNotificationsBadge;
window.handleLogout = handleLogout;
