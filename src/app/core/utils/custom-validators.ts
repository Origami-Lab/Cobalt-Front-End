import {AbstractControl} from '@angular/forms';

export type customValidatorType = null | {
  [key: string]: any;
};

export class CustomValidators {
  static validateURL(control: AbstractControl): customValidatorType {
    const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (control && control.value && !control.value.match(urlPattern)) {
      return {invalidUrl: true};
    }
    return null;
  }
  static validateEmail(control: AbstractControl): customValidatorType {
    const urlPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (control && control.value && !control.value.match(urlPattern)) {
      return {invalidEmailAddress: true};
    }
    return null;
  }
}
