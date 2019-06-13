import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValidation} from '../../../utils/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import { FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent extends FormValidation implements OnInit, OnDestroy {
  public regForm: FormGroup;
  private regSub: Subscription;
  public signupSubmitAttempt = false;

  constructor(
    private formBuilder: FormBuilder,
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
      console.log(formData);
      //this.toastrService.error(error.error['non_field_errors'][0]);
    }
  }

}
