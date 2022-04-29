import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {AuthService} from '../auth.service';

@Component({
  selector: 'co-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  resetForm: FormGroup = new FormGroup({});
  errorMessage = '';

  ConfirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {validator: this.ConfirmedValidator('password', 'confirmPassword')}
    );
  }

  ngOnInit(): void {}

  loginRedirect(): void {
    this.router.navigateByUrl('/auth/login');
  }

  get f(): any {
    return this.resetForm.controls;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.resetForm);
    if (!this.resetForm.valid) {
      return;
    }
    this.loading = true;
    const hash: any = this.route.snapshot.queryParamMap;
    console.log('hash', hash);
    const params = {
      password: this.resetForm.value.password,
      hash: hash.params.hash
    };

    this.authService.resetPassword(params).subscribe(
      () => {
        this.toastr.success('Reset Password successfully');
        this.router.navigateByUrl('/auth/login');
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error.errors.message;
        this.ngZone.run(() => {
          this.resetForm.setErrors({wrongLoginCredentials: true});
        });
        this.loading = false;
      }
    );
  }
}
