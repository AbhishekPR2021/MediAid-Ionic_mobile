import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule, IonNav, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { EmergencyPagePage } from 'src/app/pages/emergency-page/emergency-page.page';
import { EmergencyService } from 'src/app/services/emergency.service';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
  imports:[IonicModule,CommonModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyComponent  implements OnInit {
  emergencyMode:any={}
  isEdit=false;
  emergencyForm= new FormGroup({
    name:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required,Validators.minLength(10)]),
    altPhoneNumber:new FormControl('',[Validators.required,Validators.minLength(10)]),
    age:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    hospitalContact:new FormControl('',[Validators.required]),
    location:new FormControl('',[Validators.required]),
    report:new FormControl('',[Validators.required]),

  })

  constructor(private http:HttpService,private mapping:MappingService,private router:Router,private navCtrl:NavController, private toastController:ToastController,
    private activatedRoutes:ActivatedRoute,
    private sharedJson:SharedDataService, private message:Messages, private emergencyService:EmergencyService
  ) { 
    this.activatedRoutes.queryParams.subscribe(()=>{
      if(this.router?.getCurrentNavigation()?.extras.state){
        let val = this.router.getCurrentNavigation()!.extras.state;
        this.isEdit = val!['data']=='edit' ? true:false
      }
    })

  }
  prevComponent=EmergencyPagePage
  isSuccess:boolean=false
  
  ngOnInit() {
    this.emergencyMode = this.http.getModel(this.mapping.getEmergencyModelUrl).subscribe((res)=>{
      
      this.emergencyMode = res
    })
  }
  goBack(){
    this.navCtrl.back();
  }
  onSubmit(){
    if(this.emergencyForm.valid){
      if(this.isEdit){
        this.emergencyService.editPrimaryContact(this.emergencyForm.value).subscribe((res)=>{
          if(res){
            let model = {ID:'',NAME:'', PHONE_NUMBER:'',ALTERNATE_PHONE_NUMBER:'', AGE:'', ADDRESS:'', HOSPITAL_CONTACT:'', LOCATION:'', REPORT:''};
            model.NAME = this.emergencyForm.value.name!;
            model.PHONE_NUMBER = this.emergencyForm.value.phoneNumber!;
            model.ALTERNATE_PHONE_NUMBER = this.emergencyForm.value.altPhoneNumber!;
            model.AGE = this.emergencyForm.value.age!;
            model.ADDRESS = this.emergencyForm.value.address!;
            model.HOSPITAL_CONTACT = this.emergencyForm.value.hospitalContact!;
            model.LOCATION = this.emergencyForm.value.location!;
            model.REPORT = this.emergencyForm.value.report!;
            model.ID = res;
    
            this.sharedJson.emergency.push(model)
            this.setToast(this.message.successMessage);
            setTimeout(() => {
              this.goBack();
            }, 2000);
          }
        });
      }
      this.isSuccess = true;
      this.emergencyService.setPrimaryContact(this.emergencyForm.value).subscribe((res)=>{
        if(res){
          let model = {ID:'',NAME:'', PHONE_NUMBER:'',ALTERNATE_PHONE_NUMBER:'', AGE:'', ADDRESS:'', HOSPITAL_CONTACT:'', LOCATION:'', REPORT:''};
          model.NAME = this.emergencyForm.value.name!;
          model.PHONE_NUMBER = this.emergencyForm.value.phoneNumber!;
          model.ALTERNATE_PHONE_NUMBER = this.emergencyForm.value.altPhoneNumber!;
          model.AGE = this.emergencyForm.value.age!;
          model.ADDRESS = this.emergencyForm.value.address!;
          model.HOSPITAL_CONTACT = this.emergencyForm.value.hospitalContact!;
          model.LOCATION = this.emergencyForm.value.location!;
          model.REPORT = this.emergencyForm.value.report!;
          model.ID = res;
  
          this.sharedJson.emergency.push(model)
          this.setToast(this.message.successMessage);
          setTimeout(() => {
            this.goBack();
          }, 2000);
        }
      })
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
