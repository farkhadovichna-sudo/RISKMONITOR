// ============================================
// MAIN APPLICATION - App.js
// ============================================

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initRouter();
});

function initRouter() {
  // Public routes
  router.addRoute('/', () => {
    renderLanding();
  });
  
  router.addRoute('/login', () => {
    renderLogin();
  });
  
  // App routes (require login)
  router.addRoute('/app/dashboard', () => {
    if (!checkAuth()) return;
    renderDashboard();
  });
  
  router.addRoute('/app/tenders', () => {
    if (!checkAuth()) return;
    renderTenders();
  });
  
  router.addRoute('/app/tenders/filter/:filter', (params) => {
    if (!checkAuth()) return;
    renderFilteredTenders(params.filter);
  });
  
  router.addRoute('/app/tenders/:id', (params) => {
    if (!checkAuth()) return;
    renderTenderDetail(params);
  });
  
  router.addRoute('/app/cases', () => {
    if (!checkAuth()) return;
    renderCases();
  });
  
  router.addRoute('/app/cases/:id', (params) => {
    if (!checkAuth()) return;
    renderCaseDetail(params);
  });
  
  router.addRoute('/app/reports', () => {
    if (!checkAuth()) return;
    renderReports();
  });
  
  router.addRoute('/app/analytics', () => {
    if (!checkAuth()) return;
    renderAnalytics();
  });
  
  router.addRoute('/app/anomaly', () => {
    if (!checkAuth()) return;
    renderAnomaly();
  });
  
  router.addRoute('/app/risk-trend', () => {
    if (!checkAuth()) return;
    renderRiskTrend();
  });
  
  router.addRoute('/app/admin', () => {
    if (!checkAuth()) return;
    if (!checkAdmin()) return;
    renderAdminPanel();
  });
  
  router.addRoute('/app/ai-stats', () => {
    if (!checkAuth()) return;
    renderAIStats();
  });
  
  router.addRoute('/app/monitors', () => {
    if (!checkAuth()) return;
    renderMonitors();
  });
  
  router.addRoute('/app/knowledge-base', () => {
    if (!checkAuth()) return;
    renderKnowledgeBase();
  });
  
  router.addRoute('/app/profile', () => {
    if (!checkAuth()) return;
    renderProfile();
  });
  
  router.addRoute('/app/settings', () => {
    if (!checkAuth()) return;
    renderSettings();
  });
  
  // Handle initial route
  router.handleRoute();
}

function checkAuth() {
  const user = localStorage.getItem('user');
  if (!user) {
    window.location.hash = '/login';
    return false;
  }
  return true;
}

// Check if current user is admin
function checkAdmin() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user.role === 'admin') return true;
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  }
  // For demo: check if isAdmin flag is set
  if (localStorage.getItem('isAdmin') === 'true') return true;
  
  showToast && showToast("Bu sahifaga kirishga ruxsat yo'q", 'error');
  window.location.hash = '/app/dashboard';
  return false;
}

// Helper function to check if user is admin (without redirect)
function isAdmin() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.role === 'admin';
    } catch (e) {
      return false;
    }
  }
  return localStorage.getItem('isAdmin') === 'true';
}

// Utility: Format numbers
function formatNumber(num) {
  return new Intl.NumberFormat('uz-UZ').format(num);
}

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Error: ', msg, url, lineNo, columnNo, error);
  return false;
};

// Export utilities
window.formatNumber = formatNumber;
window.debounce = debounce;
window.checkAuth = checkAuth;
window.checkAdmin = checkAdmin;
window.isAdmin = isAdmin;
