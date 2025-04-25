import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-emergency-page',
  templateUrl: './emergency-page.page.html',
  styleUrls: ['./emergency-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyPagePage implements OnInit {
  sharedEmeregency:any;
  sharedUser:any;
  sharedDoc:any;

  constructor(private router:Router,private sharedJson:SharedDataService) { }

  ngOnInit() {
    this.sharedEmeregency = this.sharedJson.emergency[0];
    this.sharedUser = this.sharedJson.user;
    this.sharedDoc = this.sharedJson.doctors[0]
    console.log('this.sharedEmeregency',this.sharedEmeregency)
  }
  updateDetails(){
    this.router.navigate(['/emergency']);
  }
  triggerEmergency(){
    this.router.navigate(['/shake']);
  }

}
