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
    path:'',
    loadChildren:()=> import('./pages/home/home-routing.module').then(m=>m.HomePageRoutingModule)
  },
  {
    path: 'emergency-page',
    loadChildren: () => import('./pages/emergency-page/emergency-page.module').then( m => m.EmergencyPagePageModule)
  },
  {
    path: 'medicine-page',
    loadChildren: () => import('./pages/medicine-page/medicine-page.module').then( m => m.MedicinePagePageModule)
  },
  {
    path: 'diet-page',
    loadChildren: () => import('./pages/diet-page/diet-page.module').then( m => m.DietPagePageModule)
  },
  {
    path: 'profile-page',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then( m => m.ProfilePagePageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
