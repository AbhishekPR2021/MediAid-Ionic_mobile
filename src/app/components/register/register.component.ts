import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, CommonModule, FormsModule, IonicModule]
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email],),
    age: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
    password: new FormControl('', [Validators.minLength(6)]),
    cpassword: new FormControl('', [Validators.required])
  })
  warning: boolean = false;
  wmessage!: string
  isSuccess: boolean = false;
  constructor(private fb: FormBuilder, private ac: AlertController, private messages: Messages,
    private toastController: ToastController, private router: Router, private navCtrl: NavController, private authService:AuthService
  ) {
  }

  ngOnInit() {
  }
  // Handle form submission
  async onSubmit() {
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.password != this.registrationForm.value.cpassword) {
        this.warning = !this.warning
        this.setToast(this.messages.passwordMissmatch);
      } else {
        this.authService.addUser(this.registrationForm.value).subscribe((res)=>{
          if(res=='success'){
            this.isSuccess = true
            this.setToast(this.messages.successMessage);    
            console.log('form submitted CONFIRM', this.registrationForm.value);
            setTimeout(()=>{
              this.router.navigate(['/login'])
            },2000)
          }
        })
      }
    } else {
      this.warning = !this.warning
      this.wmessage = this.messages.missingFields
      this.setToast(this.messages.missingFields);
    }
  }
  warningClose() {
    this.warning = false
  }
  goBack() {
    this.navCtrl.back()
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
