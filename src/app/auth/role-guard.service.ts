import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {UserRolesService} from './user-role.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(private userRolesService: UserRolesService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return route.data.roles.some(ai => this.userRolesService.getRoles().includes(ai));
  }
}
