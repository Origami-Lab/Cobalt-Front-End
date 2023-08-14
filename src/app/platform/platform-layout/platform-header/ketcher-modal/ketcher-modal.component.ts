import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
@Component({
  selector: 'co-ketcher-modal-test',
  templateUrl: './ketcher-modal.component.html',
  styleUrls: ['./ketcher-modal.component.scss']
})
export class KetcherModalComponent implements OnInit {
  constructor() {}

  @ViewChild('userModalRef')
  coModal: CoModalLayoutComponent;

  modalConfig = {show: false, backdrop: 'static', keyboard: false};

  openModal(): void {
    this.coModal.openModal();
  }

  closeModal(): void {
    this.coModal.closeModal();
  }

  ngOnInit(): void {}
}
