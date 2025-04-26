import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.page.html',
  styleUrls: ['./doctor-page.page.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctorPagePage implements OnInit {

  isAuthenticated:boolean = false;
  deleteActions:boolean=false
  editActions:boolean=false
  constructor(private router:Router, private sharedJson:SharedDataService,private doctoservice:DoctorService, private ngZone:NgZone) { }
  sharedDoctor:any
  ngOnInit() {
    this.isAuth();

  }
  ionViewWillEnter(){
    this.sharedDoctor = this.sharedJson.doctors;

  }
  initLoader(){
    this.router.navigate(['/loader'])
  }
  isAuth(){
    // if(!this.isAuthenticated){
    //   this.router.navigate(['login'])
    // }
  }
  addDoctor(){
    this.router.navigate(['/addDoctor'])
  }
  deleteAction(){
    this.deleteActions=true
  }
  clear(){
    this.deleteActions=this.editActions = false
  }
  editAction(){
    this.editActions=true
  }
  deleteDoctor(id:number){
    this.doctoservice.deleteDoctor(id).subscribe((res)=>{
      if(res){
        for(let k of this.sharedJson.doctors){
          if(k.DOCT_ID == id){
            let indx = this.sharedJson.doctors.findIndex((m: { DOCT_ID: number; })=>m.DOCT_ID=== id);
            if(indx !==-1){
              this.ngZone.run(()=>{
                this.sharedJson.doctors.splice(indx,1)
            })
          }
        }
      }

      }
    })
  }
}
