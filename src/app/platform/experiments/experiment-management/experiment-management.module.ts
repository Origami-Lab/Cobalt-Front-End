import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateExperimentComponent} from './create-experiment/create-experiment.component';
import {EditExperimentComponent} from './edit-experiment/edit-experiment.component';
import {ExperimentFormComponent} from './experiment-form/experiment-form.component';
import {SharedModule} from '../../../shared/shared.module';
import {ExperimentManagementRoutingModule} from './experiment-management-routing.module';
import {CoModalModule} from '../../../shared/co-modal/co-modal.module';
import {PlatformSharedModule} from '../../platform-shared/platform-shared.module';

@NgModule({
  declarations: [CreateExperimentComponent, EditExperimentComponent, ExperimentFormComponent],
  imports: [CommonModule, SharedModule, ExperimentManagementRoutingModule, CoModalModule, PlatformSharedModule]
})
export class ExperimentManagementModule {}
