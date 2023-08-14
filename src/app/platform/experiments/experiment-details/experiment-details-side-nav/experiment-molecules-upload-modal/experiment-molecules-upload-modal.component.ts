import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {Molecule} from '../../models/molecules';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'co-experiment-molecules-upload-modal',
  templateUrl: './experiment-molecules-upload-modal.component.html',
  styleUrls: ['./experiment-molecules-upload-modal.component.scss']
})
export class ExperimentMoleculesUploadModalComponent implements OnInit {
  @ViewChild('uploadMoleculesModalRef')
  uploadMoleculesModal: TemplateRef<any>;

  @Input()
  experimentId: number;

  @Output()
  moleculeItem = new EventEmitter<Molecule>();

  moleculesForm = this.fb.group({
    molecules: [null, [Validators.required]]
  });

  private modalRef: BsModalRef;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService
  ) {}

  openModal(): void {
    this.modalRef = this.modalService.show(this.uploadMoleculesModal, {backdrop: 'static', ignoreBackdropClick: true});
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('hide-backdrop');
    }
  }

  onModalClose(): void {
    this.modalRef.hide();
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.add('hide-backdrop');
    }
  }

  onUploadLink(): void {
    markFormControlAsTouched(this.moleculesForm);

    if (!this.moleculesForm.valid) {
      return;
    }

    this.loading = true;
    const molecules: Molecule = {
      molecule: this.moleculesForm.value.molecules,
      experimentId: Number(this.experimentId)
    };

    this.experimentDetailsService.addMolecules(molecules).subscribe(
      result => {
        console.log('result', result);
        this.loading = false;
        this.toastr.success(`Molecule - ${result.id} - has been uploaded successfully`);
        this.moleculeItem.emit(result);
        this.moleculesForm.reset();
        this.onModalClose();
      },
      () => {
        this.moleculesForm.setErrors({unknownError: true});
      }
    );
  }

  ngOnInit(): void {}
}
