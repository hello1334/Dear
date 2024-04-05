import axios from 'axios';

const gateway_url: string | undefined = import.meta.env.VITE_GATEWAY_URL;
const domain: string | undefined = import.meta.env.VITE_DOMAIN;

export const instance = axios.create({
  baseURL: gateway_url,
});

type Token = {
  accessToken: string;
};

instance.interceptors.request.use((config) => {
  const token: Token = JSON.parse(localStorage.getItem('login-state')!).state.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      if (err.response.headers.authorization) {
        const newAccessToken = err.response.headers.authorization.split(' ')[1];
        const zustandData = localStorage.getItem('login-state');
        if (zustandData) {
          const jsonZustandData = JSON.parse(zustandData);
          jsonZustandData.state.accessToken = newAccessToken;
          localStorage.setItem('login-state', JSON.stringify(jsonZustandData));
          window.location.reload();
        }
      } else {
        window.location.href = `${domain}/login`;
      }
    }
  },
);
