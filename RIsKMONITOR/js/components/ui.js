// ============================================
// UI COMPONENTS
// ============================================

const Components = {
  // Sidebar component
  sidebar(activeNav = 'dashboard') {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const roleLabels = {
      inspector: 'Inspektor',
      bolim_boss: 'Bo\'lim boshlig\'i',
      rahbariyat: 'Rahbariyat',
      admin: 'Administrator',
      auditor: 'Auditor'
    };
    
    return `
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">🛡️</div>
          <span class="sidebar-logo-text">RiskMonitor</span>
        </div>
        
        <nav class="sidebar-nav">
          <a href="#/app/dashboard" class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            Dashboard
          </a>
          <a href="#/app/tenders" class="nav-item ${activeNav === 'tenders' ? 'active' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            Tenderlar
          </a>
          <a href="#/app/cases" class="nav-item ${activeNav === 'cases' ? 'active' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
            Cases
          </a>
          
          <div class="nav-section-title">Hisobotlar</div>
          <a href="#/app/reports" class="nav-item ${activeNav === 'reports' ? 'active' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Tahlillar
          </a>
          
          <div class="nav-section-title">Sozlamalar</div>
          <a href="#/app/admin" class="nav-item ${activeNav === 'admin' ? 'active' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            Admin Panel
          </a>
        </nav>
        
        <div class="sidebar-footer">
          <div class="sidebar-user">
            <div class="user-avatar">${user.name ? user.name[0].toUpperCase() : 'U'}</div>
            <div class="user-info">
              <div class="user-name">${user.name || 'Foydalanuvchi'}</div>
              <div class="user-role">${roleLabels[user.role] || 'Demo'}</div>
            </div>
          </div>
          <a href="#/login" class="nav-item mt-4" style="margin-top: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Chiqish
          </a>
        </div>
      </aside>
    `;
  },
  
  // AI Principle Banner
  aiBanner() {
    return `
      <div class="ai-banner">
        <svg class="ai-banner-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span class="ai-banner-text">
          <strong>AI qaror qabul qilmaydi</strong> — faqat signal va izoh beradi. Yakuniy qaror inspektor mas'uliyati.
        </span>
      </div>
    `;
  },
  
  // KPI Card
  kpiCard(icon, iconClass, value, label, trend = null, trendUp = false) {
    return `
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon ${iconClass}">
            ${icon}
          </div>
          ${trend ? `<span class="kpi-card-trend ${trendUp ? 'up' : 'down'}">${trendUp ? '↑' : '↓'} ${trend}</span>` : ''}
        </div>
        <div class="kpi-card-value">${value}</div>
        <div class="kpi-card-label">${label}</div>
      </div>
    `;
  },
  
  // Risk Badge
  riskBadge(band) {
    const labels = {
      high: 'Yuqori',
      medium: 'O\'rta',
      low: 'Past'
    };
    return `<span class="badge badge-${band}">${labels[band] || band}</span>`;
  },
  
  // Status Badge
  statusBadge(status) {
    const labels = {
      new: 'Yangi',
      in_review: 'Tekshiruvda',
      decision: 'Qaror',
      closed: 'Yopilgan'
    };
    const classes = {
      new: 'badge-new',
      in_review: 'badge-review',
      decision: 'badge-decision',
      closed: 'badge-closed'
    };
    return `<span class="badge badge-status ${classes[status] || ''}">${labels[status] || status}</span>`;
  },
  
  // Page Header
  pageHeader(title, subtitle = null, breadcrumbs = null) {
    return `
      <div class="page-header">
        ${breadcrumbs ? `
          <div class="breadcrumb">
            ${breadcrumbs.map((b, i) => 
              i < breadcrumbs.length - 1 
                ? `<a href="${b.href}">${b.label}</a><span class="breadcrumb-separator">/</span>` 
                : `<span>${b.label}</span>`
            ).join('')}
          </div>
        ` : ''}
        <div class="page-header-top">
          <h1 class="page-title">${title}</h1>
        </div>
        ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
      </div>
    `;
  },
  
  // Modal
  modal(id, title, content, footer = '') {
    return `
      <div class="modal-overlay" id="${id}">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="closeModal('${id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    `;
  },
  
  // Tabs
  tabs(tabsData, activeTab = 0) {
    return `
      <div class="tabs">
        ${tabsData.map((tab, i) => `
          <button class="tab ${i === activeTab ? 'active' : ''}" data-tab="${i}" onclick="switchTab(${i})">
            ${tab.label}
          </button>
        `).join('')}
      </div>
      ${tabsData.map((tab, i) => `
        <div class="tab-content ${i === activeTab ? 'active' : ''}" data-tab-content="${i}">
          ${tab.content}
        </div>
      `).join('')}
    `;
  },
  
  // Filters bar
  filtersBar(filters) {
    return `
      <div class="filters-bar">
        ${filters.map(f => `
          <div class="filter-group">
            <label class="filter-label">${f.label}</label>
            ${f.type === 'select' ? `
              <select class="filter-input form-select" id="${f.id}" onchange="applyFilters()">
                <option value="">Barchasi</option>
                ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
              </select>
            ` : `
              <input type="${f.type}" class="filter-input form-input" id="${f.id}" placeholder="${f.placeholder || ''}" onchange="applyFilters()">
            `}
          </div>
        `).join('')}
        <div class="filter-group" style="align-self: flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="resetFilters()">
            Tozalash
          </button>
        </div>
      </div>
    `;
  }
};

// Helper functions
function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function switchTab(index) {
  document.querySelectorAll('.tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.tab-content').forEach((content, i) => {
    content.classList.toggle('active', i === index);
  });
}

// Export
window.Components = Components;
window.openModal = openModal;
window.closeModal = closeModal;
window.switchTab = switchTab;

// ============ UX HELPER FUNCTIONS ============

// Skeleton Loader Component
function showSkeleton(containerId, type = 'card', count = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const skeletons = {
    card: `
      <div class="skeleton skeleton-card"></div>
    `,
    table: `
      <div class="skeleton-row">
        <div class="skeleton skeleton-text" style="width: 60px;"></div>
        <div class="skeleton skeleton-text" style="width: 150px;"></div>
        <div class="skeleton skeleton-text" style="width: 100px;"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `,
    list: `
      <div class="skeleton-row" style="margin-bottom: 16px;">
        <div class="skeleton skeleton-circle"></div>
        <div style="flex: 1;">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
      </div>
    `
  };
  
  container.innerHTML = Array(count).fill(skeletons[type] || skeletons.card).join('');
}

// Toast Notification
function showToast(message, type = 'info', duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();
  
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };
  
  // Escape message to prevent XSS
  const safeMessage = typeof escapeHtml === 'function' ? escapeHtml(message) : message;
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${safeMessage}</span>
  `;
  
  // Add toast styles if not present
  if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-notification {
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        border-radius: 12px;
        background: var(--bg-dark);
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        animation: toastSlideIn 0.3s ease-out, toastSlideOut 0.3s ease-in forwards;
        animation-delay: 0s, ${duration - 300}ms;
      }
      .toast-success { background: linear-gradient(135deg, #10b981, #059669); }
      .toast-error { background: linear-gradient(135deg, #ef4444, #dc2626); }
      .toast-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
      .toast-info { background: linear-gradient(135deg, #6366f1, #4f46e5); }
      .toast-icon { font-size: 1.25rem; }
      .toast-message { font-weight: 500; }
      @keyframes toastSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes toastSlideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// Empty State Component
function showEmptyState(containerId, { icon = '📭', title = "Ma'lumot topilmadi", description = '', actionText = '', actionFn = null } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">${icon}</div>
      <div class="empty-state-title">${title}</div>
      ${description ? `<div class="empty-state-desc">${description}</div>` : ''}
      ${actionText ? `<button class="btn btn-primary" onclick="${actionFn}">${actionText}</button>` : ''}
    </div>
  `;
}

// Progress Bar
function updateProgress(containerId, percent, label = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, percent))}%"></div>
    </div>
    ${label ? `<div class="text-sm text-muted" style="margin-top: 4px;">${label}</div>` : ''}
  `;
}

// Confirm Dialog - Premium
function showConfirm(message, onConfirm, onCancel = null) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.style.animation = 'fadeIn 0.2s ease-out';
  
  overlay.innerHTML = `
    <div class="modal modal-glass" style="max-width: 380px; transform-origin: center; animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
      <div class="modal-body" style="text-align: center; padding: 32px 24px;">
        <div style="
          width: 64px; 
          height: 64px; 
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe); 
          color: #4f46e5;
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 2rem; 
          margin: 0 auto 16px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        ">🤔</div>
        
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Tasdiqlash</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem; line-height: 1.5;">${message}</p>
        
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary" id="confirmCancel" style="flex: 1;">Bekor qilish</button>
          <button class="btn btn-primary" id="confirmOk" style="flex: 1; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">Ha, davom etish</button>
        </div>
      </div>
    </div>
  `;
  
  // Add temporary animation styles if needed
  if (!document.getElementById('dialog-animations')) {
    const style = document.createElement('style');
    style.id = 'dialog-animations';
    style.textContent = `
      @keyframes popIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(overlay);
  
  overlay.querySelector('#confirmOk').onclick = () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
    if (onConfirm) onConfirm();
  };
  
  overlay.querySelector('#confirmCancel').onclick = () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
    if (onCancel) onCancel();
  };
}

// Number Counter Animation
function animateCounter(element, targetValue, duration = 1000) {
  const start = parseInt(element.textContent) || 0;
  const increment = (targetValue - start) / (duration / 16);
  let current = start;
  
  element.classList.add('counter', 'updating');
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
      current = targetValue;
      clearInterval(timer);
      element.classList.remove('updating');
    }
    element.textContent = Math.round(current);
  }, 16);
}

// Page Enter Animation
function animatePageEnter() {
  const content = document.querySelector('.app-content');
  if (content) {
    content.classList.add('page-enter');
  }
}

// Export UX helpers
window.showSkeleton = showSkeleton;
window.showToast = showToast;
window.showEmptyState = showEmptyState;
window.updateProgress = updateProgress;
window.showConfirm = showConfirm;
window.animateCounter = animateCounter;
window.animatePageEnter = animatePageEnter;
