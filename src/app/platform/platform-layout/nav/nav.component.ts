import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {UserRolesService} from 'src/app/auth/user-role.service';
import {UserRoles} from 'src/app/core/enums/user-roles.enum';
import {MobileNavigationService} from '../mobile-navigation.service';

@Component({
  selector: 'co-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAdmin = false;
  isExpanded = false;
  constructor(public mobileNavigationService: MobileNavigationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkHiddenMenu();
  }

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  checkHiddenMenu(): void {
    this.authService.userEvent$.pipe().subscribe(rs => {
      const userRoleList = rs.roles;
      const ind = userRoleList.find(el => el === UserRoles.ROLE_ADMIN);
      if (ind) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }
}
