import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Experiment} from '../../models/experiment.interface';
import {BreadcrumbConfig} from '../../../platform-shared/components/breadcrumb/breadcrumb-config.interface';

@Component({
  selector: 'co-experiment-details-header',
  templateUrl: './experiment-details-header.component.html',
  styleUrls: ['./experiment-details-header.component.scss']
})
export class ExperimentDetailsHeaderComponent implements OnInit {
  @Input()
  set experiment(experiment: Experiment) {
    if (!experiment) {
      return;
    }
    this._experiment = experiment;
    this.generateBreadcrumbConfig();
  }
  get experiment(): Experiment {
    return this._experiment;
  }
  @Output()
  openConfirmModal = new EventEmitter<void>();
  @Output()
  openSideNav = new EventEmitter<void>();

  breadcrumbConfig: BreadcrumbConfig[];
  private _experiment: Experiment;

  constructor() {}

  ngOnInit(): void {}

  generateBreadcrumbConfig(): void {
    this.breadcrumbConfig = [
      {
        label: 'Experiments',
        path: ['experiments']
      },
      {
        label: 'Details',
        path: ['experiments', 'details', String(this.experiment.id)]
      }
    ];
  }

  onConfirmModalOpen(): void {
    this.openConfirmModal.emit();
  }

  onSideNavOpen(): void {
    this.openSideNav.emit();
  }
}
