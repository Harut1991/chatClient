import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {userGetter} from './utils/helpers';
import {SocketService} from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {

    if (userGetter()) {
      this.userService.userSubject.next(userGetter());
      this.socketService.setOnlineFlag(userGetter().id);
    }

  }
}
