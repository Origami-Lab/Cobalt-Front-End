import {HttpErrorResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {Team, TeamDelete} from '../model/team.interface';
import {TeamsService} from '../teams.service';

@Component({
  selector: 'co-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  @Input()
  teamList: Team[];

  @Input()
  showViewMember = true;

  @Input()
  isShowInvite = false;

  @Input()
  title: string;

  @Output()
  removeEl = new EventEmitter<number | string>();

  apiError: ApiError;
  loading = false;

  constructor(private router: Router, private teamsService: TeamsService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onViewMember(id: string | number): void {
    this.router.navigate(['platform/view/teams/team-members/', id]);
  }

  resetError(): void {
    this.apiError = null;
  }

  onDeleteTeam(deleteEL: TeamDelete): void {
    this.loading = true;
    this.teamsService.deleteTeamById(deleteEL.id).subscribe(
      () => {
        this.loading = false;
        this.toastr.success(`${deleteEL?.name} has been successfully deleted`);
        this.removeEl.emit(deleteEL.id);
        deleteEL.modal.onModalClose();
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.loading = false;
      }
    );
  }
}
