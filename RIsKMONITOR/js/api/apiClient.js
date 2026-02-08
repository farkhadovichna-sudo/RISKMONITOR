// ============================================
// API CLIENT - Centralized API Layer
// Currently uses mock data; ready for real backend
// ============================================

const ApiClient = {
  // Configuration
  baseUrl: '/api/v1',  // Future backend URL
  
  // Loading state management
  _loadingCount: 0,
  
  /**
   * Show loading indicator
   */
  _showLoading() {
    this._loadingCount++;
    // Could show global spinner here
  },
  
  /**
   * Hide loading indicator
   */
  _hideLoading() {
    this._loadingCount--;
    if (this._loadingCount < 0) this._loadingCount = 0;
  },
  
  /**
   * Handle API error
   * @param {Error} error - Error object
   * @param {string} context - Error context description
   */
  _handleError(error, context) {
    console.error(`API Error [${context}]:`, error);
    if (typeof showToast === 'function') {
      showToast(`Xatolik: ${context}`, 'error');
    }
  },
  
  /**
   * Generic request wrapper (for future real API)
   * @param {string} endpoint - API endpoint
   * @param {object} options - Fetch options
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    this._showLoading();
    try {
      // In production, this would be:
      // const response = await fetch(this.baseUrl + endpoint, {
      //   ...options,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${AuthService.getToken()}`,
      //     ...options.headers
      //   }
      // });
      // return await response.json();
      
      // For now, simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100));
      throw new Error('Real API not implemented');
    } catch (error) {
      this._handleError(error, endpoint);
      throw error;
    } finally {
      this._hideLoading();
    }
  },
  
  // ==========================================
  // MOCK DATA METHODS (Current Implementation)
  // ==========================================
  
  /**
   * Get all tenders
   * @returns {Array}
   */
  getTenders() {
    return mockData.TENDERS;
  },
  
  /**
   * Get tender by ID
   * @param {string} id - Tender ID
   * @returns {object|undefined}
   */
  getTenderById(id) {
    return mockData.TENDERS.find(t => t.id === id);
  },
  
  /**
   * Get tenders by risk band
   * @param {string} band - 'high', 'medium', 'low'
   * @returns {Array}
   */
  getTendersByRiskBand(band) {
    return mockData.TENDERS.filter(t => t.riskBand === band);
  },
  
  /**
   * Get all cases
   * @returns {Array}
   */
  getCases() {
    return mockData.CASES;
  },
  
  /**
   * Get case by ID
   * @param {string} id - Case ID
   * @returns {object|undefined}
   */
  getCaseById(id) {
    return mockData.CASES.find(c => c.id === id);
  },
  
  /**
   * Get cases by status
   * @param {string} status - 'new', 'in_review', 'closed'
   * @returns {Array}
   */
  getCasesByStatus(status) {
    return mockData.CASES.filter(c => c.status === status);
  },
  
  /**
   * Get risky tenders without cases
   * @returns {Array}
   */
  getRiskyTendersWithoutCase() {
    return mockData.getRiskyTendersWithoutCase();
  },
  
  /**
   * Open a new case for a tender
   * @param {string} tenderId - Tender ID
   * @returns {object|null}
   */
  openCase(tenderId) {
    return mockData.openCase(tenderId);
  },
  
  /**
   * Get dashboard statistics
   * @returns {object}
   */
  getStats() {
    return mockData.getStats();
  },
  
  /**
   * Get risk trend data
   * @returns {Array}
   */
  getRiskTrendData() {
    return mockData.getRiskTrendData();
  },
  
  /**
   * Get top risky buyers
   * @returns {Array}
   */
  getTopRiskyBuyers() {
    return mockData.getTopRiskyBuyers();
  },
  
  /**
   * Get top signaled companies
   * @returns {Array}
   */
  getTopSignaledCompanies() {
    return mockData.getTopSignaledCompanies();
  }
};

// Export
window.ApiClient = ApiClient;
