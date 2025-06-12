import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createGame = () => API.post('/game');
export const performAction = (type) => API.post(`/game/action/${type}`);
export const getGameStatus = () => API.get('/game/status');