import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const saveUserToken = (token) => {
  let expdate = new Date();
  expdate = expdate.addDays(1);
  const options = {
    expires: expdate,
    path: '/',
  };
  cookies.set('token', token, options);
};

export const saveUser = (user) => {
  let expdate = new Date();
  expdate = expdate.addDays(1);
  const options = {
    expires: expdate,
    path: '/',
  };
  cookies.set('user', user, options);
};

export const saveCurrentLeague = (league) => {
  let expdate = new Date();
  expdate = expdate.addDays(1);
  const options = {
    expires: expdate,
    path: '/',
  };
  cookies.set('league', league, options);
};

export const getUserToken = () => cookies.get('token');
export const removeUserToken = () => cookies.remove('token', { path: '/' });

export const getUser = () => cookies.get('user');
export const removeUser = () => cookies.remove('user', { path: '/' });

export const getCurrentLeague = () => cookies.get('league');
export const removeCurrentLeague = () => cookies.remove('league', { path: '/' });
