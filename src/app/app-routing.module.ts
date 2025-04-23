import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DietsComponent } from './components/diets/diets.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { MedicinesComponent } from './components/medicines/medicines.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path:'addDoctor',
    loadComponent:()=>import('./components/doctors/doctors.component').then(m=>m.DoctorsComponent)
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
