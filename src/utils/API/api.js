import axios from 'axios';
import { store } from '../redux/store';
import { saveUser, saveUserToken } from '../Cookie/cookie';
import { info, token } from '../redux/actions';

const PORT = 3001;
const localhost = `http://localhost:${PORT}/api/`;

export const register = async (data) => {
  try {
    const response = await axios.post(`${localhost}auth/register`, data);
    localStorage.setItem('info', response.data.message);
    await store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    await store.dispatch(info(e.response.data.message, true));
  }
};

export const login = async (data, onComplite) => {
  try {
    const response = await axios.post(`${localhost}auth/login`, data);

    await store.dispatch(token(response.data.token));

    localStorage.setItem('info', 'Вход выполнен');
    store.dispatch(info('Вход выполнен', false));
    // localStorage.setItem('token', response.data.token);
    await saveUserToken(response.data.token);
    await saveUser(JSON.stringify(response.data.user));
    onComplite(response.data.token);
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    await store.dispatch(info(e.response.data.message, true));
  }
};

export const createLeague = async (data) => {
  try {
    const response = await axios.post(`${localhost}leagues`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const createPlayer = async (data) => {
  try {
    const response = await axios.post(`${localhost}players`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const createTeam = async (data) => {
  try {
    const response = await axios.post(`${localhost}teams`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const createGame = async (data) => {
  try {
    const response = await axios.post(`${localhost}games`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const removeLeague = async (id) => {
  try {
    const response = await axios.delete(`${localhost}leagues/${id}`, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const removeTeam = async (id) => {
  try {
    const response = await axios.delete(`${localhost}teams/${id}`, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const removeGame = async (id) => {
  try {
    const response = await axios.delete(`${localhost}games/${id}`, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const removePlayer = async (id) => {
  try {
    const response = await axios.delete(`${localhost}players/${id}`, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const updateLeague = async (id, data) => {
  try {
    const response = await axios.patch(`${localhost}leagues/${id}`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const updateTeam = async (id, data) => {
  try {
    const response = await axios.patch(`${localhost}teams/${id}`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const updatePlayer = async (id, data) => {
  console.log(data);
  try {
    const response = await axios.patch(`${localhost}players/${id}`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};
