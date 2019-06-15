import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() user: User;
  public activeUser: User;
  public users: User[];
  private userSubscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userSubscription = this.userService.getAll().pipe(
      map((response) => {
        return response.filter(r => r.id !== this.user.id);
      }),
    ).subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  activeUserChange(event: User): void {
    this.activeUser = event;
  }

}
