import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyPagePage } from './emergency-page.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyPagePageRoutingModule {}
