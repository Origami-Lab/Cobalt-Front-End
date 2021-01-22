import {Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {markFormControlAsTouched} from '../../../../shared/utils/mark-form-control-as-touched';
import {Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Experiment} from '../../models/experiment.interface';
import {ApiError} from '../../../../core/api-error/api-error';

@Component({
  selector: 'co-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.scss']
})
export class ExperimentFormComponent implements OnInit, OnDestroy {
  @Input()
  loading = false;
  @Input()
  set experiment(experiment: Experiment) {
    if (!experiment) {
      return;
    }
    this.experimentForm.reset(experiment);
  }
  @Input()
  set apiErrors(errors: ApiError) {
    if (!errors) {
      return;
    }
    this.handleApiErrors(errors);
  }
  @Output()
  submitExperiment = new EventEmitter<Partial<Experiment>>();
  @Output()
  valueChanges = new EventEmitter<boolean>();

  experimentForm = this.fb.group({
    title: [null, Validators.required],
    startDate: [null, Validators.required],
    dueDate: [null, Validators.required]
  });

  private subscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription = this.experimentForm.statusChanges
      .pipe(
        map(() => this.experimentForm.dirty),
        distinctUntilChanged()
      )
      .subscribe(this.valueChanges);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm(): void {
    markFormControlAsTouched(this.experimentForm);

    if (!this.experimentForm.valid) {
      return;
    }

    this.submitExperiment.emit(this.experimentForm.value);
  }

  handleApiErrors(error: ApiError): void {
    // TODO: provide better error handling when api is changed
    this.experimentForm.setErrors({unknownError: true});
  }
}
