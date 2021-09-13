import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  userRoles: string[] = [];

  constructor() {}

  setRoles(Roles: string[]) {
    this.userRoles = Roles.slice(0);
  }

  getRoles() {
    return this.userRoles;
  }
}
