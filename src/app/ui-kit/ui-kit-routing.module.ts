import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UiKitPageComponent} from './ui-kit-page/ui-kit-page.component';
import {UiKitModalComponent} from './ui-kit-modal/ui-kit-modal.component';
import {UiKitModalGuard} from './ui-kit-modal/ui-kit-modal.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full'
  },
  {
    path: 'view',
    component: UiKitPageComponent,
    children: [
      {
        path: 'test-modal',
        component: UiKitModalComponent
      },
      {
        path: 'test-outlet-modal',
        outlet: 'modal',
        component: UiKitModalComponent
      },
      {
        path: 'test-blocked-modal',
        component: UiKitModalComponent,
        canDeactivate: [UiKitModalGuard]
      },
      {
        path: 'test-outlet-blocked-modal',
        component: UiKitModalComponent,
        outlet: 'modal',
        canDeactivate: [UiKitModalGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiKitRoutingModule {}
