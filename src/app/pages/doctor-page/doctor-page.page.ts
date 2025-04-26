import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
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
  constructor(private router:Router, private sharedJson:SharedDataService,private doctoservice:DoctorService, private ngZone:NgZone,
    private toastController:ToastController,
    private message:Messages
  ) { }
  sharedDoctor:any;
  sharedUser:any;
  sharedBooking:any;
  ngOnInit() {
    this.isAuth();

  }
  ionViewWillEnter(){
    this.sharedDoctor = this.sharedJson.doctors;
    this.sharedUser = this.sharedJson.user[0];
    this.sharedBooking = this.sharedJson.booking


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
  consultDoctor(id:number){
    const navigationExtras={
      state:{
        data:'booking',
        value: id

      }
    }

    this.router.navigate(['/booking'],navigationExtras)
  }
  async setToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      mode: 'ios',
      color:'success'
    });
    await toast.present();
  }

}
