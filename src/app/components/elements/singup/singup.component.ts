import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValidation} from '../../../utils/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {userSetter} from '../../../utils/helpers';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent extends FormValidation implements OnInit, OnDestroy {
  private regSub: Subscription;
  public signupSubmitAttempt = false;
  public regForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private socketService: SocketService,
    private toastrService: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      nickName: new FormControl(null, [Validators.required]),
      interest: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    if (this.regSub) {
      this.regSub.unsubscribe();
    }
  }

  onRegistrationSubmit(): void {

    this.signupSubmitAttempt = true;
    if (this.regForm.valid) {
      const formData = this.regForm.value;
      this.regSub = this.userService.create(formData).subscribe(
        (res: User) => {
          this.userService.userSubject.next(res);
          userSetter(res);
          res.active = true;
          this.socketService.setOnlineFlag(res.id);
          this.socketService.setNewUser(res);
        },
        (err: HttpErrorResponse) => {
          this.toastrService.error(err.error.message);
        });
    }
  }

}
