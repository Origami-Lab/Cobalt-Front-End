import {SelectedDate} from '../models/selected-date.interface';
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';
import {JournalsService} from '../journals.service';
import {Experiment} from '../../experiments/models/experiment.interface';
import {Page} from '../models/page.interface';
import {PageDefaultParams} from '../models/page-default-params.interface';
import {ApiError} from '../../../core/api-error/api-error';
import {ApiHttpErrorResponse} from '../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {ExperimentsService} from '../../experiments/experiments.service';
import {ToastrService} from 'ngx-toastr';
import {EditExperiment} from '../../experiments/experiment.events';

@Component({
  selector: 'co-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss']
})
export class JournalListComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;
  experiment: Experiment;
  deleteExperimentLoading = false;
  apiError: ApiError;
  journals: Experiment[];
  page: Page;
  searchPhrase: string;
  selectedDate: SelectedDate;
  loading = true;
  private defaultParams: PageDefaultParams = {
    searchPhrase: null,
    selectedDate: null,
    pageNumber: 0
  };
  private queryParams$ = new BehaviorSubject<PageDefaultParams>(this.defaultParams);
  private subscriptions: Subscription = new Subscription();

  constructor(private journalsService: JournalsService, private experimentsService: ExperimentsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.queryParams$
        .pipe(
          tap(() => (this.loading = true)),
          switchMap(params => {
            return this.journalsService.getExperiments(params.pageNumber + 1, params.searchPhrase, params.selectedDate);
          })
        )
        .subscribe((journals: Experiment[]) => {
          this.journals = journals;
          this.loading = false;
        })
    );
    this.subscriptions.add(
      this.experimentsService.events$.pipe(filter(e => e instanceof EditExperiment)).subscribe(({experiment}) => {
        this.getExperimentPage();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onPageChange(page: Page): void {
    this.page = page;
    this.getExperimentPage();
  }

  onSearchPhrase(phrase: string): void {
    if (this.page) {
      this.page.pageNumber = 0;
    }
    this.searchPhrase = phrase.toLowerCase().trim();
    this.getExperimentPage();
  }

  onDateSelected(selectedDate: SelectedDate): void {
    if (this.page) {
      this.page.pageNumber = 0;
    }
    this.selectedDate = selectedDate;

    if (!selectedDate) {
      this.searchPhrase = null;
    }

    this.getExperimentPage();
  }

  getExperimentPage(): void {
    this.queryParams$.next({
      searchPhrase: this.searchPhrase,
      selectedDate: this.selectedDate,
      pageNumber: this.page ? this.page.pageNumber : this.defaultParams.pageNumber
    });
  }

  onConfirmModalOpen(experiment: Experiment): void {
    this.experiment = experiment;
    this.confirmModal.openModal(experiment.title);
  }

  onDeleteConfirm(): void {
    this.deleteExperimentLoading = true;
    this.experimentsService.deleteExperiment(this.experiment.id).subscribe(
      () => {
        this.deleteExperimentLoading = false;
        this.toastr.success(`${this.experiment.title} has been successfully deleted`);
        this.confirmModal.onModalClose();
        this.experiment = null;
        this.getExperimentPage();
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.deleteExperimentLoading = false;
      }
    );
  }
}
