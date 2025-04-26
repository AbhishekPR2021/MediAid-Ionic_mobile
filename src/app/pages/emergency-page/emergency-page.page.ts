import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorMode } from 'src/app/models/DoctorModel';
import { EmergencyModel } from 'src/app/models/EmergenctModel';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-emergency-page',
  templateUrl: './emergency-page.page.html',
  styleUrls: ['./emergency-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyPagePage implements OnInit {
  sharedEmeregency:EmergencyModel = new EmergencyModel();
  sharedUser:any;
  sharedDoc:DoctorMode = new DoctorMode();

  constructor(private router:Router,private sharedJson:SharedDataService) { 
    this.sharedEmeregency = this.sharedJson.emergency[0]?this.sharedJson.emergency[0]: this.sharedEmeregency;
    this.sharedDoc = this.sharedJson.doctors[0]? this.sharedJson.doctors[0]: this.sharedDoc;

  }

  ngOnInit() {
    this.sharedUser = this.sharedJson.user;
    this.sharedDoc = this.sharedJson.doctors[0]? this.sharedJson.doctors[0]: this.sharedDoc;
  }
  ionViewWillEnter(){
    this.sharedEmeregency = this.sharedJson.emergency[0]?this.sharedJson.emergency[0]: this.sharedEmeregency;
    this.sharedDoc = this.sharedJson.doctors[0]? this.sharedJson.doctors[0]: this.sharedDoc;

  }
  updateDetails(){
    const navigationExtras={
      state:{
        data:'edit'
      }
    }
    this.router.navigate(['/emergency'],navigationExtras);
  }
  triggerEmergency(){
    this.router.navigate(['/shake']);
  }

}
