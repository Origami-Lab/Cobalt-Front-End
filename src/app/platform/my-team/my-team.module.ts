import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyTeamPageComponent} from './my-team-page/my-team-page.component';
import {SharedModule} from '../../shared/shared.module';
import {MyTeamRoutingModule} from './my-team-routing.module';
import {TeamListComponent} from './team-list/team-list.component';
import {CoModalModule} from 'src/app/shared/co-modal/co-modal.module';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';
import {MyTeamDetailComponent} from './my-team-detail/my-team-detail.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TeamsModule} from '../teams/teams.module';
@NgModule({
  declarations: [MyTeamPageComponent, TeamListComponent, MyTeamDetailComponent],
  imports: [CommonModule, SharedModule, MyTeamRoutingModule, CoModalModule, PlatformSharedModule, BsDropdownModule, TeamsModule]
})
export class MyTeamModule {}
