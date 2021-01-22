import {Component, OnInit} from '@angular/core';
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
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    markFormControlAsTouched(this.loginForm);

    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/platform/view/experiments/list');
      },
      () => {
        this.loginForm.setErrors({wrongLoginCredentials: true});
      }
    );
  }
}
