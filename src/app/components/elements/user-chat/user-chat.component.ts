import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {RoomService} from '../../../services/room.service';
import {Room} from '../../../models/room';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {SocketService} from '../../../services/socket.service';
import {Message} from '../../../models/message';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {userGetter} from '../../../utils/helpers';

@Component({
  selector: 'app-userchat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnChanges, OnDestroy {
  @Input() activeUser: User;
  @Input() user: User;
  @Input() users: User[];
  @Output() typingEmit = new EventEmitter();
  public room: Room;
  private getS: Subscription;
  private typing: boolean;
  private audio = new Audio('assets/audio/to-the-point.mp3');
  private createS: Subscription;
  private getNewM: Subscription;
  private getNewMByUser: Subscription;
  private getNewUser: Subscription;
  private listener: Subscription;

  constructor(
    private roomService: RoomService,
    private mScrollbarService: MalihuScrollbarService,
    private socketService: SocketService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('activeUser') && !changes.activeUser.firstChange) {
      this.init(changes.activeUser.currentValue);
    }
  }

  onKeyDown(): void {
    this.socketService.typing(this.room.id);
  }

  setRoomChat($event): void {
    this.room.messages.push($event);
    this.socketService.setNewMessage(this.room.id, $event);
    this.socketService.setNewMessageByUsersId($event.userId, this.activeUser.id);
    this.mScrollbarService.destroy('#scrollElem');
    this.mScrollbarService.initScrollbar('#scrollElem',
      {axis: 'y', theme: 'minimal-dark', setTop: '-999999px'});
  }

  init(user: User): void {
    this.room = null;
    this.getS = this.roomService.get({user1Id: this.user.id, user2Id: user.id}).subscribe(
      (res: Room) => {
        this.getRoomData(res);
      },
      (err: HttpErrorResponse) => {
        this.createS = this.roomService.create({user1Id: this.user.id, user2Id: user.id}).subscribe(
          (r: Room) => {
            this.getRoomData(r);
          }
        );
      }
    );
  }

  getRoomData(res: Room): void {
    if (this.listener) {
      this.listener.unsubscribe();
    }
    this.users.find((r) => r.id === this.activeUser.id).count = 0;
    this.listener = this.socketService.typingListen().subscribe(
      (result: any) => {
        if (result.roomId === this.room.id) {
          if (!this.typing) {
            this.typing = true;
            this.typingEmit.emit(true);
            setTimeout(() => {
              this.typing = false;
              this.typingEmit.emit(false);
            }, 1000);
          }
        }
      }
    );
    this.room = res;
    setTimeout(() => {
      this.mScrollbarService.initScrollbar('#scrollElem',
        {axis: 'y', theme: 'minimal-dark', setTop: '-999999px'});
    }, 100);
  }

  ngOnInit() {
    this.getNewM = this.socketService.getNewMessage().subscribe(
      (res: { roomId: number, message: Message }) => {
        if (this.room && res.roomId === this.room.id) {
          this.room.messages.push(res.message);
          this.mScrollbarService.destroy('#scrollElem');
          this.mScrollbarService.initScrollbar('#scrollElem',
            {axis: 'y', theme: 'minimal-dark', setTop: '-999999px'});
        }
      }
    );
    this.getNewMByUser = this.socketService.getNewMessageByUsersId().subscribe(
      (result: {userFrom: number, userTo: number}) => {
        if (result.userTo === this.user.id) {
          if (!this.activeUser || this.activeUser.id !== result.userFrom) {
            const currentUser = this.users.find((r) => r.id === result.userFrom);
            if (!currentUser.count) {
              currentUser.count = 0;
            }
            this.audio.pause()
            this.audio.play();
            currentUser.count = currentUser.count + 1;
          }
        }
      }
    );
    this.getNewUser = this.socketService.getNewUser().subscribe((res: User) => {
      if (res.id === userGetter().id) {
        return false;
      }
      this.users.push(res);
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener.unsubscribe();
    }
    if (this.getS) {
      this.getS.unsubscribe();
    }
    if (this.getNewM) {
      this.getNewM.unsubscribe();
    }
    if (this.getNewMByUser) {
      this.getNewMByUser.unsubscribe();
    }
    if (this.createS) {
      this.createS.unsubscribe();
    }
    if (this.getNewUser) {
      this.getNewUser.unsubscribe();
    }
  }
}
