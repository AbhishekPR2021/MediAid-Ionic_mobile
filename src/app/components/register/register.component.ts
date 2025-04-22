import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule,CommonModule,FormsModule]
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email],),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(6)]),
    cpassword: new FormControl('', [Validators.required])
  })
  warning:boolean=false;
  wmessage!:string
  isSuccess:boolean=false;
  constructor(private fb: FormBuilder, private ac: AlertController, private messages:Messages,
    private toastController:ToastController
  ) {
  }

  ngOnInit() {
  }
  // Handle form submission
  async onSubmit() {
    if(this.registrationForm.valid){
      if(this.registrationForm.value.password!=this.registrationForm.value.cpassword){
        this.warning=!this.warning
        this.wmessage = this.messages.passwordMissmatch
const toast = await this.toastController.create({
    message: this.wmessage,
    duration: 3000,
    position: 'bottom',
    mode:'ios',
    color: this.isSuccess ? 'success' : 'danger' // 👈 conditional color
  });

  await toast.present();
      }else{
        this.isSuccess=true
        this.wmessage= this.messages.successMessage
const toast = await this.toastController.create({
    message: this.wmessage,
    duration: 3000,
    position: 'bottom',
    mode:'ios',
    color: this.isSuccess ? 'success' : 'danger' // 👈 conditional color
  });

  await toast.present();
      }
      console.log('form submitted',this.registrationForm.value)
    }else{
      this.warning=!this.warning
      this.wmessage = this.messages.missingFields
     const toast = await this.toastController.create({
    message: this.wmessage,
    duration: 3000,
    position: 'bottom',
    mode:'ios',
    color: this.isSuccess ? 'success' : 'danger' // 👈 conditional color
  });

  await toast.present(); 
      console.log('form is invalid')
    }
  }
  warningClose(){
    this.warning=false
  }

  }
