import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotebookPageComponent} from './notebook-page/notebook-page.component';
import {SharedModule} from '../../shared/shared.module';
import {NotebookRoutingModule} from './notebook-routing.module';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';

@NgModule({
  declarations: [NotebookPageComponent],
  imports: [CommonModule, SharedModule, NotebookRoutingModule, PlatformSharedModule]
})
export class NotebookModule {}
