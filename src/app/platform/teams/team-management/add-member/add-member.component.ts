import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BsDropdownDirective} from 'ngx-bootstrap/dropdown';
import {ToastrService} from 'ngx-toastr';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {MemberShortInfo, Team, User, User2Team, UserTeam} from '../../model/team.interface';
import {TeamsService, UserWithTeam} from '../../teams.service';

export interface UserList extends User {
  isInvite?: boolean;
}
@Component({
  selector: 'co-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;

  @ViewChild('dropdown') dropdown: BsDropdownDirective;

  userList: UserList[];
  loading = false;
  subscription: Subscription;
  teamId: string;
  teamInfo: Team;
  totalMember = 0;
  memberAvartarList: Array<MemberShortInfo> = [];
  inputChange = new Subject<string>();
  keySearch = '';
  inputLoading = false;
  userInvitedList: User[];

  constructor(private teamsService: TeamsService, private activeRouter: ActivatedRoute, private toastr: ToastrService) {
    this.inputChange.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.getUser(value);
    });
  }

  ngOnInit(): void {
    this.subscription = this.activeRouter.queryParams.subscribe(rs => {
      this.teamId = rs.id;
      this.getTeamDetailById(rs.id);
    });
  }

  searchDebounce($event: string): void {
    this.inputLoading = true;
    this.inputChange.next($event);
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  getUser(keySearch: string): void {
    this.teamsService
      .getUser(keySearch)
      .pipe(
        finalize(() => {
          this.inputLoading = false;
        })
      )
      .subscribe(rs => {
        this.filterUserUnInvite(rs.body);
        this.dropdown.show();
      });
  }

  filterUserUnInvite(user: UserList[]): void {
    this.userList = user.map(item => {
      const userInfo = this.teamInfo.users.find(el => {
        return el.userid === item.userid;
      });
      if (!userInfo) {
        item.isInvite = false;
      } else {
        item.isInvite = true;
      }
      return item;
    });
  }

  getTeamDetailById(id: string): void {
    this.teamsService
      .getTeamsById(id)
      .pipe()
      .subscribe((rs: Team) => {
        this.teamInfo = rs;
        this.userInvitedList = rs.users;
        this.totalMember = rs.users.length;
        this.addItemToMemberList(rs);
      });
  }

  addItemToMemberList(team: Team): void {
    team?.users.map((el, index) => {
      const info = {
        avatar: el.avatar,
        name: el.name
      };
      if (index < 3) {
        this.memberAvartarList.push(info);
      }
    });
  }

  showOtherMember(totalMember: number): string {
    let mes = '';
    let suffixes = '';
    if (totalMember > 2) {
      if (totalMember > 3) {
        suffixes = 's';
      }
      mes = `and ${totalMember - 1} other${suffixes}`;
    }
    return mes;
  }

  addMember(user: User): void {
    this.loading = true;
    const userWithTeam: UserWithTeam = user;
    userWithTeam.teamId = this.teamId;
    const params: User2Team = {
      teams: `/teams/${this.teamId}`,
      users: `/users/${user.userid}`
    };
    this.teamsService
      .addMember2Team(params, userWithTeam)
      .pipe()
      .subscribe(
        () => {
          this.totalMember++;
          this.loading = false;
          this.toastr.success(`Member has been added successfully`);
          this.updateUserMember(user);
          this.userInvitedList.unshift(user);
          this.userInvitedList = [...this.userInvitedList];
        },
        () => {
          this.loading = false;
          this.toastr.error(`Can not add member to Team`);
        }
      );
  }

  updateUserMember(user: User): void {
    if (this.memberAvartarList.length < 3) {
      this.memberAvartarList.push({name: user.name, avatar: user.avatar});
    }
  }

  inviteUser(user: UserList): void {
    this.keySearch = '';
    if (user.isInvite) {
      return;
    }
    this.addMember(user);
  }

  stopPropagation(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
  }
}
