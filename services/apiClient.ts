import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { authStore } from '@/stores/useAuthStore';
import { refreshSession } from './authService';

const API_BASE_URL = process.env.API_BASE_URL ?? 'https://api.doctor-portal.health/v1';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token?: string) {
  refreshQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  refreshQueue = [];
}

client.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = authStore.getState().accessToken;
  if (accessToken && config?.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => client(originalRequest));
      }

      isRefreshing = true;
      try {
        const data = await refreshSession(authStore.getState().refreshToken);
        authStore.getState().setSession(data);
        processQueue(null, data.accessToken);
        return client(originalRequest);
      } catch (refreshError) {
        authStore.getState().logout();
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
