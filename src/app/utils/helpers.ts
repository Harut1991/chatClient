import {User} from '../models/user';

export function userGetter(): User {
  return JSON.parse(getCookie('user'));

}

export function userSetter(user: string | User): void {
  setCookie('user', JSON.stringify(user));
}

export function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function setCookie(name, value) {
  document.cookie = name + '=' + (value || '') ;
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') { c = c.substring(1, c.length); }
    if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length, c.length); }
  }
  return null;
}


