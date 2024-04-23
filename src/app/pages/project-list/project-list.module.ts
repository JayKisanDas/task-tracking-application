import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListPage } from './project-list.page';

import { ProjectListPageRoutingModule } from './project-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProjectListPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProjectListPage],
})
export class ProjectListPageModule {}
