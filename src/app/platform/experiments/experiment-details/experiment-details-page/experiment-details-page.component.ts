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
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ExperimentDetailsContentComponent} from '../experiment-details-content/experiment-details-content.component';
import {environment} from 'src/environments/environment';
import md5 from 'md5-hash';

@Component({
  selector: 'co-experiment-details-page',
  templateUrl: './experiment-details-page.component.html',
  styleUrls: ['./experiment-details-page.component.scss']
})
export class ExperimentDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChild('experimentDetailContentRef')
  experimentDetail: ExperimentDetailsContentComponent;
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;
  isExpanded = true;
  experiment: Experiment;
  loading = true;
  deleteExperimentLoading = false;
  apiError: ApiError;
  private subscription: Subscription;
  iframeURL = '';

  constructor(
    private experimentsService: ExperimentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const {experimentId} = this.route.snapshot.params;
    this.experimentsService
      .getExperimentById(experimentId)
      .pipe()
      .subscribe(experiment => {
        this.experiment = experiment;
        this.loading = false;
        if (experiment.padid) {
          this.iframeURL = `https://etherpad.cobalt.origamilab.ch/p/${this.experiment.padid}?showChat=true&userName=${localStorage.getItem(
            'userName'
          )}`;
        } else {
          this.createGroupPad();
        }
      });
    this.subscription = this.experimentsService.events$.pipe(filter(e => e instanceof EditExperiment)).subscribe(({experiment}) => {
      this.experiment = experiment;
    });

    window.addEventListener('message', this.receiveMessage);
  }

  receiveMessage(e: any): void {
    const iframeEl: any = document.getElementById('h_iframe');
    if (e.data === 'expand_chat_iframe') {
      iframeEl.style = 'width:406px; height:306px;';
    }
    if (e.data === 'collapse_chat_iframe') {
      iframeEl.style = 'width:86px; height:82px;';
    }
  }

  createGroupPad(): void {
    const options = {
      withCredentials: false
    };
    const params = {
      groupID: environment.padGroupId,
      padName: 'cobalt-chat' + md5(new Date().getTime().toString()),
      text: '',
      apikey: environment.apiKey
    };
    this.http.post(`${environment.padUrl}createGroupPad`, params, options).subscribe((rs: any) => {
      this.updateExperiments(rs.data.padID);
      this.iframeURL = `https://etherpad.cobalt.origamilab.ch/p/${rs.data.padID}?showChat=true&userName=${localStorage.getItem(
        'userName'
      )}`;
    });
  }

  updateExperiments(padid: string) {
    const {experimentId} = this.route.snapshot.params;
    this.experimentsService.editExperiment({id: experimentId, padid}).subscribe(() => {});
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

  onLeaveRouter(): void {
    this.experimentDetail.onSaveConclusion();
    this.experimentDetail.onSaveProtocol();
  }
}
