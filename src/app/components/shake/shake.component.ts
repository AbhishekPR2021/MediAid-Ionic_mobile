import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';

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

  constructor(private navCtrl: NavController, private toastController:ToastController, private message:Messages) { }

  ngOnInit() {
    NativeAudio.preload({
      assetId:"security_alarm",
      assetPath:"security_alarm.mp3",
      audioChannelNum:1,
      isUrl:false
    })
    console.log('preload completed')
    this.startCountdown();
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
  initiateProcess(){
    try{
      console.log('initiate process')
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


}
