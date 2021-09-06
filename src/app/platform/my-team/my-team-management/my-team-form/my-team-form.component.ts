import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ApiError} from 'src/app/core/api-error/api-error';
import {Team} from 'src/app/platform/teams/model/team.interface';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';

@Component({
  selector: 'co-my-team-form',
  templateUrl: './my-team-form.component.html',
  styleUrls: ['./my-team-form.component.scss']
})
export class MyTeamFormComponent implements OnInit, OnDestroy {
  @Input()
  loading: boolean;

  @Input()
  set apiError(errors: ApiError) {
    if (!errors) {
      return;
    }
    this.handleApiErrors(errors);
  }

  @Output()
  valueChanges = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {}

  @Output()
  submitMyTeam = new EventEmitter<Partial<Team>>();

  private subscription: Subscription;
  myTeamForm = this.fb.group({
    name: [null, Validators.required]
  });

  ngOnInit(): void {
    this.subscription = this.myTeamForm.statusChanges
      .pipe(
        map(() => this.myTeamForm.dirty),
        distinctUntilChanged()
      )
      .subscribe(this.valueChanges);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  submitForm(): void {
    markFormControlAsTouched(this.myTeamForm);

    if (!this.myTeamForm.valid) {
      return;
    }
    this.submitMyTeam.emit(this.myTeamForm.value);
  }

  handleApiErrors(error): void {
    this.myTeamForm.setErrors({unknownError: true});
  }
}
