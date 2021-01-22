import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {markFormControlAsTouched} from '../../../../../shared/utils/mark-form-control-as-touched';
import {CustomValidators} from '../../../../../core/utils/custom-validators';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {AuthTokenService} from 'ngx-api-utils';
import {JwtTokenPayload} from '../../../../../core/auth/jwt-token-payload';
import {ToastrService} from 'ngx-toastr';
import {Link} from '../../models/link.interface';

@Component({
  selector: 'co-experiment-link-upload-modal',
  templateUrl: './experiment-link-upload-modal.component.html',
  styleUrls: ['./experiment-link-upload-modal.component.scss']
})
export class ExperimentLinkUploadModalComponent implements OnInit {
  @ViewChild('uploadLinkModalRef')
  uploadLinkModal: TemplateRef<any>;
  @Input()
  experimentId: number;
  @Output()
  uploadedLink = new EventEmitter<Link>();

  linkForm = this.fb.group({
    link: [null, [Validators.required, CustomValidators.validateURL]]
  });

  loading = false;
  private modalRef: BsModalRef;

  constructor(
    private authToken: AuthTokenService<JwtTokenPayload>,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  openModal(): void {
    this.modalRef = this.modalService.show(this.uploadLinkModal);
  }

  onModalClose(): void {
    this.modalRef.hide();
  }

  onUploadLink(): void {
    markFormControlAsTouched(this.linkForm);

    if (!this.linkForm.valid) {
      return;
    }

    this.loading = true;
    const link: Link = {
      link: this.linkForm.value.link,
      experimentId: `/experiments/${this.experimentId}`,
      userId: this.authToken.payload.uid
    };

    this.experimentDetailsService.attachLink(link).subscribe(
      linkRes => {
        this.loading = false;
        this.toastr.success(`Link - ${linkRes.link} - has been uploaded successfully`);
        this.uploadedLink.emit(linkRes);
        this.onModalClose();
      },
      () => {
        this.linkForm.setErrors({unknownError: true});
      }
    );
  }
}
