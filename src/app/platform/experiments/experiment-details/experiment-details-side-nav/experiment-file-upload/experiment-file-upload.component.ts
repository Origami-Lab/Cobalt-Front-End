import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {AuthTokenService} from 'ngx-api-utils';
import {JwtTokenPayload} from '../../../../../core/auth/jwt-token-payload';
import {Experiment} from '../../../models/experiment.interface';
import {ApiHttpErrorResponse} from '../../../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiError} from '../../../../../core/api-error/api-error';
import {ConfirmModalComponent} from '../../../../platform-shared/components/confirm-modal/confirm-modal.component';
import {ToastrService} from 'ngx-toastr';
import {Attachment} from '../../models/attachment.interface';

@Component({
  selector: 'co-experiment-file-upload',
  templateUrl: './experiment-file-upload.component.html',
  styleUrls: ['./experiment-file-upload.component.scss']
})
export class ExperimentFileUploadComponent implements OnInit {
  @ViewChild('confirmModalRef')
  confirmModal: ConfirmModalComponent;
  @Input()
  experiment: Experiment;
  isCollapsed = false;
  loading = true;
  files: Attachment[] = [];
  deleteLoading = false;
  apiError: ApiError;
  private currentFile: Attachment;

  constructor(
    private toastr: ToastrService,
    private experimentDetailsService: ExperimentDetailsService,
    private authToken: AuthTokenService<JwtTokenPayload>
  ) {}

  ngOnInit(): void {
    this.experimentDetailsService.getFiles(this.experiment.id).subscribe(
      files => {
        this.files = files;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  onChange(file: File): void {
    const fileReq = {
      contentUrl: 'string',
      filePath: file,
      experimentId: '/experiments/2',
      userid: this.authToken.payload.uid
    };
    this.experimentDetailsService.attachFile(fileReq).subscribe(s => {
      console.log(s);
    });
  }

  addUploadedFile(file: Attachment): void {
    this.files.push(file);
  }

  onConfirmModalOpen(file: Attachment): void {
    this.currentFile = file;
    this.confirmModal.openModal(file.filePath);
  }

  onDeleteConfirm(): void {
    this.deleteLoading = true;
    this.experimentDetailsService.deleteFile(this.currentFile.id).subscribe(
      () => {
        this.toastr.success(`${this.currentFile.filePath} was successfully deleted`);
        this.removeFileById(this.currentFile.id);
        this.confirmModal.onModalClose();
        this.currentFile = null;
        this.deleteLoading = false;
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.loading = false;
      }
    );
  }

  removeFileById(fileId: number): void {
    this.files = this.files.filter(file => file.id !== fileId);
  }
}
