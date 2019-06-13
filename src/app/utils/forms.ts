import {FormGroup} from '@angular/forms';


/**
 * @description Form validation tools
 * @export
 * @abstract
 * @class FormValidation
 */
export abstract class FormValidation {

  protected resetForm(form: FormGroup, submitted: string): void {
    form.reset();
    this[submitted] = false;
  }

  /**
   * @description Checks if the field of given form is invalid.
   * @param {FormGroup} form
   * @param {string} field
   * @param {string} submitted
   * @returns {boolean}
   * @memberof FormValidation
   */
  public isFieldValid(form: FormGroup, field: string, submitted: string): boolean {
    return (form.get(field).invalid && this[submitted]);
  }

  public displayFieldCss(form: FormGroup, field: string, submitted: string): { [key: string]: boolean } {
    return {
      'invalid': this.isFieldValid(form, field, submitted)
    };
  }
}
