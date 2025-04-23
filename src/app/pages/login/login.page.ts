import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[ReactiveFormsModule,IonicModule]

})
export class LoginPage implements OnInit {

  isSuccess:boolean=false;
  loginForm=new FormGroup({
    userName:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])

  })

  constructor(private router:Router,private message:Messages,private toastController:ToastController) { }

  ngOnInit() {
  }
  register(){
    this.router.navigate(['register'])
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.isSuccess=true
      //check authentication
    }else{
      this.isSuccess=false
      this.setToast(this.message.missingFields)
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
