import {JournalCalendarFilterComponent} from './journal-calendar-filter/journal-calendar-filter.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JournalPageComponent} from './journal-page/journal-page.component';
import {SharedModule} from '../../shared/shared.module';
import {JournalRoutingModule} from './journal-routing.module';
import {JournalListComponent} from './journal-list/journal-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxSmoothScrollModule} from '@eunsatio/ngx-smooth-scroll';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';
import {JournalTableComponent} from './journal-table/journal-table.component';
import {JournalSearchFilterComponent} from './journal-search-filter/journal-search-filter.component';

@NgModule({
  declarations: [
    JournalPageComponent,
    JournalListComponent,
    JournalCalendarFilterComponent,
    JournalTableComponent,
    JournalSearchFilterComponent
  ],
  imports: [CommonModule, SharedModule, JournalRoutingModule, NgxDatatableModule, NgxSmoothScrollModule, PlatformSharedModule]
})
export class JournalModule {}
