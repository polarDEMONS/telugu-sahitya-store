
/**
 * Simple Medusa client using native fetch API
 * Used as a fallback when the official Medusa packages can't be installed
 */

const MEDUSA_BACKEND_URL = "http://localhost:9000"; // Default Medusa server URL

export type MedusaConfig = {
  baseUrl: string;
  apiKey?: string;
};

class MedusaClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config: MedusaConfig = { baseUrl: MEDUSA_BACKEND_URL }) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    
    // Log the backend URL being used
    console.log("Medusa client initialized with backend URL:", this.baseUrl);
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/store${endpoint}`;
    
    console.log(`Making request to: ${url}`);
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: `HTTP error ${response.status}` }));
        console.error(`Medusa request failed: ${response.status}`, error);
        throw new Error(error.message || `HTTP error ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Medusa request error:", error);
      throw error;
    }
  }

  // Products
  async getProducts() {
    return this.request<any>('/products');
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  // Orders
  async getOrders() {
    return this.request<any>('/orders');
  }

  // Cart
  async createCart() {
    return this.request<any>('/carts', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }
  
  // Test connection 
  async testConnection() {
    try {
      await this.request<any>('/');
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

// Create a default client instance
const medusaClient = new MedusaClient();

export { medusaClient };
export default MedusaClient;
