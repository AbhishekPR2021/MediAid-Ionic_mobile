import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SmsManager } from '@byteowls/capacitor-sms';
import { NativeAudio } from '@capacitor-community/native-audio';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { EmergencyModel } from 'src/app/models/EmergenctModel';
import { Messages } from 'src/app/models/messages';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[IonicModule,CommonModule]
})
export class ShakeComponent  implements OnInit {
  countDownValue = 5;
  emergencyActive = false;
  stop:boolean=false;
  userData:any;
  emergencyData:EmergencyModel = new EmergencyModel();
  liveloc:any;


  constructor(private navCtrl: NavController, private toastController:ToastController, private message:Messages, private sharedJson:SharedDataService, ) { }

  ngOnInit() {
    this.userData=this.sharedJson.user;
    this.emergencyData=this.sharedJson.emergency?? this.emergencyData;

    NativeAudio.preload({
      assetId:"security_alarm",
      assetPath:"security_alarm.mp3",
      audioChannelNum:1,
      isUrl:false
    })
    this.startCountdown();
  }
  ionViewWillEnter(){
    this.emergencyData=this.sharedJson.emergency[0]?? this.emergencyData;
  }
  goBack(){
    this.navCtrl.back()

  }
  startCountdown(){
    const countdownTimer = setInterval(() => {
      if(this.countDownValue>0){
        this.countDownValue--;
        if(this.stop){
          this.countDownValue = 5;
          clearInterval(countdownTimer);
        }
      }else{
        this.initiateProcess();
        clearInterval(countdownTimer);
      }
    }, 1000);
  }
  stopCountdown(){
    this.stop = true;
    this.setToast(this.message.emergencyStopped);
    NativeAudio.stop({
      assetId:'security_alarm'
    })
  }
  async initiateProcess(){
    try{
      let numbers :string[]=[this.emergencyData.ALTERNATE_PHONE_NUMBER? this.emergencyData.ALTERNATE_PHONE_NUMBER.toString():'', this.emergencyData.HOSPITAL_CONTACT ? this.emergencyData.HOSPITAL_CONTACT.toString(): '' ,'1234567890']
      
      // let numbers = ['2342342342']
      let date = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      await this.fetchGeoLocation()
      SmsManager.send({
        numbers:numbers,
        text:"THIS IS AN EMERGENCY INITIATED BY "+this.userData.NAME.toUpperCase()+" \n"+this.userData.NAME.toUpperCase() +" IS FACING AN MEDICAL EMERGENCY AND NEEDS IMMEDIATE ATTENTION \n FOLLOWING ARE THE LOCATION DETAILS:\n"+"BLOOD GROUP: "+this.userData.BLOOD_GROUP
        +"\nPHONE NUMBER: "+this.userData.PHONE_NUMBER+"\n LOCATION: "+this.emergencyData.LOCATION +"\n ADDRESS: "+ this.emergencyData.ADDRESS+"\n Live location: \nLongitude: "+this.liveloc.longitude+"\nlatitude : "+this.liveloc.latitude +"\n\n Note: This message is generated for TESTING purpose form a medical support app MEDI AID on "+date
      }).then(()=>{

      }).catch(err=>{
        console.log(err)
      })
      NativeAudio.loop({
        assetId:'security_alarm'
      })
  
    }catch(err){
      console.log('audio err',err)
    }
  }
  async setToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      mode: 'ios',
      color: 'success'
    });
    await toast.present();
  }
  async fetchGeoLocation(){
    await Geolocation.getCurrentPosition().then(res=>{
      this.liveloc=  res.coords;
    })
  }



}
