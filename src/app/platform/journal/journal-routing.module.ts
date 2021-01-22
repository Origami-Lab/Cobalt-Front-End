import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JournalListComponent} from './journal-list/journal-list.component';
import {JournalPageComponent} from './journal-page/journal-page.component';

const routes: Routes = [
  {
    path: '',
    component: JournalPageComponent,
    children: [
      {
        path: 'list',
        component: JournalListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}
