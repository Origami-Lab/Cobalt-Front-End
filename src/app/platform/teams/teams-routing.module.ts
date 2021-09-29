import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamMemberComponent} from './team-member/team-member.component';
import {TeamPageComponent} from './team-page/team-page.component';

const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'team-members/:id',
        pathMatch: 'full'
      },
      {
        path: 'team-members/:id',
        component: TeamMemberComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
