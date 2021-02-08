import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule, PlatformSharedModule]
})
export class DashboardModule {}
