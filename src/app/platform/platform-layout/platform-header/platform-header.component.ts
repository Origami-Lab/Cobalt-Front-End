import {Component, OnInit} from '@angular/core';
import {UserRolesService} from 'src/app/auth/user-role.service';
import {UserRoles} from 'src/app/core/enums/user-roles.enum';
import {MobileNavigationService} from '../mobile-navigation.service';

@Component({
  selector: 'co-platform-header',
  templateUrl: './platform-header.component.html',
  styleUrls: ['./platform-header.component.scss']
})
export class PlatformHeaderComponent implements OnInit {
  constructor(public mobileNavigationService: MobileNavigationService, private userRolesService: UserRolesService) {}

  ngOnInit(): void {}

  checkHiddenMenu(): boolean {
    const userRoleList = this.userRolesService.getRoles();
    const ind = userRoleList.find(el => el === UserRoles.ROLE_ADMIN);
    if (ind) {
      return true;
    }

    return false;
  }
}
