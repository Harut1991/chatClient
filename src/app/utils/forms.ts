import {FormGroup} from '@angular/forms';

export abstract class FormValidation {

  public isFieldValid(form: FormGroup, field: string, submitted: string): boolean {
    return (form.get(field).invalid && this[submitted]);
  }

  public displayFieldCss(form: FormGroup, field: string, submitted: string): { [key: string]: boolean } {
    return {
      invalid: this.isFieldValid(form, field, submitted)
    };
  }
}
