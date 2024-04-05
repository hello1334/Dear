import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://test-api.example.com',
});
export const setHeaderToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete client.defaults.headers.common.Authorization;
};
