import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {BreadcrumbConfig} from '../../platform-shared/components/breadcrumb/breadcrumb-config.interface';
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
  teamId: string;
  breadcrumbConfig: BreadcrumbConfig[];
  constructor(private teamsServer: TeamsService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    const {id} = this.route.snapshot.params;
    this.teamId = id;
    this.getTeamDetailById(id);
    this.generateBreadcrumbConfig();
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
    this.router.navigate(['/platform/view/experiments/list'], {queryParams: {id}});
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
          this.removeDeletedUser2Team(deleteEL.userId as number);
        },
        (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
          this.apiError = httpResponseError.error;
          this.loading = false;
        }
      );
  }

  removeDeletedUser2Team(userId: number): void {
    this.team.users = this.team.users.filter(user => user.userid !== userId);
    if (this.team.users.length === 0 || userId.toString() === localStorage.getItem('user_id')) {
      this.router.navigate(['/platform/view/my-team/list']);
    }
  }

  generateBreadcrumbConfig(): void {
    const teamUrlInfo: BreadcrumbConfig = JSON.parse(localStorage.getItem('team_url'));
    this.breadcrumbConfig = [
      {...teamUrlInfo},
      {
        label: 'Team Members',
        path: ['teams', 'team-members', String(this.teamId)]
      }
    ];
  }
}
