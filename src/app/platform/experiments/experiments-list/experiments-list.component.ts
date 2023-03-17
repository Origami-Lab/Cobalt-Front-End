import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';
import {User} from '../../teams/model/team.interface';
import {UserRolesService} from 'src/app/auth/user-role.service';

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
  page = 1;
  userId = '';
  userInfo: User;
  private selectedExperiment: Experiment;
  private subscription: Subscription;

  constructor(
    private experimentsService: ExperimentsService,
    private toastr: ToastrService,
    private activeRouter: ActivatedRoute,
    private authorService: AuthService,
    private router: Router,
    private userRoleService: UserRolesService
  ) {}

  ngOnInit(): void {
    this.subscription = this.experimentsService.events$.pipe(filter(e => e instanceof EditExperiment)).subscribe(({experiment}) => {
      this.applyExperimentChanges(experiment);
    });
    this.subscription = this.activeRouter.queryParams.subscribe(rs => {
      console.log('xxxxx', rs.id);
      this.userId = rs.id;
      if (this.userId) {
        this.getUserById(this.userId);
        this.getExprimentList(this.userId);
      } else {
        this.getExpri();
      }
    });
    this.getExpri();
  }

  getExpri(): void {
    this.userRoleService.getUserId().subscribe(val => {
      if (val && val > -1 && !this.userId) {
        this.getExprimentList(val);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getExprimentList(userId?: string | number): void {
    this.experimentsService.getExperiments(this.page, userId).subscribe((experiments: Experiment[]) => {
      this.loading = false;
      this.experiments = experiments;
    });
  }

  goMyExpriment(): void {
    this.router.navigate([''], {queryParams: {id: ''}}).then(() => {
      this.getExprimentList();
    });
  }

  getUserById(userId): void {
    this.authorService
      .getUserById(userId, false)
      .pipe()
      .subscribe(rs => {
        this.userInfo = rs;
      });
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
