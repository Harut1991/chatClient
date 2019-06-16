import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {User} from '../models/user';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
  }

  checkActiveStatus() {
    return this.socket
      .fromEvent('username');
  }

  checkDeActiveStatus() {
    return this.socket
      .fromEvent('is_online');
  }

  setOnlineFlag(id: number) {
    this.socket.emit('username', id);
  }

  typing(id: number) {
    this.socket.emit('typing', {roomId: id});
  }

  setNewMessage(id: number, newMessage: Message) {
    this.socket.emit('newMessage', {roomId: id, message: newMessage});
  }

  setNewUser(user: User) {
    this.socket.emit('newuser', user);
  }

  setNewMessageByUsersId(userFrom: number, userTo: number) {
    this.socket.emit('newMessageByUsersId', {
      'userFrom': userFrom,
      'userTo': userTo
    });
  }

  typingListen() {
    return this.socket
      .fromEvent('typing');
  }

  getNewMessage() {
    return this.socket
      .fromEvent('newMessage');
  }

  getNewUser() {
    return this.socket
      .fromEvent('newuser');
  }

  getNewMessageByUsersId() {
    return this.socket
      .fromEvent('newMessageByUsersId');
  }
}
