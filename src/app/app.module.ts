import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxSmoothScrollModule} from '@eunsatio/ngx-smooth-scroll';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import {QuillModule} from 'ngx-quill';
import {ToastrModule} from 'ngx-toastr';
import {CollapseModule} from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    NgxDatatableModule,
    NgxSmoothScrollModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    QuillModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      maxOpened: 3
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
