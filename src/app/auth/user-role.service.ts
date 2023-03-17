import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../platform/teams/model/team.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRoles: string[] = [];
  userInfo: User;
  private userId = new BehaviorSubject<number>(-1);

  constructor() {}

  setUserId(userId: number) {
    this.userId.next(userId);
  }

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

  getUserId() {
    return this.userId.asObservable();
  }
}
