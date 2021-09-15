import {Injectable} from '@angular/core';
import {User} from '../platform/teams/model/team.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRoles: string[] = [];
  userInfo: User;

  constructor() {}

  setRoles(Roles: string[]): void {
    this.userRoles = Roles.slice(0);
  }

  setUserInfo(user: User): void {
    this.userInfo = user;
  }

  getRoles(): string[] {
    return this.userRoles;
  }

  getUserInfo(): User {
    return this.userInfo;
  }
}
