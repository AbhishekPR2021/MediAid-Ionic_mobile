import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonDatetime, IonDatetimeButton, IonicModule, IonicRouteStrategy, IonModal, IonNav } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoaderPage } from './pages/loader/loader.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/module.d-CnjH8Dlt';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NativeAudio } from '@capacitor-community/native-audio';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,


    RegisterComponent,
    LoaderPage

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
