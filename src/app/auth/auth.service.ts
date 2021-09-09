import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiHttpService, AuthTokenService} from 'ngx-api-utils';
import {LoginCredentials} from './model/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static loginJwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1aWQiOiIvdXNlcnMvMSIsImlhdCI6MTUxNjIzOTAyMn0.yg_DJ9ReDJS4elmNIzDhN-LyeWUbr8qss32wmaCcwLc';
  constructor(private authToken: AuthTokenService, private apiHttp: ApiHttpService) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    this.authToken.value$.next(AuthService.loginJwtToken);
    return this.apiHttp.post('/authentication_token', loginCredentials).pipe(
      tap(rs => {
        this.authToken.value$.next(rs.token);
        localStorage.setItem('user_id', rs.data.userid);
      })
    );
  }

  getUserById(): Observable<any> {
    const userId = localStorage.getItem('user_id');
    return this.apiHttp.get<any>(`/users/${userId}`);
  }
}
