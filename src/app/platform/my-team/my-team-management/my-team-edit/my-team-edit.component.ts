import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ApiError} from 'src/app/core/api-error/api-error';
import {Team} from 'src/app/platform/teams/model/team.interface';
import {TeamsService} from 'src/app/platform/teams/teams.service';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
export interface IQueryParams {
  id: string;
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

  constructor(private activeRouter: ActivatedRoute, private teamService: TeamsService) {}

  ngOnInit(): void {
    this.subscription = this.activeRouter.queryParams.subscribe((rs: IQueryParams) => {
      this.getTeamsById(rs.id);
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

  onFormSubmit(myTeamForm: Partial<Team>): void {
    console.log('update', myTeamForm);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
