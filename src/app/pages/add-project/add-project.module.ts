import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProjectPage } from './add-project.page';

import { AddProjectPageRoutingModule } from './add-project-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddProjectPageRoutingModule,
  ],
  declarations: [AddProjectPage],
})
export class AddProjectPageModule {}
