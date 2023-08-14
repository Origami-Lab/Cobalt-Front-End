import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';

@Component({
  selector: 'co-ketcher-modal',
  templateUrl: './ketcher-modal.component.html',
  styleUrls: ['./ketcher-modal.component.scss']
})
export class KetcherModalComponent implements OnInit {
  constructor(private modalService: BsModalService) {}

  private modalRef: BsModalRef;
  iframeLoading = true;

  @ViewChild('ketcherModalRef')
  ketcherModalRef: TemplateRef<any>;

  openModal(): void {
    const modalElement = document.querySelector('.modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('hide-backdrop');
    }
    if (modalElement) {
      modalElement.classList.remove('modal-hidden');
    } else {
      this.modalRef = this.modalService.show(this.ketcherModalRef, {backdrop: 'static', ignoreBackdropClick: true});
    }
  }

  closeModal(): void {
    // this.modalRef.hide();
    const modalElement = document.querySelector('.modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalElement) {
      modalElement.classList.add('modal-hidden');
    }
    if (modalBackdrop) {
      modalBackdrop.classList.add('hide-backdrop');
    }
  }

  onIframeLoad(): void {
    this.iframeLoading = false;
  }

  ngOnInit(): void {}
}
