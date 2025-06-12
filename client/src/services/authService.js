import axios from 'axios';

const API = 'http://localhost:5000/api'; // change to your backend URL

export const login = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};
