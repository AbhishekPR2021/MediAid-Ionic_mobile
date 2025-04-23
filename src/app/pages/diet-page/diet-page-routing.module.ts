import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietPagePage } from './diet-page.page';

const routes: Routes = [
  {
    path: '',
    component: DietPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietPagePageRoutingModule {}
