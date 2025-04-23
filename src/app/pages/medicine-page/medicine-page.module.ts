import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicinePagePageRoutingModule } from './medicine-page-routing.module';

import { MedicinePagePage } from './medicine-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicinePagePageRoutingModule
  ],
  declarations: []
})
export class MedicinePagePageModule {}
