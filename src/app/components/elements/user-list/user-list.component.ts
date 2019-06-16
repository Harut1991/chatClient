import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {SocketService} from '../../../services/socket.service';
import {isInArray, userGetter} from '../../../utils/helpers';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() users: User[];
  @Output() activeUserChange = new EventEmitter();
  public activeUser: User;
  public onlineUsers: [];
  public scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  private checkActiveStatus: Subscription;
  private getNewUser: Subscription;
  private checkDeActiveStatus: Subscription;

  constructor(
    private socketService: SocketService
  ) {
  }

  activateUser(user: User): void {
    if (!this.activeUser || this.activeUser.id !== user.id) {
      this.activeUser = user;
      this.activeUserChange.emit(this.activeUser);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('users') && !changes.users.firstChange) {
      if (changes.users.currentValue) {
        this.changeUserStatus();
      }
    }
  }

  ngOnInit() {
    this.socketService.setOnlineFlag(userGetter().id);
    this.checkActiveStatus = this.socketService.checkActiveStatus().subscribe((res: []) => {
      this.onlineUsers = res;
      this.changeUserStatus();
    });
    this.getNewUser = this.socketService.getNewUser().subscribe((res: User) => {
      if (res.id === userGetter().id) {
        return false;
      }
      this.users.push(res);
      this.changeUserStatus();
    });
    this.checkDeActiveStatus = this.socketService.checkDeActiveStatus().subscribe((res: []) => {
      this.onlineUsers = res;
      this.changeUserStatus();
    });
  }

  ngOnDestroy(): void {
    if (this.checkDeActiveStatus) {
      this.checkDeActiveStatus.unsubscribe();
    }
    if (this.getNewUser) {
      this.getNewUser.unsubscribe();
    }
    if (this.checkActiveStatus) {
      this.checkActiveStatus.unsubscribe();
    }
  }

  changeUserStatus() {
    if (!this.onlineUsers || !this.users) {
      return false;
    }

    this.users = this.users.map((res: User) => {
      res.active = isInArray(res.id, this.onlineUsers) ? true : false;
      return res;
    });
  }

}
