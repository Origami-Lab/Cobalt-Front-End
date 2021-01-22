import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'co-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss']
})
export class FormControlErrorComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('class')
  @HostBinding('class')
  classes = 'text-xs text-danger mt-2 prefix-with-asterisk';
}
