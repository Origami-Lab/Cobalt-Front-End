import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiHttpService, AuthTokenService} from 'ngx-api-utils';
import {CountUser, LoginCredentials, ResetForm, UserForm} from './model/auth.interface';
import {UserRolesService} from './user-role.service';
import {User} from '../platform/teams/model/team.interface';
import {UserDropDown} from '../platform/manage-users/manage-users.interface';

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
        this.userRolesService.setUserId(rs.data.userid);
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

  createUser(userForm: UserForm): Observable<UserForm> {
    return this.apiHttp.post<UserForm>('/users', userForm);
  }

  signUp(userForm: UserForm): Observable<any> {
    const options = {
      headers: this.apiHttp.headersWithNoAuthorization(),
      withCredentials: false
    };
    return this.apiHttp.post<UserForm>('/user-management/signup', userForm, options);
  }

  forgotPassword(email: string): Observable<any> {
    const options = {
      headers: this.apiHttp.headersWithNoAuthorization(),
      withCredentials: false
    };
    return this.apiHttp.post<UserForm>('/user-management/forgot-password', {email}, options);
  }

  resetPassword(resetForm: ResetForm): Observable<any> {
    const options = {
      headers: this.apiHttp.headersWithNoAuthorization(),
      withCredentials: false
    };
    return this.apiHttp.post<UserForm>('/user-management/reset-password', resetForm, options);
  }

  coutUser(): Observable<CountUser> {
    return this.apiHttp.get<CountUser>('/count_users');
  }

  getUserRoles(): Observable<UserDropDown[]> {
    return this.apiHttp.get<UserDropDown[]>('/user_roles');
  }

  removeUser(userId: string): Observable<any> {
    return this.apiHttp.delete<any>(`/users/${userId}`);
  }

  updateUserProfile(profile: UserForm, userId: number): Observable<any> {
    return this.apiHttp.put(`/users/${userId}`, profile);
  }
}
