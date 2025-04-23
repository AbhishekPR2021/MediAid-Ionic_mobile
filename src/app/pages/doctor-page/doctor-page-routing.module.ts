import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPagePage } from './doctor-page.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPagePageRoutingModule {}
