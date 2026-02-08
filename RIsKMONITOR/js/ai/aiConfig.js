// Azure OpenAI Configuration
// Demo uchun mock mode ishlatiladi, keyinchalik real API ga o'tish mumkin

const AIConfig = {
  // Azure OpenAI Settings
  endpoint: '', // 'https://your-resource.openai.azure.com'
  apiKey: '',   // Environment variable orqali o'rnatiladi
  deploymentName: 'gpt-4o', // Model deployment nomi
  apiVersion: '2024-02-15-preview',
  
  // Mock mode - API key yo'q bo'lganda
  useMockMode: true,
  
  // Typing effect delay (ms)
  typingDelay: 30,
  
  // Response delay (ms) - simulate network latency
  mockResponseDelay: 1500,
  
  // Setters
  setApiKey(key) {
    this.apiKey = key;
    this.useMockMode = !key;
  },
  
  setEndpoint(url) {
    this.endpoint = url;
  },
  
  // Check if real API is available
  isRealApiAvailable() {
    return this.apiKey && this.endpoint && !this.useMockMode;
  }
};

// Export for use
window.AIConfig = AIConfig;
