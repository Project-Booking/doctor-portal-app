// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';
const API_TIMEOUT = 10000;

// Request/Response Interceptor
class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.timeout = API_TIMEOUT;
  }

  // Make API Request
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      timeout = this.timeout,
    } = options;

    const url = `${this.baseURL}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: controller.signal,
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return {
        success: true,
        data: await response.json(),
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network error',
        status: null,
      };
    }
  }

  // GET Request
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  // POST Request
  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  // PUT Request
  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  // DELETE Request
  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // PATCH Request
  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }
}

export default new ApiService();
