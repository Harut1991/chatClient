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

export function checkFileType(name: string) {
  const image = [ 'jpg' , 'jpeg' , 'png' , 'gif' , 'bmp'];
  const video = [ 'mov' , 'mp4'];
  const audio = [ 'mp3' , 'wav'];
  if (image.includes(name)) {
    return 'image';
  } else if (video.includes(name)){
    return 'video';
  } else if ( audio.includes(name)){
    return 'audio';
  } else {
    return 'other';
  }
}

export const heroku = 'I use heroku server to deploy the application, but heroku server restarts environment every time when nothing is happening in 30 minutes, so your user can be deleted. Sorry for that, you can use local deployment to avoid this kind of problems.';


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


