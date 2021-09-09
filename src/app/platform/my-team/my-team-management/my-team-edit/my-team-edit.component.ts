import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {Team} from 'src/app/platform/teams/model/team.interface';
import {TeamsService} from 'src/app/platform/teams/teams.service';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
export interface IQueryParams {
  id: string;
  name: string;
}

@Component({
  selector: 'co-my-team-edit',
  templateUrl: './my-team-edit.component.html',
  styleUrls: ['./my-team-edit.component.scss']
})
export class MyTeamEditComponent implements OnInit, OnDestroy {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;
  loading = false;
  apiError: ApiError;
  subscription: Subscription;
  teamName: string;
  teamId: string;

  constructor(private activeRouter: ActivatedRoute, private teamService: TeamsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.subscription = this.activeRouter.queryParams.subscribe((rs: IQueryParams) => {
      this.teamName = rs.name;
      this.teamId = rs.id;
    });
  }

  getTeamsById(id: string): void {
    this.loading = true;
    this.teamService
      .getTeamsById(id)
      .pipe()
      .subscribe(rs => {
        this.loading = false;
      });
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  onFormSubmit(teamForm: Partial<Team>): void {
    this.loading = true;
    this.teamService.updateTeam(this.teamId, teamForm).subscribe(
      () => {
        this.loading = false;
        this.toastr.success(`Team has been updated successfully`);
        this.modal.isBlocked = false;
        this.onModalClose();
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
