import { getCookie, removeCookie } from '../cookie';

export const getUser = () => {
  const userInfo =
    localStorage.getItem('userInfo') && getCookie('userToken')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
  return userInfo;
};

export const removeUser = () => {
  removeCookie('userToken');
  localStorage.clear();
};
