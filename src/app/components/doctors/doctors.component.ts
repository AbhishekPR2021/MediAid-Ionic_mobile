import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  imports: [IonicModule, CommonModule,ReactiveFormsModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DoctorsComponent implements OnInit {

  isSuccess: boolean = false;
  doctorsModel: any = {};
  doctorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
    specialized: new FormControl('', [Validators.required])
  })
  constructor(private http: HttpService, private mapping: MappingService, private router: Router, private toastController: ToastController,
    private message: Messages, private navCtrl:NavController
  ) { }

  ngOnInit() {
    debugger
    this.doctorsModel = this.http.getModel(this.mapping.getDoctorModelUrl).subscribe((res) => {

      this.doctorsModel = res
      console.log(this.doctorsModel.subPhases)

    })

  }
  goBack() {
    this.navCtrl.back()
  }
  onSubmit() {
    if (this.doctorForm.valid) {
      this.isSuccess = true
      console.log(this.doctorForm.value)
      this.setToast(this.message.successMessage)
    } else {
      this.isSuccess = false;
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
