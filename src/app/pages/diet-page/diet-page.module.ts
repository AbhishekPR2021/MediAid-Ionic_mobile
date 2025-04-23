import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietPagePageRoutingModule } from './diet-page-routing.module';

import { DietPagePage } from './diet-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietPagePageRoutingModule
  ],
  declarations: []
})
export class DietPagePageModule {}
