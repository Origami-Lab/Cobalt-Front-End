import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MangeTeamsListComponent} from './mange-teams-list/mange-teams-list.component';
import {MangeTeamsPageComponent} from './mange-teams-page/mange-teams-page.component';

const routes: Routes = [
  {
    path: '',
    component: MangeTeamsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: MangeTeamsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTeamsRoutingModule {}
