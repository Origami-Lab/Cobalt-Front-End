import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRoles: string[] = [];

  constructor() {}

  setRoles(Roles: string[]): void {
    this.userRoles = Roles.slice(0);
  }

  getRoles(): string[] {
    return this.userRoles;
  }
}
