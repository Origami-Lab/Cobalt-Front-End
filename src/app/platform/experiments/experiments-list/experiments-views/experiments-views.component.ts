import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Experiment} from '../../models/experiment.interface';
import {ExperimentsView} from '../../models/experiments-view.enum';

@Component({
  selector: 'co-experiments-view',
  templateUrl: './experiments-views.component.html',
  styleUrls: ['./experiments-views.component.scss']
})
export class ExperimentsViewComponent implements OnInit {
  @Input()
  view: string;
  @Input()
  experiments: Experiment[];
  @Output()
  openConfirmModal = new EventEmitter<Experiment>();

  ExperimentsView = ExperimentsView;

  constructor() {}

  ngOnInit(): void {}

  onConfirmModalOpen(experiment: Experiment): void {
    this.openConfirmModal.emit(experiment);
  }
}
