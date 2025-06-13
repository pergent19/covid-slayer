import axios from 'axios';

const API = import.meta.env.VITE_API || 'http://localhost:5000';

export const start = async (data = {}, token) => {
  const res = await axios.post(`${API}/api/game/start`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const update = async (data, token) => {
  const res = await axios.put(`${API}/api/game/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
