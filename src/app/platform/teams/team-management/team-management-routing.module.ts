import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddMemberComponent} from './add-member/add-member.component';
import {TeamCreateComponent} from './team-create/team-create.component';
import {TeamEditComponent} from './team-edit/team-edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: TeamCreateComponent
  },
  {
    path: 'edit',
    component: TeamEditComponent
  },
  {
    path: 'add-member',
    component: AddMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamManagementRoutingModule {}
