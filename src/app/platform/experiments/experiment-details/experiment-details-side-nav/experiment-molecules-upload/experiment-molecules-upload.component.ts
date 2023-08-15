import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Experiment} from '../../../models/experiment.interface';
import {Molecule} from '../../models/molecules';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {MoleculeDetailModalComponent} from '../molecule-detail-modal/molecule-detail-modal.component';

@Component({
  selector: 'co-experiment-molecules-upload',
  templateUrl: './experiment-molecules-upload.component.html',
  styleUrls: ['./experiment-molecules-upload.component.scss']
})
export class ExperimentMoleculesUploadComponent implements OnInit {
  constructor(private experimentDetailsService: ExperimentDetailsService) {}
  moleculeItem: Molecule = {} as Molecule;

  @ViewChild('moleculeModalRef')
  moleculeModalRef: MoleculeDetailModalComponent;

  @Input()
  experiment: Experiment;

  loading = true;
  molecules: Molecule[] = [];
  isCollapsed = false;

  handleMoleculeOutput(val: Molecule): void {
    this.molecules.push(val);
  }

  openMoleculeDetail(molecule: Molecule): void {
    this.moleculeItem = molecule;
    this.moleculeModalRef.openModal();
  }

  ngOnInit(): void {
    this.experimentDetailsService.getMolecule(this.experiment.id).subscribe(
      molecules => {
        this.molecules = molecules;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
