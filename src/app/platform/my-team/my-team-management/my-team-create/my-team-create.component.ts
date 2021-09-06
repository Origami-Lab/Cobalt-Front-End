import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {Team} from 'src/app/platform/teams/model/team.interface';
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

  loading: boolean = false;
  apiError: ApiError;

  constructor(private teamService: TeamsService, private router: Router) {}

  ngOnInit(): void {}

  onModalClose(): void {
    this.modal.onClose();
  }

  onFormSubmit(myTeamForm: Partial<Team>): void {
    this.loading = true;
    this.teamService.createMyTeam(myTeamForm).subscribe(
      rs => {
        this.loading = false;
        this.router.navigate(['platform/view/my-team/detail', rs.id]).then(() => this.onModalClose());
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.loading = false;
        this.apiError = httpResponseError.error;
      }
    );
  }
}
