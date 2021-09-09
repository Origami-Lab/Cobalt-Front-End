import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {Team, User2Team} from 'src/app/platform/teams/model/team.interface';
import {TeamsService} from 'src/app/platform/teams/teams.service';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
@Component({
  selector: 'co-my-team-create',
  templateUrl: './my-team-create.component.html',
  styleUrls: ['./my-team-create.component.scss']
})
export class MyTeamCreateComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;

  loading = false;
  apiError: ApiError;

  constructor(private teamService: TeamsService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onModalClose(): void {
    this.modal.onClose();
  }

  onFormSubmit(myTeamForm: Partial<Team>): void {
    this.loading = true;
    this.teamService.createMyTeam(myTeamForm).subscribe(
      rs => {
        this.addMember(rs.id);
        this.loading = false;
        this.toastr.success(`Team has been create successfully`);
        this.onModalClose();
        // this.router.navigate(['platform/view/my-team/detail', rs.id]).then(() => this.onModalClose());
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.loading = false;
        this.apiError = httpResponseError.error;
      }
    );
  }

  addMember(teamId: string): void {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return;
    }
    const params: User2Team = {
      teams: `/teams/${teamId}`,
      users: `/users/${userId}`
    };
    this.teamService
      .addMember2Team(params)
      .pipe()
      .subscribe(() => {});
  }
}
