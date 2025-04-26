import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController, NavController, ToastController, } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { DoctorService } from 'src/app/services/doctor.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[IonicModule, ReactiveFormsModule, CommonModule]
})
export class BookingComponent  implements OnInit {

  docId :any;
  isSuccess = false;
  bookingData:any=[];
  isBooked = false;

  bookingForm = new FormGroup({
    date: new FormControl('',[Validators.required]),
    time: new FormControl('',[Validators.required]),
    illness: new FormControl('',[Validators.required])
  })

  constructor(private toastController:ToastController,
    private message:Messages,
    private sharedJson:SharedDataService,
    private doctorService: DoctorService,
    private activatedRoutes:ActivatedRoute, 
    private router:Router,
    private ngZone:NgZone,
    private navCtrl:NavController,
    private lc:LoadingController
  ) { 
    this.activatedRoutes.queryParams.subscribe(()=>{
      if(this.router?.getCurrentNavigation()?.extras.state){
        let val = this.router.getCurrentNavigation()!.extras.state;
        this.docId = val!['value'] ? val!['value'] : '';
        
      }
    })

  }

  ngOnInit() {}
  goBack(){
    this.navCtrl.back()

  }
  onSubmit(){
    if(this.bookingForm.valid){
      this.isSuccess = true;
      if(this.docId){
        this.doctorService.setConsultingDoc(this.docId, this.bookingForm.value).subscribe(async (res)=>{
          if(res){
            let model = {BOOKING_ID:'',DATE:'',TIME:'',ILLNESS:'', STATUS:false};
            model.BOOKING_ID = res
            model.DATE = this.bookingForm.value.date!;
            model.TIME = this.bookingForm.value.time!;
            model.ILLNESS = this.bookingForm.value.illness!;
            model.STATUS = true;
  
            this.sharedJson.booking.push(model);
            
            this.ngZone.run(()=>{
              this.bookingData = model;
            })
            this.setToast(this.message.successMessage);
            const loading = await this.lc.create({
              duration:2000,
              spinner:'lines'
            });
            await loading.present();
            setTimeout(() => {
              this.isBooked = true;
            }, 1000);
          }
        })

      }else{
        console.log('doc id is not present')
      }

    }else{
      this.isSuccess = false;
      this.setToast(this.message.missingFields)
    }
  }
  cancelBooking(id: number) {
    this.doctorService.cancelBooking(id).subscribe((res) => {
      if (res) {
        for (let k of this.sharedJson.booking) {
          if (k.DOCT_ID == id) {
            let indx = this.sharedJson.booking.findIndex((m: { DOCT_ID: number; }) => m.DOCT_ID === id);
            if (indx !== -1) {
              this.ngZone.run(() => {
                this.sharedJson.booking[indx].STATUS = false;
                this.isBooked= false;
              })
            }
          }
        }
      }
    })
  }
  async setToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      mode: 'ios',
      color: this.isSuccess ? 'success' : 'danger'
    });
    await toast.present();
  }


}
