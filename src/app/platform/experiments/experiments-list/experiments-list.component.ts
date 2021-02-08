import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExperimentsService} from '../experiments.service';
import {Experiment} from '../models/experiment.interface';
import {ExperimentsView} from '../models/experiments-view.enum';
import {filter} from 'rxjs/operators';
import {ApiHttpErrorResponse} from '../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {ApiError} from '../../../core/api-error/api-error';
import {ToastrService} from 'ngx-toastr';
import {EditExperiment} from '../experiment.events';
import {Subscription} from 'rxjs';

@Component({
  selector: 'co-experiments-list',
  templateUrl: './experiments-list.component.html',
  styleUrls: ['./experiments-list.component.scss']
})
export class ExperimentsListComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;

  experiments: Experiment[] = [];
  pastExperiments: Experiment[] = [];
  ExperimentsView = ExperimentsView;
  loading = true;
  view: ExperimentsView = ExperimentsView.GRID;
  deleteExperimentLoading = false;
  apiError: ApiError;
  private selectedExperiment: Experiment;
  private subscription: Subscription;

  constructor(private experimentsService: ExperimentsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.experimentsService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.loading = false;
      this.experiments = experiments;
    });
    this.subscription = this.experimentsService.events$.pipe(filter(e => e instanceof EditExperiment)).subscribe(({experiment}) => {
      this.applyExperimentChanges(experiment);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  switchView(view: ExperimentsView): void {
    this.view = view;
  }

  onConfirmModalOpen(experiment: Experiment): void {
    this.selectedExperiment = experiment;
    this.confirmModal.openModal(experiment.title);
  }

  onDeleteConfirm(): void {
    this.deleteExperimentLoading = true;
    this.experimentsService.deleteExperiment(this.selectedExperiment.id).subscribe(
      () => {
        this.deleteExperimentLoading = false;
        this.toastr.success(`${this.selectedExperiment.title} has been successfully deleted`);
        this.confirmModal.onModalClose();
        this.removeDeletedExperiment(this.selectedExperiment.id);
        this.selectedExperiment = null;
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.deleteExperimentLoading = false;
      }
    );
  }

  removeDeletedExperiment(experimentId: number): void {
    this.experiments = this.experiments.filter(experiment => experiment.id !== experimentId);
  }

  applyExperimentChanges(experiment: Experiment): void {
    this.experiments = this.experiments.map(exp => {
      if (exp.id === experiment.id) {
        exp = experiment;
      }
      return exp;
    });
  }
}
