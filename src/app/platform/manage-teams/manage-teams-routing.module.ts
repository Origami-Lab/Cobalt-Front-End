import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageTeamsListComponent} from './manage-teams-list/manage-teams-list.component';
import {ManageTeamsPageComponent} from './manage-teams-page/manage-teams-page.component';

const routes: Routes = [
  {
    path: '',
    component: ManageTeamsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ManageTeamsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTeamsRoutingModule {}
