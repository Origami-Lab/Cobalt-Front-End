import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCreateComponent} from './team-create/team-create.component';
import {TeamEditComponent} from './team-edit/team-edit.component';
import {TeamFormComponent} from './team-form/team-form.component';
import {TeamManagementRoutingModule} from './team-management-routing.module';
import {CoModalModule} from 'src/app/shared/co-modal/co-modal.module';
import {AddMemberComponent} from './add-member/add-member.component';
import {TeamSearchComponent} from './team-search/team-search.component';
import {PlatformSharedModule} from '../../platform-shared/platform-shared.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {TeamsModule} from '../teams.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [TeamCreateComponent, TeamEditComponent, TeamFormComponent, AddMemberComponent, TeamSearchComponent],
  imports: [CommonModule, TeamManagementRoutingModule, CoModalModule, PlatformSharedModule, SharedModule, TeamsModule, BsDropdownModule]
})
export class TeamManagementModule {}
