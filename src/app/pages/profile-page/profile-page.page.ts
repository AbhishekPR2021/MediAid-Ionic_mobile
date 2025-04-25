import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePagePage implements OnInit {
  isSuccess = false;
  constructor(private router:Router,private sharedJson:SharedDataService, private authService: AuthService, private toastController:ToastController, private message:Messages) { }

  ngOnInit() {
  }
  updateProfile(){
    this.router.navigate(['/register'])
  }
  logOut(){
    console.log('this.sharedJson.user.email',this.sharedJson.user.email)
    this.authService.logOut(this.sharedJson.user.email).subscribe((res)=>{
      if(res){
        setTimeout(()=>{
          this.authService.authorized = false;
          this.setToast(this.message.logoutMessage)
          this.router.navigate(['/loader'])
        },1000)
  
      }
    })

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
