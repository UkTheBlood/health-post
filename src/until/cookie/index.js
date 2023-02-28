import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = () => {
  return cookies.set();
};
export const getCookie = () => {
  return cookies.get();
};
export const removeCookie = () => {
  return cookies.remove();
};
