import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, IonNav, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { EmergencyPagePage } from 'src/app/pages/emergency-page/emergency-page.page';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
  imports:[IonicModule,CommonModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyComponent  implements OnInit {
  emergencyMode:any={}
  emergencyForm= new FormGroup({
    name:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required,Validators.minLength(10)]),
    altPhoneNumber:new FormControl('',[Validators.required,Validators.minLength(10)]),
    age:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    location:new FormControl('',[Validators.required]),
    report:new FormControl('',[Validators.required]),

  })

  constructor(private http:HttpService,private mapping:MappingService,private router:Router,private navCtrl:NavController, private toastController:ToastController,
    private message:Messages
  ) { }
  prevComponent=EmergencyPagePage
  isSuccess:boolean=false
  ngOnInit() {
    this.emergencyMode = this.http.getModel(this.mapping.getEmergencyModelUrl).subscribe((res)=>{
      
      this.emergencyMode = res
      console.log(this.emergencyMode.subPhases)
    })
  }
  goBack(){
    this.navCtrl.back()
  }
  onSubmit(){
    if(this.emergencyForm.valid){
      this.isSuccess = true;
      this.setToast(this.message.successMessage)
      console.log('emergency data added', this.emergencyForm.value);
    }else{
      this.isSuccess=false;
      this.setToast(this.message.missingFields);
    }
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
