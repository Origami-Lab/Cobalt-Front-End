import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {UserRolesService} from 'src/app/auth/user-role.service';
import {environment} from 'src/environments/environment';
import {User} from '../../teams/model/team.interface';
import {MobileNavigationService} from '../mobile-navigation.service';
import {HttpClient} from '@angular/common/http';
import {UserForm} from 'src/app/auth/model/auth.interface';

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
    private authorService: AuthService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  iframeURl = '';

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

          this.checkIsHasPadId(rs);
        },
        () => {
          this.loading = false;
        }
      );
  }

  checkIsHasPadId(rs: UserForm) {
    if (!rs.padid) {
      const options = {
        withCredentials: false
      };
      let devMode = '';
      if (!environment.production) {
        devMode = 'dev';
      }
      const params = {
        apikey: environment.apiKey,
        name: rs.name,
        authorMapper: devMode + rs.userid
      };

      this.http.post(`${environment.padUrl}createAuthorIfNotExistsFor`, params, options).subscribe((padResult: any) => {
        this.updateUser(padResult.data.authorID, rs.userid);
      });
    } else {
      this.createSession(rs.padid);
    }
  }

  updateUser(padid: string, userId: number) {
    this.authService.updateUserProfile({padid}, userId).subscribe(() => {
      this.createSession(padid);
    });
  }

  createSession(authorID: string) {
    const isSession = localStorage.getItem('isSession');
    const sessionId = localStorage.getItem('sessionID');
    if (sessionId) {
      this.iframeURl = `https://etherpad.cobalt.origamilab.ch/auth_session?sessionID=${sessionId}`;
    }
    if (isSession) return;
    localStorage.setItem('isSession', 'true');
    const options = {
      withCredentials: false
    };
    const params = {
      groupID: environment.padGroupId,
      authorID,
      validUntil: Date.now() + 3600 * 1000 * 24,
      apikey: environment.apiKey
    };

    this.http.post(`${environment.padUrl}createSession`, params, options).subscribe((rs: any) => {
      localStorage.setItem('sessionID', rs.data.sessionID);
      this.iframeURl = `https://etherpad.cobalt.origamilab.ch/auth_session?sessionID=${rs.data.sessionID}`;
    });
  }
}
