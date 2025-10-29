import axios from 'axios';

const client = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default client;
