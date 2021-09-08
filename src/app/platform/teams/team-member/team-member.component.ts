import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {Team, TeamDelete} from '../model/team.interface';
import {TeamsService} from '../teams.service';

@Component({
  selector: 'co-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  apiError: ApiError;
  team: Team;
  loading = false;
  constructor(private teamsServer: TeamsService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    const {id} = this.route.snapshot.params;
    this.getTeamDetailById(id);
  }

  getTeamDetailById(id: string): void {
    this.loading = true;
    this.teamsServer
      .getTeamsById(id)
      .pipe()
      .subscribe(
        rs => {
          this.team = rs;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  resetError(): void {
    this.apiError = null;
  }

  onViewMember(id): void {
    // TO DO
  }

  onDeleteTeam(deleteEL: TeamDelete): void {
    this.loading = true;
    this.teamsServer
      .removeMember2Team(deleteEL.id as string)
      .pipe()
      .subscribe(
        () => {
          this.loading = false;
          deleteEL.modal.onModalClose();
          this.toastr.success(`${deleteEL?.name} has been successfully deleted`);
          this.removeDeletedUser2Team(deleteEL.id);
        },
        (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
          this.apiError = httpResponseError.error;
          this.loading = false;
        }
      );
  }

  removeDeletedUser2Team(userId: number | string): void {
    this.team.users = this.team.users.filter(user => user.id !== userId);
  }
}
