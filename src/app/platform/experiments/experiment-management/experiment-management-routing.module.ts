import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateExperimentComponent} from './create-experiment/create-experiment.component';
import {EditExperimentComponent} from './edit-experiment/edit-experiment.component';
import {ExperimentManagementModalGuard} from './experiment-management-modal.guard';

const routes: Routes = [
  {
    path: 'create',
    component: CreateExperimentComponent,
    canDeactivate: [ExperimentManagementModalGuard]
  },
  {
    path: 'edit',
    component: EditExperimentComponent,
    canDeactivate: [ExperimentManagementModalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentManagementRoutingModule {}
