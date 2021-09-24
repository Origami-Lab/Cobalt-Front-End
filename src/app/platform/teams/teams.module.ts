import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardComponent} from './team-card/team-card.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';
import {RouterModule} from '@angular/router';
import {TeamListComponent} from './team-list/team-list.component';
import {TeamMemberComponent} from './team-member/team-member.component';
import {TeamPageComponent} from './team-page/team-page.component';
import {TeamsRoutingModule} from './teams-routing.module';
import {TeamCardMemberComponent} from './team-card-member/team-card-member.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {MemberListComponent} from './member-list/member-list.component';
@NgModule({
  declarations: [
    TeamCardComponent,
    TeamListComponent,
    TeamMemberComponent,
    TeamPageComponent,
    TeamCardMemberComponent,
    MemberListComponent
  ],
  imports: [CommonModule, BsDropdownModule, PlatformSharedModule, RouterModule, TeamsRoutingModule, SharedModule],
  exports: [TeamCardComponent, TeamListComponent, MemberListComponent]
})
export class TeamsModule {}
