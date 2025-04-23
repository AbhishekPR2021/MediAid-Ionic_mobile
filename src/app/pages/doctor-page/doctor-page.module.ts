import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPagePageRoutingModule } from './doctor-page-routing.module';

import { DoctorPagePage } from './doctor-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPagePageRoutingModule
  ],
  declarations: []
})
export class DoctorPagePageModule {}
