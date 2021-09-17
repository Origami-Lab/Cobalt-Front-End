import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {UserRolesService} from 'src/app/auth/user-role.service';
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
    const userId = localStorage.getItem('user_id');
    this.authorService
      .getUserById(userId)
      .pipe()
      .subscribe(
        rs => {
          this.userInfo = rs;
          this.userRolesService.setRoles(rs.roles);
          this.userRolesService.setUserInfo(rs);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }
}
