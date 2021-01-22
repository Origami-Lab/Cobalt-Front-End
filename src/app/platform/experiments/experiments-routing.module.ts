import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentsPageComponent} from './experiments-page/experiments-page.component';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExperimentsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ExperimentsListComponent
      },
      {
        path: 'details/:experimentId',
        loadChildren: () => import('./experiment-details/experiment-details.module').then(m => m.ExperimentDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule {}
