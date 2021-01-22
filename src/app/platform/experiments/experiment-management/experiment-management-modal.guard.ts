import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {CoModalService} from '../../../shared/co-modal/co-modal.service';
import {CreateExperimentComponent} from './create-experiment/create-experiment.component';
import {EditExperimentComponent} from './edit-experiment/edit-experiment.component';

@Injectable({
  providedIn: 'root'
})
export class ExperimentManagementModalGuard implements CanDeactivate<CreateExperimentComponent | EditExperimentComponent> {
  constructor(private coModalService: CoModalService) {}
  canDeactivate(): boolean {
    if (this.coModalService.isBlocked$.value) {
      this.coModalService.triggerConfirmModal();
    }
    return !this.coModalService.isBlocked$.value;
  }
}
