import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Experiment} from '../../models/experiment.interface';
import {ExperimentProtocolComponent} from './experiment-protocol/experiment-protocol.component';

@Component({
  selector: 'co-experiment-details-content',
  templateUrl: './experiment-details-content.component.html',
  styleUrls: ['./experiment-details-content.component.scss']
})
export class ExperimentDetailsContentComponent implements OnInit {
  @ViewChild('experimentProtocolRef')
  experimentProtocol: ExperimentProtocolComponent;

  @ViewChild('experimentConclusionRef')
  experimentConclusion: ExperimentProtocolComponent;

  @Input()
  experiment: Experiment;
  constructor() {}

  protocolOldEditor = false;
  conclusionOldEditor = false;

  onSaveProtocol(): void {
    this.experimentProtocol.save();
  }

  onSaveConclusion(): void {
    this.experimentConclusion.save();
  }

  protocolEditor(): void {
    this.protocolOldEditor = true;
  }

  conclusionEditor(): void {
    this.conclusionOldEditor = true;
  }

  ngOnInit(): void {}
}
