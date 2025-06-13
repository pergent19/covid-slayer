import axios from 'axios';

const API = import.meta.env.API || 'http://localhost:5000';

export const login = async (data) => {
  const res = await axios.post(`${API}/api/auth/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};
