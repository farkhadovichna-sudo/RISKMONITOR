// ============================================
// ROUTER - SPA Navigation
// ============================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }
  
  addRoute(path, handler) {
    this.routes[path] = handler;
  }
  
  navigate(path) {
    window.location.hash = path;
  }
  
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/').filter(Boolean);
    
    // Find matching route
    let matchedRoute = null;
    let routeParams = {};
    
    for (const route of Object.keys(this.routes)) {
      const routeParts = route.split('/').filter(Boolean);
      const hashParts = hash.slice(1).split('/').filter(Boolean);
      
      if (routeParts.length !== hashParts.length) continue;
      
      let match = true;
      const tempParams = {};
      
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          tempParams[routeParts[i].slice(1)] = hashParts[i];
        } else if (routeParts[i] !== hashParts[i]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        matchedRoute = route;
        routeParams = tempParams;
        break;
      }
    }
    
    // Execute route handler
    if (matchedRoute && this.routes[matchedRoute]) {
      this.currentRoute = matchedRoute;
      this.routes[matchedRoute](routeParams);
    } else if (this.routes['/']) {
      this.currentRoute = '/';
      this.routes['/']({});
    }
  }
  
  getParam(name) {
    const hash = window.location.hash.slice(1);
    const parts = hash.split('/');
    // Simple param extraction - can be enhanced
    return parts[parts.length - 1];
  }
}

// Global router instance
window.router = new Router();
