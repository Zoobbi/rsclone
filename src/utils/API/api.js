import axios from 'axios';
import { store } from '../redux/store';
import { getUser, saveUser, saveUserToken } from '../Cookie/cookie';
import { info, token } from '../redux/actions';

const PORT = 3001;
const localhost = `http://localhost:${PORT}/api/`;

const createHistory = async (data) => {
  try {
    await axios.post(`${localhost}histories/`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

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

    createHistory({ text: `пользователь ${data.email} залогинился`, user_email: data.email });
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
    createHistory({ text: `cоздана лига ${data.name}`, user_email: getUser().email });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const createPlayer = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${localhost}players`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
    createHistory({ text: `cоздан игрок ${data.last_name} в команду ${data.team}`, user_email: getUser().email });
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
    createHistory({ text: `cоздана команда ${data.name} в лигу ${data.league}`, user_email: getUser().email });
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
    createHistory({ text: `записана игра команд ${data.team_home} и ${data.team_visit}  в лиге ${data.league}`, user_email: getUser().email });
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
    createHistory({ text: `удалена лига ${id}`, user_email: getUser().email });
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
    createHistory({ text: `удалена команда ${id}`, user_email: getUser().email });
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
    createHistory({ text: `удалена игра ${id}`, user_email: getUser().email });
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
    createHistory({ text: `удален игрок ${id}`, user_email: getUser().email });
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
    createHistory({ text: `изменена лига ${id} - ${data.name};`, user_email: getUser().email });
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const updateTeam = async (id, data, isGame = false) => {
  try {
    const response = await axios.patch(`${localhost}teams/${id}`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
    if (!isGame) {
      createHistory({ text: `изменена команда ${id}`, user_email: getUser().email });
    }
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};

export const updatePlayer = async (id, data, isGame = false) => {
  try {
    const response = await axios.patch(`${localhost}players/${id}`, data, { headers: { Authorization: ` ${store.getState().token.token}` } });
    localStorage.setItem('info', response.data.message);
    store.dispatch(info(response.data.message, false));
    if (!isGame) {
      createHistory({ text: `изменён игрок ${id}; ${data.last_name}`, user_email: getUser().email });
    }
  } catch (e) {
    localStorage.setItem('info', e.response.data.message);
    store.dispatch(info(e.response.data.message, false));
  }
};
