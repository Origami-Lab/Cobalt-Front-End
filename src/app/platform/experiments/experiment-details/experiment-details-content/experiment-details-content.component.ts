import {Component, Input, OnInit} from '@angular/core';
import {Experiment} from '../../models/experiment.interface';

@Component({
  selector: 'co-experiment-details-content',
  templateUrl: './experiment-details-content.component.html',
  styleUrls: ['./experiment-details-content.component.scss']
})
export class ExperimentDetailsContentComponent implements OnInit {
  @Input()
  experiment: Experiment;
  constructor() {}

  ngOnInit(): void {}
}
