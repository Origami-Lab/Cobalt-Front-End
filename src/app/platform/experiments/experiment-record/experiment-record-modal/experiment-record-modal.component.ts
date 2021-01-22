import {Component, OnInit, ViewChild} from '@angular/core';
import {CoModalLayoutComponent} from '../../../../shared/co-modal/co-modal-layout/co-modal-layout.component';
import {ExperimentDetailsService} from '../../experiment-details/experiment-details.service';
import {forkJoin, Subscription} from 'rxjs';
import {Conclusion} from '../../experiment-details/models/conclusion.interface';
import {Note} from '../../experiment-details/models/note.interface';
import {Protocol} from '../../experiment-details/models/protocol.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {Experiment} from '../../models/experiment.interface';
import {TextEditorContentType} from '../../../platform-shared/components/text-editor/text-editor-content.type';
import {DomSanitizer} from '@angular/platform-browser';
import {ApiHttpErrorResponse} from '../../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from '../../../../core/api-error/api-error';
import {ExperimentsService} from '../../experiments.service';
import {ConfirmModalComponent} from '../../../platform-shared/components/confirm-modal/confirm-modal.component';
import {Link} from '../../experiment-details/models/link.interface';

@Component({
  selector: 'co-experiment-record-modal',
  templateUrl: './experiment-record-modal.component.html',
  styleUrls: ['./experiment-record-modal.component.scss']
})
export class ExperimentRecordModalComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modalLayout: CoModalLayoutComponent;
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;
  experiment: Experiment;
  protocol: TextEditorContentType;
  conclusion: TextEditorContentType;
  notes: Note[];
  links: Link[];
  loading = true;
  deleteExperimentLoading = false;
  apiError: ApiError;

  private subscription: Subscription;

  constructor(
    private toastr: ToastrService,
    private experimentDetailsService: ExperimentDetailsService,
    private experimentsService: ExperimentsService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitized: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        filter(({experimentId}) => !!experimentId),
        switchMap(({experimentId}: {[key: string]: number}) =>
          forkJoin([
            this.experimentsService.getExperimentById(experimentId),
            this.experimentDetailsService.getProtocol(experimentId),
            this.experimentDetailsService.getConclusion(experimentId),
            this.experimentDetailsService.getNotes(experimentId),
            this.experimentDetailsService.getLinks(experimentId)
          ])
        )
      )
      .subscribe(([experiment, protocol, conclusions, notes, links]: [Experiment, Protocol, Conclusion, Note[], Link[]]) => {
        this.experiment = experiment;
        this.protocol = protocol && this.sanitized.bypassSecurityTrustHtml(protocol?.protocol as string);
        this.conclusion = conclusions && this.sanitized.bypassSecurityTrustHtml(conclusions?.conclusions as string);
        this.notes = notes;
        this.links = links;
        this.loading = false;
      });
  }

  onModalClose(): void {
    this.modalLayout.onClose();
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
        this.router.navigateByUrl('/platform/view/experiments/list');
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.deleteExperimentLoading = false;
      }
    );
  }

  onEdit(): void {
    this.router.navigate(['/platform/view/experiments/details', this.experiment.id]).then(() => this.onModalClose());
  }
}
