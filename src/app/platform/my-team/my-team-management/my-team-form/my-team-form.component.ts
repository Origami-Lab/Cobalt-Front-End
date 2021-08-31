import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {CustomValidators} from 'src/app/core/utils/custom-validators';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {MyTeam} from '../../models/my-team.interface';

@Component({
  selector: 'co-my-team-form',
  templateUrl: './my-team-form.component.html',
  styleUrls: ['./my-team-form.component.scss']
})
export class MyTeamFormComponent implements OnInit, OnDestroy {
  @Input()
  set myTeam(myTeam: MyTeam) {
    if (!myTeam) {
      return;
    }
    this.myTeamForm.reset(myTeam);
  }

  @Output()
  valueChanges = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {}

  @Output()
  submitMyTeam = new EventEmitter<Partial<MyTeam>>();

  private subscription: Subscription;
  myTeamForm = this.fb.group({
    name: [null, Validators.required],
    deletableXp: [false],
    linkName: [null, Validators.required],
    linkHref: [null, [Validators.required, CustomValidators.validateURL]],
    datetime: [null, Validators.required],
    stamplogin: [null, Validators.required],
    stamppass: [null, Validators.required],
    stampprovider: [null, Validators.required],
    stampcert: [null, Validators.required],
    stamphash: [null, Validators.required],
    orgid: [null, Validators.required],
    publicDb: [false],
    forceCanread: [null, Validators.required],
    forceCanwrite: [null, Validators.required],
    doForceCanread: [false],
    doForceCanwrite: [false],
    visible: [false]
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
}
