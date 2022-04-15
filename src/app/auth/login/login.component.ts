import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {markFormControlAsTouched} from '../../shared/utils/mark-form-control-as-touched';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.loginForm);
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      rs => {
        this.getUserInfo(rs.data.userid);
        return;
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

  getUserInfo(id: number) {
    this.authService.getUserById(id).subscribe(rs => {
      const options = {
        withCredentials: false
      };
      const params = {
        apikey: environment.apiKey,
        name: 'Admin',
        authorMapper: 'dev4'
      };
      this.http.post(`https://etherpad.cobalt.origamilab.ch/createAuthorIfNotExistsFor/`, params, options).subscribe(() => {
        console.log('okay baby');
      });
    });
  }

  createSection() {}
}
