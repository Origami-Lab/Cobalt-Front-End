import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {AuthService} from '../auth.service';

@Component({
  selector: 'co-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
  });
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  loginRedirect(): void {
    this.router.navigateByUrl('/auth/login');
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.forgotForm);
    if (!this.forgotForm.valid) {
      return;
    }
    this.loading = true;
    this.authService.forgotPassword(this.forgotForm.value.email).subscribe(() => {
      this.toastr.success('Please check your email to reset your password');
      this.router.navigateByUrl('/auth/login');
      this.loading = false;
    });
  }
}
