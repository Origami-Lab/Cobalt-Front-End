import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FormControlErrorComponent} from './components/form-control-errors/form-control-error/form-control-error.component';
import {FormControlErrorsComponent} from './components/form-control-errors/form-control-errors.component';
import {LoadingComponent} from './components/loading/loading.component';
import {TruncatePipe} from './pipes/truncate.pipe';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NotFoundComponent,
    FormControlErrorsComponent,
    FormControlErrorComponent,
    LoadingComponent,
    TruncatePipe
  ],
  declarations: [NotFoundComponent, FormControlErrorComponent, FormControlErrorsComponent, LoadingComponent, TruncatePipe],
  providers: [
    // NOTE: No singleton provider should be added here!
  ]
})
export class SharedModule {}
