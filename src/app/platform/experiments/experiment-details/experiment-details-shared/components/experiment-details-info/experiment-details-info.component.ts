import {Component, Input, OnInit} from '@angular/core';
import {Experiment} from '../../../../models/experiment.interface';

@Component({
  selector: 'co-experiment-details-info',
  templateUrl: './experiment-details-info.component.html',
  styleUrls: ['./experiment-details-info.component.scss']
})
export class ExperimentDetailsInfoComponent implements OnInit {
  @Input()
  experiment: Experiment;
  constructor() {}

  ngOnInit(): void {}
}
