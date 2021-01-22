import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AuthTokenService} from 'ngx-api-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static loginCredentials = {
    email: 'admin@admin.com',
    password: 'admin'
  };
  private static loginJwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1aWQiOiIvdXNlcnMvMSIsImlhdCI6MTUxNjIzOTAyMn0.yg_DJ9ReDJS4elmNIzDhN-LyeWUbr8qss32wmaCcwLc';

  constructor(private authToken: AuthTokenService) {}

  login(loginCredentials: any): Observable<any> {
    return of(loginCredentials).pipe(
      switchMap(credentials => {
        if (credentials.email === AuthService.loginCredentials.email && credentials.password === AuthService.loginCredentials.password) {
          return of(true);
        }
        return throwError('Wrong credentials');
      }),
      tap(() => {
        this.authToken.value$.next(AuthService.loginJwtToken);
      })
    );
  }
}
