import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const API = axios.create({
  baseURL: API_BASE_URL,// replace with your correct local IP
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');

  // Skip adding token for public endpoints
  const publicPaths = ['/login/', '/register/', '/movies/'];
  const isPublic = publicPaths.some(path => config.url?.includes(path));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));


API.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401 && err.response?.data?.code === 'token_not_valid') {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
    }
    return Promise.reject(err);
  }
);


export default API;
