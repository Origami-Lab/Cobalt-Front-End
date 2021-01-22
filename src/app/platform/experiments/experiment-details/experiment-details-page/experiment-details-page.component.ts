import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExperimentsService} from '../../experiments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {EditExperiment} from '../../experiment.events';
import {Experiment} from '../../models/experiment.interface';
import {ToastrService} from 'ngx-toastr';
import {ConfirmModalComponent} from '../../../platform-shared/components/confirm-modal/confirm-modal.component';
import {ApiError} from '../../../../core/api-error/api-error';
import {ApiHttpErrorResponse} from '../../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'co-experiment-details-page',
  templateUrl: './experiment-details-page.component.html',
  styleUrls: ['./experiment-details-page.component.scss']
})
export class ExperimentDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;

  isExpanded = true;
  experiment: Experiment;
  loading = true;
  deleteExperimentLoading = false;
  apiError: ApiError;
  private subscription: Subscription;

  constructor(
    private experimentsService: ExperimentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const {experimentId} = this.route.snapshot.params;
    this.experimentsService
      .getExperimentById(experimentId)
      .pipe()
      .subscribe(experiment => {
        this.experiment = experiment;
        this.loading = false;
      });
    this.subscription = this.experimentsService.events$.pipe(filter(e => e instanceof EditExperiment)).subscribe(({experiment}) => {
      this.experiment = experiment;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNavToggle(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }

  onConfirmModalOpen(): void {
    this.confirmModal.openModal(this.experiment.title);
  }

  onDeleteConfirm(): void {
    this.deleteExperimentLoading = true;
    this.experimentsService.deleteExperiment(this.experiment.id).subscribe(
      () => {
        this.deleteExperimentLoading = false;
        this.toastr.success(`${this.experiment.title} has been successfully deleted`);
        this.confirmModal.onModalClose();
        this.router.navigate(['/platform/view/experiments/list']);
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.deleteExperimentLoading = false;
      }
    );
  }
}
