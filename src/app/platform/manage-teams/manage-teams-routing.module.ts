import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuardService} from 'src/app/auth/role-guard.service';
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
        pathMatch: 'full',
        canActivate: [RoleGuardService],
        data: {roles: ['ROLE_ADMIN']}
      },
      {
        path: 'list',
        component: ManageTeamsListComponent,
        canActivate: [RoleGuardService],
        data: {roles: ['ROLE_ADMIN']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTeamsRoutingModule {}
