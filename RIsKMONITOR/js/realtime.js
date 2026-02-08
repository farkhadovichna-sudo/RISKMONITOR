// ============================================
// REAL-TIME UPDATES - Fake WebSocket Simulation
// ============================================

const RealTime = {
  isConnected: true,
  updateInterval: null,
  toastContainer: null,
  
  // Initialize real-time system
  init() {
    this.createToastContainer();
    this.createConnectionIndicator();
    this.startUpdates();
    
    // Reconnection simulation
    setInterval(() => {
      if (Math.random() < 0.05) {
        this.simulateReconnection();
      }
    }, 30000);
  },
  
  // Create toast container
  createToastContainer() {
    if (document.getElementById('toastContainer')) return;
    
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    this.toastContainer = container;
  },
  
  // Create connection indicator
  createConnectionIndicator() {
    if (document.getElementById('connectionIndicator')) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'connectionIndicator';
    indicator.className = 'connection-indicator connected';
    indicator.innerHTML = `
      <span class="connection-dot"></span>
      <span class="connection-text">Real-time: Online</span>
    `;
    document.body.appendChild(indicator);
  },
  
  // Start real-time updates
  startUpdates() {
    // Random interval between 5-15 seconds
    const scheduleNext = () => {
      const delay = 5000 + Math.random() * 10000;
      this.updateInterval = setTimeout(() => {
        this.triggerUpdate();
        scheduleNext();
      }, delay);
    };
    
    scheduleNext();
  },
  
  // Stop updates
  stopUpdates() {
    if (this.updateInterval) {
      clearTimeout(this.updateInterval);
      this.updateInterval = null;
    }
  },
  
  // Trigger a random update
  triggerUpdate() {
    if (!this.isConnected) return;
    
    const updateTypes = [
      { type: 'new_tender', weight: 40 },
      { type: 'risk_change', weight: 30 },
      { type: 'case_update', weight: 20 },
      { type: 'system', weight: 10 }
    ];
    
    const random = Math.random() * 100;
    let cumulative = 0;
    let selectedType = 'new_tender';
    
    for (const ut of updateTypes) {
      cumulative += ut.weight;
      if (random <= cumulative) {
        selectedType = ut.type;
        break;
      }
    }
    
    this.handleUpdate(selectedType);
  },
  
  // Handle different update types
  handleUpdate(type) {
    switch (type) {
      case 'new_tender':
        this.handleNewTender();
        break;
      case 'risk_change':
        this.handleRiskChange();
        break;
      case 'case_update':
        this.handleCaseUpdate();
        break;
      case 'system':
        this.handleSystemUpdate();
        break;
    }
    
    // Update KPIs if on dashboard
    this.updateDashboardKPIs();
  },
  
  // Handle new tender notification
  handleNewTender() {
    const tenderId = `TND-2024-${String(Math.floor(Math.random() * 90000) + 10000).padStart(5, '0')}`;
    const riskScores = [
      { score: 85, band: 'Yuqori', icon: '🔴' },
      { score: 72, band: 'Yuqori', icon: '🔴' },
      { score: 55, band: "O'rta", icon: '🟡' },
      { score: 45, band: "O'rta", icon: '🟡' },
      { score: 25, band: 'Past', icon: '🟢' }
    ];
    const risk = riskScores[Math.floor(Math.random() * riskScores.length)];
    
    this.showToast({
      type: risk.score >= 70 ? 'danger' : (risk.score >= 40 ? 'warning' : 'success'),
      icon: risk.icon,
      title: 'Yangi tender signali',
      message: `${tenderId} - Risk: ${risk.score} (${risk.band})`,
      duration: 6000
    });
  },
  
  // Handle risk score change
  handleRiskChange() {
    const tenderId = mockData.TENDERS[Math.floor(Math.random() * mockData.TENDERS.length)]?.id || 'TND-2024-00100';
    const change = Math.random() > 0.5 ? '+' : '-';
    const amount = Math.floor(Math.random() * 15) + 3;
    
    this.showToast({
      type: change === '+' ? 'warning' : 'info',
      icon: change === '+' ? '📈' : '📉',
      title: 'Risk o\'zgarishi',
      message: `${tenderId}: ${change}${amount} ball`,
      duration: 5000
    });
  },
  
  // Handle case update
  handleCaseUpdate() {
    const caseId = mockData.CASES[Math.floor(Math.random() * mockData.CASES.length)]?.id || 'CASE-001';
    const actions = [
      'tekshiruvga olindi',
      'yangi izoh qo\'shildi',
      'status yangilandi',
      'qaror kutilmoqda'
    ];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    this.showToast({
      type: 'info',
      icon: '📁',
      title: 'Case yangilandi',
      message: `${caseId}: ${action}`,
      duration: 5000
    });
  },
  
  // Handle system update
  handleSystemUpdate() {
    const messages = [
      'Tizim sinxronizatsiyasi muvaffaqiyatli',
      'Risk qoidalari yangilandi',
      'Ma\'lumotlar bazasi yangilandi'
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    this.showToast({
      type: 'success',
      icon: '✅',
      title: 'Tizim',
      message: message,
      duration: 4000
    });
  },
  
  // Update dashboard KPIs - only elements with 'kpi-realtime' class
  updateDashboardKPIs() {
    // Only update elements explicitly marked for real-time updates
    const kpiCards = document.querySelectorAll('.kpi-card-value.kpi-realtime');
    if (kpiCards.length === 0) return;
    
    kpiCards.forEach((card, index) => {
      // Small random changes
      const currentValue = parseInt(card.textContent) || 0;
      const change = Math.random() < 0.3 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      const newValue = Math.max(0, currentValue + change);
      
      if (change !== 0) {
        card.classList.add('kpi-updating');
        setTimeout(() => {
          card.textContent = newValue;
          card.classList.remove('kpi-updating');
        }, 300);
      }
    });
  },
  
  // Show toast notification
  showToast({ type = 'info', icon = 'ℹ️', title, message, duration = 5000 }) {
    if (!this.toastContainer) {
      this.createToastContainer();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
      <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
    `;
    
    this.toastContainer.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });
    
    // Auto remove
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  
  // Simulate reconnection
  simulateReconnection() {
    this.isConnected = false;
    const indicator = document.getElementById('connectionIndicator');
    if (indicator) {
      indicator.className = 'connection-indicator disconnected';
      indicator.querySelector('.connection-text').textContent = 'Qayta ulanmoqda...';
    }
    
    // Reconnect after 2-4 seconds
    setTimeout(() => {
      this.isConnected = true;
      if (indicator) {
        indicator.className = 'connection-indicator connected';
        indicator.querySelector('.connection-text').textContent = 'Real-time: Online';
      }
      
      this.showToast({
        type: 'success',
        icon: '🔄',
        title: 'Qayta ulandi',
        message: 'Real-time aloqa tiklandi',
        duration: 3000
      });
    }, 2000 + Math.random() * 2000);
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Delay to let main app initialize first
  setTimeout(() => {
    RealTime.init();
  }, 1000);
});

// Export
window.RealTime = RealTime;
