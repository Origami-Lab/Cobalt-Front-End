import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageUsersPageComponent} from './manage-users-page/manage-users-page.component';
import {ManageUsersRoutingModule} from './manage-users-routing.module';
import {ManageUsersListComponent} from './manage-users-list/manage-users-list.component';
import {ManageUsersListHeaderComponent} from './manage-users-list/manage-users-list-header/manage-users-list-header.component';
import {ManageUsersListContentComponent} from './manage-users-list/manage-users-list-content/manage-users-list-content.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {UsersTableComponent} from './manage-users-list/manage-users-list-content/users-table/users-table.component';
import {ManageUsersCreateComponent} from './manage-users-create/manage-users-create.component';
import {CoModalModule} from 'src/app/shared/co-modal/co-modal.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {UserInfoComponent} from './manage-users-list/manage-users-list-content/user-info/user-info.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';
@NgModule({
  declarations: [
    ManageUsersPageComponent,
    ManageUsersListComponent,
    ManageUsersListHeaderComponent,
    ManageUsersListContentComponent,
    UsersTableComponent,
    ManageUsersCreateComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    SharedModule,
    CoModalModule,
    NgxDatatableModule,
    BsDropdownModule,
    PlatformSharedModule
  ],
  exports: [UserInfoComponent]
})
export class ManageUsersModule {}
