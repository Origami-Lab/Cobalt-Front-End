import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
/**
 * Mark the form control and all its children (if deep) as touched, so errors can be shown
 */
export function markFormControlAsTouched(
  abstractControl: FormGroup | FormArray | AbstractControl,
  opts: {deep?: boolean} = {deep: true}
): void {
  abstractControl.markAsTouched({
    onlySelf: true
  });
  if (opts && opts.deep && (abstractControl instanceof FormGroup || abstractControl instanceof FormArray)) {
    for (const controlName of Object.keys(abstractControl.controls)) {
      markFormControlAsTouched(abstractControl.get(controlName));
    }
  }
}
