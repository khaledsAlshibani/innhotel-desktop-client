import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/authService';
import { logger } from '@/utils/logger';

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const log = logger();
    const accessToken = useAuthStore.getState().accessToken;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    log.info(`🌐 Request: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
      params: config.params
    });

    return config;
  },
  (error) => {
    const log = logger();
    log.error('Request failed', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const log = logger();
    log.info(`✅ Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    const log = logger();
    const originalRequest = error.config;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    log.error(`❌ Response Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
      status: error.response?.status,
      data: error.response?.data,
      error: error.message
    });

    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        isAuthenticated && 
        !originalRequest.url?.includes('/auth/refresh')) {
      originalRequest._retry = true;

      try {
        log.info('🔄 Token expired, attempting refresh...');
        const { accessToken, email, roles } = await authService.refresh();
        
        log.info('🔑 Token refresh successful', { email, roles });
        useAuthStore.getState().setAuth({ accessToken, email, roles });
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        log.error('🚫 Token refresh failed', {
          error: refreshError instanceof Error ? refreshError.message : 'Unknown error'
        });
        useAuthStore.getState().clearAuth();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;