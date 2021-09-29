import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuardService} from 'src/app/auth/role-guard.service';
import {ManageUsersListComponent} from './manage-users-list/manage-users-list.component';
import {ManageUsersPageComponent} from './manage-users-page/manage-users-page.component';

const routers: Routes = [
  {
    path: '',
    component: ManageUsersPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
        // canActivate: [RoleGuardService],
        data: {roles: ['ROLE_ADMIN']}
      },
      {
        path: 'list',
        component: ManageUsersListComponent,
        // canActivate: [RoleGuardService],
        data: {roles: ['ROLE_ADMIN']}
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule {}
