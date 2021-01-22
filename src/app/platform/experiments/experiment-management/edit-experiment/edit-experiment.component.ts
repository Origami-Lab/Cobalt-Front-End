import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CoModalLayoutComponent} from '../../../../shared/co-modal/co-modal-layout/co-modal-layout.component';
import {Experiment} from '../../models/experiment.interface';
import {ApiHttpErrorResponse} from '../../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {ExperimentsService} from '../../experiments.service';
import {ApiError} from '../../../../core/api-error/api-error';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'co-edit-experiment',
  templateUrl: './edit-experiment.component.html',
  styleUrls: ['./edit-experiment.component.scss']
})
export class EditExperimentComponent implements OnInit, OnDestroy {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;

  experiment: Experiment;
  loading = false;
  isBlocked = false;
  apiError: ApiError;
  subscription: Subscription;

  constructor(private experimentsService: ExperimentsService, private toastr: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((experiment: Experiment) => {
      this.experiment = experiment;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  isFormDirty(): void {
    this.isBlocked = true;
  }

  onFormSubmit(experiment: Partial<Experiment>): void {
    this.loading = true;
    experiment = {...this.experiment, ...experiment};

    this.experimentsService.editExperiment(experiment).subscribe(
      () => {
        this.loading = false;
        this.toastr.success(`Experiment has been updated successfully`);
        this.modal.isBlocked = false;
        this.onModalClose();
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
      }
    );
  }
}
