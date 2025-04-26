import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { LoaderPage } from 'src/app/pages/loader/loader.page';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

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
  isEdit:boolean=false;
  doctorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
    specialized: new FormControl('', [Validators.required])
  })
  constructor(private http: HttpService, private mapping: MappingService, private router: Router, private toastController: ToastController,
    private message: Messages, private navCtrl:NavController, private docService:DoctorService,private sharedJson:SharedDataService, private activatedRoutes:ActivatedRoute
  ) {
    this.activatedRoutes.queryParams.subscribe(()=>{
      if(this.router?.getCurrentNavigation()?.extras.state){
        let val = this.router.getCurrentNavigation()!.extras.state;
        this.isEdit = val!['data']=='edit' ? true:false
      }
    })
  }

   

  ngOnInit() {
    this.doctorsModel = this.http.getModel(this.mapping.getDoctorModelUrl).subscribe((res) => {

      this.doctorsModel = res

    })

  }
  goBack() {
    this.navCtrl.back()
  }
  onSubmit() {
    if (this.doctorForm.valid) {
      this.isSuccess = true
      if(this.isEdit){
        this.docService
      }else{
        this.docService.addDoctor(this.doctorForm.value).subscribe((res)=>{
          if(res){
            let model = {DOCT_ID:'',NAME:'',PHONE_NUMBER:'',SPECIALIZED:'',ADDRESS:''};
            model.DOCT_ID = res
            model.NAME = this.doctorForm.value.name!;
            model.PHONE_NUMBER = this.doctorForm.value.phoneNumber!;
            model.SPECIALIZED = this.doctorForm.value.specialized!;
            model.ADDRESS = this.doctorForm.value.address!;
  
            this.sharedJson.doctors.push(model);
            this.setToast(this.message.successMessage);
            setTimeout(() => {
              this.goBack();
            }, 2000);
          }
        })
      }

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
