import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyPagePageRoutingModule } from './emergency-page-routing.module';

import { EmergencyPagePage } from './emergency-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyPagePageRoutingModule
  ],
  declarations: []
})
export class EmergencyPagePageModule {}
