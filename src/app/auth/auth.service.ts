import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiHttpService, AuthTokenService} from 'ngx-api-utils';
import {LoginCredentials} from './model/auth.interface';
import {UserRolesService} from './user-role.service';
import {User} from '../platform/teams/model/team.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authToken: AuthTokenService, private apiHttp: ApiHttpService, private userRolesService: UserRolesService) {}
  readonly userEvent$ = new Subject<User>();

  login(loginCredentials: LoginCredentials): Observable<any> {
    const options = {
      headers: this.apiHttp.headersWithNoAuthorization(),
      withCredentials: false
    };
    return this.apiHttp.post('/authentication_token', loginCredentials, options).pipe(
      tap(rs => {
        this.userRolesService.setRoles(rs.data.roles);
        this.authToken.value$.next(rs.token);
        localStorage.setItem('user_id', rs.data.userid);
      })
    );
  }

  getUserById(userId?: string | number, isUpdate: boolean = true): Observable<any> {
    return this.apiHttp.get<any>(`/users/${userId}`).pipe(
      tap(rs => {
        if (isUpdate) {
          (this.userEvent$ as Subject<User>).next(rs);
        }
      })
    );
  }
}
