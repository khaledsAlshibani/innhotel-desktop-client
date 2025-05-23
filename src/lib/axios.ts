import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;