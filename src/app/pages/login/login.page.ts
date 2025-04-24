import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[ReactiveFormsModule,IonicModule]

})
export class LoginPage implements OnInit {
  isAuthenticated:boolean = false;
  isSuccess:boolean=false;
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])

  })

  constructor(private router:Router,private message:Messages,private toastController:ToastController,private authService:AuthService) { }

  ngOnInit() {

  }
  register(){
    this.router.navigate(['register'])
  }
  onSubmit(){
    if(this.loginForm.valid){
      debugger
      this.isSuccess=true
      //check authentication
      this.authService.getAuth(this.loginForm.value).subscribe((res)=>{
        if(res){
          this.authService.authorized = this.isAuthenticated = true
          this.router.navigate(['/tabs'])
        }else{
          this.isSuccess=false;
          this.setToast(this.message.authenticationFailed)
        }
      })
     
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
