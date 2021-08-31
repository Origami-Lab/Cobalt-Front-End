import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTeamCreateComponent} from './my-team-create/my-team-create.component';
import {MyTeamEditComponent} from './my-team-edit/my-team-edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: MyTeamCreateComponent
  },
  {
    path: 'edit',
    component: MyTeamEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamManagementRoutingModule {}
