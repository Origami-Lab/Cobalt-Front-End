import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('uploadFileRef')
  uploadFile: ElementRef;
  @Input()
  experiment: Experiment;
  isCollapsed = false;
  loading = true;
  attachFileLoading = false;
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
        this.toastr.error('Could not load attachments');
      }
    );
  }

  onChange(file: File): void {
    const fileReq: Attachment = {
      file,
      filename: file.name,
      experimentid: String(this.experiment.id),
      userid: this.authToken.payload.uid.split('/').pop()
    };
    this.attachFileLoading = true;
    this.experimentDetailsService.attachFile(fileReq).subscribe(
      fileRes => {
        this.files.push(fileRes);
        this.attachFileLoading = false;
        this.uploadFile.nativeElement.value = null;
      },
      () => {
        this.attachFileLoading = false;
        this.toastr.error(`${file.name} failed to upload`);
      }
    );
  }

  addUploadedFile(file: Attachment): void {
    this.files.push(file);
  }

  onConfirmModalOpen(file: Attachment): void {
    this.currentFile = file;
    this.confirmModal.openModal(file.filename);
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
