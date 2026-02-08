// ============================================
// AUTH SERVICE - Centralized Authentication
// Abstraction layer for future backend integration
// ============================================

const AuthService = {
  // Storage keys
  STORAGE_KEYS: {
    USER: 'user',
    USER_DATA: 'userData',
    IS_ADMIN: 'isAdmin'
  },
  
  /**
   * Get current user from storage
   * @returns {object|null} User object or null
   */
  getUser() {
    try {
      const userData = localStorage.getItem(this.STORAGE_KEYS.USER_DATA);
      if (userData) {
        return JSON.parse(userData);
      }
      const user = localStorage.getItem(this.STORAGE_KEYS.USER);
      if (user) {
        return JSON.parse(user);
      }
    } catch (e) {
      console.error('AuthService.getUser error:', e);
    }
    return null;
  },
  
  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const user = this.getUser();
    return user !== null;
  },
  
  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  hasRole(role) {
    const user = this.getUser();
    return user && user.role === role;
  },
  
  /**
   * Check if user is admin
   * Note: Backend should enforce this; frontend check is for UI only
   * @returns {boolean}
   */
  isAdmin() {
    const user = this.getUser();
    if (user && user.role === 'admin') {
      return true;
    }
    // Fallback for demo mode (NOT SECURE - backend must validate)
    return localStorage.getItem(this.STORAGE_KEYS.IS_ADMIN) === 'true';
  },
  
  /**
   * Login user (demo mode - no real backend)
   * @param {object} credentials - { login, password }
   * @returns {object|null} User object if successful
   */
  login(credentials) {
    // Demo users - In production, this would be a backend call
    const users = {
      'admin': { password: 'admin123', name: 'Anvar Abdullayev', role: 'admin' },
      'inspektor': { password: '123456', name: 'Nilufar Karimova', role: 'inspector' },
      'tahlilchi': { password: '123456', name: 'Bobur Rahimov', role: 'analyst' },
      'user': { password: '123456', name: 'Jamshid Toshmatov', role: 'viewer' }
    };
    
    const user = users[credentials.login];
    if (user && user.password === credentials.password) {
      const userData = { 
        name: user.name, 
        role: user.role, 
        login: credentials.login 
      };
      
      localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify({ name: user.name, role: user.role }));
      localStorage.setItem(this.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      
      // Admin flag for easy checking (NOT SECURE - demo only)
      if (user.role === 'admin') {
        localStorage.setItem(this.STORAGE_KEYS.IS_ADMIN, 'true');
      } else {
        localStorage.removeItem(this.STORAGE_KEYS.IS_ADMIN);
      }
      
      return userData;
    }
    return null;
  },
  
  /**
   * Logout current user
   */
  logout() {
    localStorage.removeItem(this.STORAGE_KEYS.USER);
    localStorage.removeItem(this.STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(this.STORAGE_KEYS.IS_ADMIN);
  },
  
  /**
   * Get user display name
   * @returns {string}
   */
  getUserName() {
    const user = this.getUser();
    return user?.name || 'Foydalanuvchi';
  },
  
  /**
   * Get user role
   * @returns {string}
   */
  getUserRole() {
    const user = this.getUser();
    return user?.role || 'viewer';
  },
  
  /**
   * Get user initials
   * @returns {string}
   */
  getUserInitials() {
    const name = this.getUserName();
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name[0] || 'F';
  }
};

// Export
window.AuthService = AuthService;
