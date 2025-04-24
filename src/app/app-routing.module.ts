import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DietsComponent } from './components/diets/diets.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { MedicinesComponent } from './components/medicines/medicines.component';


const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path:'addDoctor',
    loadComponent:()=>import('./components/doctors/doctors.component').then(m=>m.DoctorsComponent)
  },
  {
    path:'addDiet',
    loadComponent:()=>import('./components/diets/diets.component').then(m=>m.DietsComponent)
  },
  {
    path:'addMedicine',
    loadComponent:()=>import('./components/medicines/medicines.component').then(m=>m.MedicinesComponent)
  },
  {
    path:'register',
    loadComponent:()=>import('./components/register/register.component').then(m=>m.RegisterComponent)
  },
  {
    path:'emergency',
    loadComponent:()=>import('./components/emergency/emergency.component').then(m=>m.EmergencyComponent)
  },
  {
    path:'login',
    loadChildren:()=>import('./pages/login/login-routing.module').then(m=>m.LoginPageRoutingModule)
  },
  {
    path:'',
    loadChildren:()=>import('./pages/loader/loader-routing.module').then(m=>m.LoaderPageRoutingModule)
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  }


  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
