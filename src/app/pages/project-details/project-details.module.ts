import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectDetailsPage } from './project-details.page';

import { ProjectDetailsPageRoutingModule } from './project-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProjectDetailsPageRoutingModule,
  ],
  declarations: [ProjectDetailsPage],
})
export class ProjectDetailsPageModule {}
