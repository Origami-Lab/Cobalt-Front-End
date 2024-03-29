import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {PlatformLayoutComponent} from './platform-layout/platform-layout/platform-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'view',
    component: PlatformLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'experiments',
        loadChildren: () => import('./experiments/experiments.module').then(m => m.ExperimentsModule)
      },
      {
        path: 'experiments/management',
        loadChildren: () =>
          import('./experiments/experiment-management/experiment-management.module').then(m => m.ExperimentManagementModule),
        outlet: 'modal'
      },
      {
        path: 'experiments/record/:experimentId',
        loadChildren: () => import('./experiments/experiment-record/experiment-record.module').then(m => m.ExperimentRecordModule),
        outlet: 'modal'
      },
      {
        path: 'journal',
        loadChildren: () => import('./journal/journal.module').then(m => m.JournalModule)
      },
      {
        path: 'my-team',
        loadChildren: () => import('./my-team/my-team.module').then(m => m.MyTeamModule)
      },
      {
        path: 'manage-team',
        loadChildren: () => import('./manage-teams/manage-teams.module').then(m => m.ManageTeamsModule)
      },
      {
        path: 'manage-users',
        loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule)
      },
      {
        path: 'teams',
        loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule)
      },
      {
        path: 'my-team/management',
        loadChildren: () => import('./my-team/my-team-management/my-team-management.module').then(m => m.MyTeamManagementModule),
        outlet: 'modal'
      },
      {
        path: 'teams/management',
        loadChildren: () => import('./teams/team-management/team-management.module').then(m => m.TeamManagementModule),
        outlet: 'modal'
      },
      {
        path: 'notebook',
        loadChildren: () => import('./notebook/notebook.module').then(m => m.NotebookModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule {}
