import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTeamPageComponent} from './my-team-page/my-team-page.component';
import {TeamListComponent} from './team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyTeamPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TeamListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {}
