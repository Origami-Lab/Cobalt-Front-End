import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {markFormControlAsTouched} from '../../shared/utils/mark-form-control-as-touched';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'co-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {}

  signUp(): void {
    this.router.navigateByUrl('/auth/signup');
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.loginForm);
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      rs => {
        this.router.navigateByUrl('/platform/view/experiments/list');
        this.loading = false;
      },
      () => {
        this.ngZone.run(() => {
          this.loginForm.setErrors({wrongLoginCredentials: true});
        });
        this.loading = false;
      }
    );
  }
}
