import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage, // This should contain <ion-tabs>
    children: [
      {
        path:'profile',
        loadChildren:()=> import('../../components/cards/profile/profile-routing.module').then(m=> m.ProfilePageRoutingModule)
      },
      {
        path:'medicine',
        loadComponent:()=> import('../../components/cards/medicine-home/medicine-home.component').then(m=>m.MedicineHomeComponent)
      },
      {
        path:'doctor',
        loadComponent:()=>import('../../components/cards/doctor-home/doctor-home.component').then(m=>m.DoctorHomeComponent)
      },
      {
        path:'',
        redirectTo:'/home/profile',
        pathMatch:'full'
      }
     

    ]
  },
  {
    path:'',
    redirectTo:'/home/profile',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
