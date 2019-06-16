import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {heroku, userGetter} from './utils/helpers';
import {SocketService} from './services/socket.service';
import {User} from './models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loader = true;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private socketService: SocketService
  ) {
    if (userGetter()) {
      this.userService.get(userGetter().id).subscribe(
        (res: User) => {
          if (res) {
            this.userService.userSubject.next(userGetter());
            this.socketService.setOnlineFlag(userGetter().id);
          } else {
            this.toastrService.error(heroku);
          }
          this.loader = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    } else {
      this.loader = false;
    }

  }
}
