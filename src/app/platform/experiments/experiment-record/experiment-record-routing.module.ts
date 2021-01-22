import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentRecordModalComponent} from './experiment-record-modal/experiment-record-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentRecordModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRecordRoutingModule {}
