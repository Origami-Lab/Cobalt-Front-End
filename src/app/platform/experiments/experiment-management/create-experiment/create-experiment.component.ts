import {Component, OnInit, ViewChild} from '@angular/core';
import {CoModalLayoutComponent} from '../../../../shared/co-modal/co-modal-layout/co-modal-layout.component';
import {ExperimentsService} from '../../experiments.service';
import {Status} from '../../../../core/enums/status.enum';
import {ApiHttpErrorResponse} from '../../../../core/api-error/api-http-error-response';
import {ApiError} from '../../../../core/api-error/api-error';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Experiment} from '../../models/experiment.interface';
import {User} from 'src/app/platform/teams/model/team.interface';
import {UserRolesService} from 'src/app/auth/user-role.service';

@Component({
  selector: 'co-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.scss']
})
export class CreateExperimentComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;
  loading = false;
  apiError: ApiError;
  userInfo: User;

  constructor(private experimentsService: ExperimentsService, private router: Router, private userService: UserRolesService) {}

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  onFormSubmit(experiment: Partial<Experiment>): void {
    this.loading = true;
    // TODO: change api post data
    experiment.datetime = new Date().toISOString();
    experiment.lastchange = new Date().toISOString();
    experiment.status = Status.RUNNING;
    experiment.author = this.userInfo.name;
    this.experimentsService.createExperiment(experiment).subscribe(
      exp => {
        this.loading = false;
        this.router.navigate(['platform/view/experiments/details', exp.id]).then(() => this.onModalClose());
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
      }
    );
  }
}
