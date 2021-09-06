import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {CoModalModule} from 'src/app/shared/co-modal/co-modal.module';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ManageTeamsRoutingModule} from './manage-teams-routing.module';
import {MangeTeamsPageComponent} from './mange-teams-page/mange-teams-page.component';
import {MangeTeamsListComponent} from './mange-teams-list/mange-teams-list.component';
import {TeamsModule} from '../teams/teams.module';
import {MyTeamModule} from '../my-team/my-team.module';
@NgModule({
  declarations: [MangeTeamsPageComponent, MangeTeamsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoModalModule,
    PlatformSharedModule,
    BsDropdownModule,
    ManageTeamsRoutingModule,
    TeamsModule,
    MyTeamModule
  ]
})
export class ManageTeamsModule {}
