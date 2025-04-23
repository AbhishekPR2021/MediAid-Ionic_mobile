import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicinePagePage } from './medicine-page.page';

const routes: Routes = [
  {
    path: '',
    component: MedicinePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicinePagePageRoutingModule {}
