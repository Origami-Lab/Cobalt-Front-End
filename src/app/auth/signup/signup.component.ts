import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {AuthService} from '../auth.service';

@Component({
  selector: 'co-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;
  signUpForm: FormGroup = new FormGroup({});
  errorMessage = '';

  ConfirmedValidator(controlName: string, matchingControlName: string) {
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
    private toastr: ToastrService
  ) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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
    return this.signUpForm.controls;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.signUpForm);
    if (!this.signUpForm.valid) {
      return;
    }
    this.loading = true;
    const name = this.signUpForm.value.email.split('@');
    const params = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      name: name[0] || ''
    };
    this.authService.signUp(params).subscribe(
      () => {
        this.toastr.success('Registration successfully');
        this.router.navigateByUrl('/auth/login');
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error.errors.message;
        this.ngZone.run(() => {
          this.signUpForm.setErrors({wrongLoginCredentials: true});
        });
        this.loading = false;
      }
    );
  }
}
