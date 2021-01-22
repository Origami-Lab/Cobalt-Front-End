import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApiAuthGuardService} from 'ngx-api-utils';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ApiAuthGuardService],
    canActivateChild: [ApiAuthGuardService]
  },
  {
    path: 'platform',
    loadChildren: () => import('./platform/platform.module').then(m => m.PlatformModule),
    canActivate: [ApiAuthGuardService],
    canActivateChild: [ApiAuthGuardService]
  },
  {
    path: 'ui-kit',
    loadChildren: () => import('./ui-kit/ui-kit.module').then(m => m.UiKitModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
