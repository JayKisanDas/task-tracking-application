import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'project-list',
        loadChildren: () =>
          import('../project-list/project-list.module').then(
            (m) => m.ProjectListPageModule
          ),
      },
      {
        path: 'project-details/:id',
        loadChildren: () =>
          import('../project-details/project-details.module').then(
            (m) => m.ProjectDetailsPageModule
          ),
      },
      {
        path: 'add-project',
        loadChildren: () =>
          import('../add-project/add-project.module').then(
            (m) => m.AddProjectPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/project-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/project-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tabs/project-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
