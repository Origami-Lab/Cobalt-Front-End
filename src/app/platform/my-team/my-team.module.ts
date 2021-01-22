import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyTeamPageComponent} from './my-team-page/my-team-page.component';
import {SharedModule} from '../../shared/shared.module';
import {MyTeamRoutingModule} from './my-team-routing.module';
import {TeamListComponent} from './team-list/team-list.component';
import {MyTeamCardComponent} from './my-team-card/my-team-card.component';

@NgModule({
  declarations: [MyTeamPageComponent, TeamListComponent, MyTeamCardComponent],
  imports: [CommonModule, SharedModule, MyTeamRoutingModule]
})
export class MyTeamModule {}
