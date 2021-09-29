import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTeamDetailComponent} from './my-team-detail/my-team-detail.component';
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
      },
      {
        path: 'detail/:myTeamId',
        component: MyTeamDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {}
