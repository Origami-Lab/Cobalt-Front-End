import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ApiError} from '../../../../core/api-error/api-error';

@Component({
  selector: 'co-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @ViewChild('confirmDeleteModalRef', {static: true})
  confirmDeleteModal: TemplateRef<any>;
  @Input()
  loading = false;
  @Input()
  closeOutside = false;
  @Input()
  apiError: ApiError;
  @Output()
  confirmDelete = new EventEmitter<void>();
  @Output()
  modalClose = new EventEmitter<void>();

  modalRef: BsModalRef;
  deleteItemName: string;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(deleteItemName: string): void {
    this.modalRef = this.modalService.show(this.confirmDeleteModal);
    this.deleteItemName = deleteItemName;
  }

  onModalClose(): void {
    this.modalRef.hide();
    this.modalClose.emit();
  }

  onDeleteConfirm(): void {
    this.confirmDelete.emit();

    if (this.closeOutside) {
      return;
    }

    this.modalRef.hide();
  }
}
