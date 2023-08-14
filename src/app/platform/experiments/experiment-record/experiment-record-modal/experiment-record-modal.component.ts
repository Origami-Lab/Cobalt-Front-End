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
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from '../../../../core/api-error/api-error';
import {ExperimentsService} from '../../experiments.service';
import {ConfirmModalComponent} from '../../../platform-shared/components/confirm-modal/confirm-modal.component';
import {Link} from '../../experiment-details/models/link.interface';
import {Attachment} from '../../experiment-details/models/attachment.interface';
import {environment} from 'src/environments/environment';
import {DatatablesRenderer} from '../../../../shared/datatables-renderer.js';
import {asBlob} from 'html-docx-js-typescript';
import {saveAs} from 'file-saver';

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
  attachments: Attachment[];
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
    private sanitized: DomSanitizer,
    private http: HttpClient
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
            this.experimentDetailsService.getLinks(experimentId),
            this.experimentDetailsService.getFiles(experimentId)
          ])
        )
      )
      .subscribe(
        ([experiment, protocol, conclusions, notes, links, attachments]: [
          Experiment,
          Protocol,
          Conclusion,
          Note[],
          Link[],
          Attachment[]
        ]) => {
          this.experiment = experiment;
          this.protocol = protocol && this.sanitized.bypassSecurityTrustHtml(protocol?.protocol as string);
          this.conclusion = conclusions && this.sanitized.bypassSecurityTrustHtml(conclusions?.conclusions as string);
          this.notes = notes;
          this.links = links;
          this.attachments = attachments;
          this.loading = false;

          if (!protocol.protocol && protocol.padid) {
            this.getHTML(protocol.padid).then(rs => {
              let finalHtml = '';
              let safeHtml;
              if (rs.indexOf('data-tables') !== -1) {
                const renderer = new DatatablesRenderer.Renderer();
                const parts = rs.split('<br>');
                const count = parts.length;
                for (let i = 0; i < count; i++) {
                  if (parts[i].indexOf('data-tables') === -1) {
                    finalHtml += parts[i] + '<br>';
                  } else {
                    let partContent = parts[i];
                    if (partContent.indexOf('<table class=') !== -1) {
                      const divContent = document.createElement('div');
                      divContent.innerHTML = partContent;
                      partContent = divContent.innerText;
                    }
                    partContent = partContent.replace(/(&quot;)/g, '"');
                    let isLastRow = false;
                    const j = i + 1;
                    if (parts[j].indexOf('payload') === -1) {
                      isLastRow = true;
                    }
                    partContent = renderer.getLineHtml(partContent, isLastRow);
                    finalHtml += partContent;
                  }
                }
                safeHtml = this.sanitized.bypassSecurityTrustHtml(finalHtml);
              } else {
                safeHtml = rs;
              }
              this.protocol = safeHtml;
            });
          }

          if (!conclusions.conclusions && conclusions.padid) {
            this.getHTML(conclusions.padid).then(rs => {
              let finalHtml = '';
              let safeHtml;
              if (rs.indexOf('data-tables') !== -1) {
                const renderer = new DatatablesRenderer.Renderer();
                const parts = rs.split('<br>');
                const count = parts.length;
                for (let i = 0; i < count; i++) {
                  if (parts[i].indexOf('data-tables') === -1) {
                    finalHtml += parts[i] + '<br>';
                  } else {
                    let partContent = parts[i];
                    if (partContent.indexOf('<table class=') !== -1) {
                      const divContent = document.createElement('div');
                      divContent.innerHTML = partContent;
                      partContent = divContent.innerText;
                    }
                    partContent = partContent.replace(/(&quot;)/g, '"');
                    let isLastRow = false;
                    const j = i + 1;
                    if (parts[j].indexOf('payload') === -1) {
                      isLastRow = true;
                    }
                    partContent = renderer.getLineHtml(partContent, isLastRow);
                    finalHtml += partContent;
                  }
                }
                safeHtml = this.sanitized.bypassSecurityTrustHtml(finalHtml);
              } else {
                safeHtml = rs;
              }
              this.conclusion = safeHtml;
            });
          }
        }
      );
  }

  async getText(padID: string): Promise<string> {
    let contentText = '';
    const options = {
      withCredentials: false
    };

    const params = {
      padID,
      apikey: environment.apiKey
    };
    const data: any = await this.http.post(`${environment.padUrl}getText`, params, options).toPromise();
    contentText = data.data.text;
    return contentText;
  }

  async getHTML(padID: string): Promise<string> {
    let contentText = '';
    const options = {
      withCredentials: false
    };

    const params = {
      padID,
      apikey: environment.apiKey
    };
    const data: any = await this.http.post(`${environment.padUrl}getHTML`, params, options).toPromise();
    contentText = data.data.html;
    return contentText;
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

  async exportToWord(element, filename = ''): Promise<void> {
    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body><style>table {width: 100%; border:1px solid #000}img,canvas{max-width: 100%; height:auto}</style>`;
    const postHtml = '</body></html>';
    let innerHtml = document.getElementById(element).innerHTML;
    innerHtml = innerHtml.replace(
      'src="assets/icons/outlined-editor-insert-photo.svg"',
      'src="https://cobalt.origamilab.ch/assets/icons/outlined-editor-insert-photo.svg"'
    );
    const html = preHtml + innerHtml + postHtml;
    const opt = {
      margin: {
        top: 100
      },
      orientation: 'landscape' as const
    };
    const temp = await asBlob(html, opt);
    filename = filename ? filename.replace(/\s/g, '_') + '.docx' : 'document.docx';
    saveAs(temp, filename);
  }

  onEdit(): void {
    this.router.navigate(['/platform/view/experiments/details', this.experiment.id]).then(() => this.onModalClose());
  }
}
