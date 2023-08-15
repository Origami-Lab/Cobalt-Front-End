import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Molecule} from '../../models/molecules';

@Component({
  selector: 'co-molecule-detail-modal',
  templateUrl: './molecule-detail-modal.component.html',
  styleUrls: ['./molecule-detail-modal.component.scss']
})
export class MoleculeDetailModalComponent implements OnInit {
  constructor(private modalService: BsModalService) {}

  private modalRef: BsModalRef;

  @Input()
  moleculeItem: Molecule;

  @ViewChild('moleculeModalRef')
  moleculeModalRef: TemplateRef<any>;

  openModal(): void {
    this.modalRef = this.modalService.show(this.moleculeModalRef, {
      backdrop: 'static',
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered'
    });
  }
  closeModal(): void {
    this.modalRef.hide();
  }

  ngOnInit(): void {}
}
