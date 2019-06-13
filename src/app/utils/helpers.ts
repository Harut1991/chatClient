// import {User} from '../models/user.model';
//
// export function tokenGetter(): string {
//   return localStorage.getItem('access_token');
// }
//
// export function tokenSetter(token: string): void {
//   localStorage.setItem('access_token', token);
// }
//
// export function userGetter(): User {
//   return JSON.parse(localStorage.getItem('user'));
// }
//
// export function userSetter(user: string | User): void {
//   localStorage.setItem('user', JSON.stringify(user));
// }
//
// export function isAuth(): boolean {
//   if (!localStorage.getItem('access_token')) {
//     return false;
//   }
//   return true;
// }
//
// export function logOut(): void {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('user');
// }
