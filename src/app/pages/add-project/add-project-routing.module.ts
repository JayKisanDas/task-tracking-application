import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectPage } from './add-project.page';

const routes: Routes = [
  {
    path: '',
    component: AddProjectPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProjectPageRoutingModule {}
