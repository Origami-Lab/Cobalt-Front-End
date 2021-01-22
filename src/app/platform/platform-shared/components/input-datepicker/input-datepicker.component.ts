import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'co-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss']
})
export class InputDatepickerComponent implements OnInit {
  @Input()
  controlName: string;
  @Input()
  label: string;
  @Input()
  placeholder = '';
  @Input()
  config = {dateInputFormat: 'YYYY-MM-DD', containerClass: 'theme-dark-blue', returnFocusToInput: true};

  get fromGroup(): FormGroup {
    return this.formGroupDirective.form;
  }

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {}
}
