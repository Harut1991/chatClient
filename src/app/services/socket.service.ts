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
    this.socket.emit('new_message', {roomId: id, message: newMessage});
  }

  setNewUser(user: User) {
    this.socket.emit('newuser', user);
  }

  typingListen() {
    return this.socket
      .fromEvent('typing');
  }

  getNewMessage() {
    return this.socket
      .fromEvent('new_message');
  }

  getNewUser() {
    return this.socket
      .fromEvent('newuser');
  }
}
