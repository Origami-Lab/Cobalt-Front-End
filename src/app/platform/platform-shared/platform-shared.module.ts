import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {BadgeComponent} from './components/badge/badge.component';
import {InputDatepickerComponent} from './components/input-datepicker/input-datepicker.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {SharedModule} from '../../shared/shared.module';
import {ResizableBoxComponent} from './components/resizable-box/resizable-box.component';
import {TextEditorComponent} from './components/text-editor/text-editor.component';
import {QuillModule} from 'ngx-quill';
import {NgxMutationObserverModule} from 'ngx-mutation-observer';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {CoModalModule} from '../../shared/co-modal/co-modal.module';
import {CardRowComponent} from './components/card-row/card-row.component';
import {ContentNotFoundComponent} from './components/content-not-found/content-not-found.component';

@NgModule({
  declarations: [
    CardComponent,
    CardRowComponent,
    BadgeComponent,
    InputDatepickerComponent,
    ResizableBoxComponent,
    TextEditorComponent,
    BreadcrumbComponent,
    ConfirmModalComponent,
    ContentNotFoundComponent
  ],
  imports: [CommonModule, SharedModule, BsDatepickerModule, BsDropdownModule, QuillModule, NgxMutationObserverModule, CoModalModule],
  exports: [
    CardComponent,
    CardRowComponent,
    InputDatepickerComponent,
    ResizableBoxComponent,
    TextEditorComponent,
    BreadcrumbComponent,
    BadgeComponent,
    ConfirmModalComponent,
    ContentNotFoundComponent
  ]
})
export class PlatformSharedModule {}
