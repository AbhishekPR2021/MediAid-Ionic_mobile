import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/doctor-page/doctor-page-routing.module').then(m => m.DoctorPagePageRoutingModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pages/diet-page/diet-page-routing.module').then(m => m.DietPagePageRoutingModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../pages/emergency-page/emergency-page-routing.module').then(m => m.EmergencyPagePageRoutingModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/medicine-page/medicine-page-routing.module').then(m => m.MedicinePagePageRoutingModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../pages/profile-page/profile-page-routing.module').then(m => m.ProfilePagePageRoutingModule)

      },{
        path:'shake',
        loadComponent:()=> import ('../components/shake/shake.component').then(m=>m.ShakeComponent)
      },
      {
        path:'booking',
        loadComponent:()=> import ('../components/booking/booking.component').then(m=>m.BookingComponent)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
