import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentDetailsPageComponent} from './experiment-details-page/experiment-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentDetailsRoutingModules {}
