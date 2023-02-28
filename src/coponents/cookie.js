import { Cookies } from 'react-cookie';

const cookie = new Cookies();
export const setCookie = () => {
  return cookie.set();
};
export const getCookie = (name) => {
  return cookie.get(name);
};
