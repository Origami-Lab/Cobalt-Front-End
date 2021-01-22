import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Experiment} from '../../../experiments/models/experiment.interface';

@Component({
  selector: 'co-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss']
})
export class CardRowComponent implements OnInit {
  @Input()
  experiment: Experiment;
  @Output()
  openConfirmModal = new EventEmitter<Experiment>();

  constructor() {}

  ngOnInit(): void {}

  stopEventPropagation(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  onConfirmModalOpen(): void {
    this.openConfirmModal.emit(this.experiment);
  }
}
