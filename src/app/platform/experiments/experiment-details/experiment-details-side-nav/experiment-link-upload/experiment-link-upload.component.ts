import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Experiment} from '../../../models/experiment.interface';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {Link} from '../../models/link.interface';
import {ApiError} from '../../../../../core/api-error/api-error';
import {ConfirmModalComponent} from '../../../../platform-shared/components/confirm-modal/confirm-modal.component';
import {ApiHttpErrorResponse} from '../../../../../core/api-error/api-http-error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'co-experiment-link-upload',
  templateUrl: './experiment-link-upload.component.html',
  styleUrls: ['./experiment-link-upload.component.scss']
})
export class ExperimentLinkUploadComponent implements OnInit {
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;
  @Input()
  experiment: Experiment;
  links: Link[] = [];
  deleteLoading = false;
  isCollapsed = false;
  apiError: ApiError;
  loading = true;
  private currentLink: Link;

  constructor(private experimentDetailsService: ExperimentDetailsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.experimentDetailsService.getLinks(this.experiment.id).subscribe(
      links => {
        this.links = links;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  onConfirmModalOpen(link: Link): void {
    this.currentLink = link;
    this.confirmModal.openModal(link.link);
  }

  addUploadedLink(link: Link): void {
    this.links.push(link);
  }

  onDeleteConfirm(): void {
    this.deleteLoading = true;
    this.experimentDetailsService.deleteLink(this.currentLink.id).subscribe(
      () => {
        this.toastr.success(`${this.currentLink.link} was successfully deleted`);
        this.removeLinkById(this.currentLink.id);
        this.confirmModal.onModalClose();
        this.currentLink = null;
        this.deleteLoading = false;
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.loading = false;
      }
    );
  }

  removeLinkById(linkId: number): void {
    this.links = this.links.filter(link => link.id !== linkId);
  }
}
