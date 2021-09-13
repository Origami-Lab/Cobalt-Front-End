import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {UserRolesService} from 'src/app/auth/user-role.service';
import {UserRoles} from 'src/app/core/enums/user-roles.enum';
import {User} from '../../teams/model/team.interface';
import {MobileNavigationService} from '../mobile-navigation.service';

@Component({
  selector: 'co-platform-header',
  templateUrl: './platform-header.component.html',
  styleUrls: ['./platform-header.component.scss']
})
export class PlatformHeaderComponent implements OnInit {
  isAdmin = false;
  userInfo: User;
  loading = false;
  constructor(
    public mobileNavigationService: MobileNavigationService,
    private userRolesService: UserRolesService,
    private authorService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.loading = true;
    this.authorService
      .getUserById()
      .pipe()
      .subscribe(
        rs => {
          this.userInfo = rs;
          this.userRolesService.setRoles(rs.roles);
          this.checkHiddenMenu();
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  checkHiddenMenu(): void {
    const userRoleList = this.userRolesService.getRoles();
    const ind = userRoleList.find(el => el === UserRoles.ROLE_ADMIN);
    if (ind) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
