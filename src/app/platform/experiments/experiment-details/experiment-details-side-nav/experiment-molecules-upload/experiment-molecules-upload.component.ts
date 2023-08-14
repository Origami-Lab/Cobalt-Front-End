import {Component, Input, OnInit} from '@angular/core';
import {Experiment} from '../../../models/experiment.interface';
import {Molecule} from '../../models/molecules';
import {ExperimentDetailsService} from '../../experiment-details.service';

@Component({
  selector: 'co-experiment-molecules-upload',
  templateUrl: './experiment-molecules-upload.component.html',
  styleUrls: ['./experiment-molecules-upload.component.scss']
})
export class ExperimentMoleculesUploadComponent implements OnInit {
  constructor(private experimentDetailsService: ExperimentDetailsService) {}

  @Input()
  experiment: Experiment;

  loading = true;
  molecules: Molecule[] = [];
  isCollapsed = false;

  handleMoleculeOutput(val: Molecule): void {
    this.molecules.push(val);
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
