import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {
  @Input() activeUser: User;
  @Input() user: User;
  @Output() activateUserEmit = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  activateUser(user: User): void {
    this.activateUserEmit.emit(user);
  }

}
