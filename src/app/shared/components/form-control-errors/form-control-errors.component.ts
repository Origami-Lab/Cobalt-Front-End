import {Component, Input, Optional} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'co-form-control-errors',
  templateUrl: './form-control-errors.component.html'
})
export class FormControlErrorsComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('control')
  set formControl(control: AbstractControl) {
    this._formControl = control;
  }

  get formControl(): AbstractControl {
    return this.controlName ? this.controlContainer.control.get(this.controlName) : this._formControl;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('controlName')
  set formControlName(controlName: string) {
    if (!this.controlContainer) {
      throw new Error('This component and the `controlName` option is intended to be used within a formGroup or formArray');
    }
    this.controlName = controlName;
  }

  private _formControl: AbstractControl;
  private controlName: string;

  get showErrors(): string | false {
    if (
      this.formControl &&
      this.formControl.invalid &&
      this.formControl.errors &&
      Object.keys(this.formControl.errors).length &&
      (this.formControl.touched || this.formControl.dirty || (this.formGroupDirective && this.formGroupDirective.submitted))
    ) {
      return Object.keys(this.formControl.errors)[0];
    }
    return false;
  }

  constructor(@Optional() public controlContainer: ControlContainer, @Optional() public formGroupDirective: FormGroupDirective) {}
}
