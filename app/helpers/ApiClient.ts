import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiClientConfig extends AxiosRequestConfig {
  baseURL?: string;
  // Add other configuration options here
}

class ApiClient {
  private static instance: ApiClient | null = null;
  public client: AxiosInstance;
  private auth: { token: string | null } = {
    token: null
  };

  private constructor(config: ApiClientConfig) {
    this.client = axios.create(config);
  }

  public static getInstance(config: ApiClientConfig): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(config);
    }
    return ApiClient.instance;
  }

  public get<T = Record<string, string>>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const setup = { ...config };
    const headers = setup.headers || {};
    headers.Authorization = `Bearer ${this.auth.token}`;
    return this.client.get<T>(url, { ...setup, headers});
  }

  public post<T = Record<string, string>>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const setup = { ...config };
    const headers = setup.headers || {};
    headers.Authorization = `Bearer ${this.auth.token}`;
    return this.client.post<T>(url, data, { ...setup, headers});
  }

  public setToken(token: string) {
    this.auth.token = token;
  }

  // Define other methods like post, put, delete, etc.
}

const apiClientConfig: ApiClientConfig = {
  // Add other default configurations here
};

const HttpClient = ApiClient.getInstance(apiClientConfig);
Object.freeze(HttpClient);

export default HttpClient;