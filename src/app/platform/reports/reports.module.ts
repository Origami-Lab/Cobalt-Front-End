import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {SharedModule} from '../../shared/shared.module';
import {ReportsRoutingModule} from './reports-routing.module';

@NgModule({
  declarations: [ReportsPageComponent],
  imports: [CommonModule, SharedModule, ReportsRoutingModule]
})
export class ReportsModule {}
