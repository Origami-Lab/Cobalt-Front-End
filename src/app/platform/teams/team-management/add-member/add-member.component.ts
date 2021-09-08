import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {User, User2Team} from '../../model/team.interface';
import {TeamsService} from '../../teams.service';

@Component({
  selector: 'co-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;

  userList: User[];
  loading = false;
  subscription: Subscription;
  teamId: string;

  constructor(private teamsService: TeamsService, private activeRouter: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllUser();
    this.subscription = this.activeRouter.queryParams.subscribe(rs => {
      this.teamId = rs.id;
    });
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  getAllUser(): void {
    this.teamsService
      .getAllUser()
      .pipe()
      .subscribe((rs: User[]) => {
        if (rs) {
          this.getTeamDetailById(this.teamId, rs);
        }
      });
  }

  getTeamDetailById(id: string, userList: User[]): void {
    this.teamsService
      .getTeamsById(id)
      .pipe()
      .subscribe(rs => {
        if (rs.users.length) {
          this.setStatusMember(userList, rs.users);
        } else {
          this.userList = userList;
        }
      });
  }

  setStatusMember(userList: User[], user2Team): void {
    user2Team.map(item => {
      const ind = userList.findIndex(el => el.userid === item.userid);
      if (ind > -1) {
        userList[ind].isAdded = true;
      }
    });
    this.userList = userList;
  }

  addMember(userId: string): void {
    this.loading = true;
    const params: User2Team = {
      teams: `/teams/${this.teamId}`,
      users: `/users/${userId}`
    };
    this.teamsService
      .addMember2Team(params)
      .pipe()
      .subscribe(
        () => {
          this.loading = false;
          this.toastr.success(`Member has been added successfully`);
          this.updateUserList(userId);
        },
        () => {
          this.loading = false;
          this.toastr.error(`Can not add member to Team`);
        }
      );
  }

  updateUserList(userId: string): void {
    const ind = this.userList.findIndex(el => el.userid === userId);
    if (ind > -1) {
      this.userList[ind].isAdded = true;
    }
  }

  removeMember(referenMemberId: string): void {
    // TO DO
  }
}
