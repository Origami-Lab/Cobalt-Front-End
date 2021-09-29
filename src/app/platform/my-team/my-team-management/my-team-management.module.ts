import {NgModule} from '@angular/core';
import {CoModalModule} from '../../../shared/co-modal/co-modal.module';
import {MyTeamCreateComponent} from './my-team-create/my-team-create.component';
import {MyTeamManagementRoutingModule} from './my-team-management-routing.module';
import {MyTeamFormComponent} from './my-team-form/my-team-form.component';
import {MyTeamEditComponent} from './my-team-edit/my-team-edit.component';
import {PlatformSharedModule} from '../../platform-shared/platform-shared.module';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MyTeamCreateComponent, MyTeamFormComponent, MyTeamEditComponent],
  imports: [MyTeamManagementRoutingModule, CoModalModule, PlatformSharedModule, SharedModule]
})
export class MyTeamManagementModule {}
