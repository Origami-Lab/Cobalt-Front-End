import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotebookPageComponent} from './notebook-page/notebook-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotebookPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebookRoutingModule {}
