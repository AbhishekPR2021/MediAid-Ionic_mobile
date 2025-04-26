import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Messages } from 'src/app/models/messages';
import { DietService } from 'src/app/services/diet.service';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.scss'],
  imports:[IonicModule,CommonModule, ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DietsComponent  implements OnInit {
  dietModel:any={}
  isSuccess=false;
  dietForm = new FormGroup({
    courseName: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    videos: new FormControl('',[Validators.required])
  })

  constructor(private sharedJson:SharedDataService, private dietService: DietService ,private toastController:ToastController, private http:HttpService,private mapping:MappingService,private router:Router,private navCtrl:NavController, private message:Messages) { }

  ngOnInit() {
    this.dietModel = this.http.getModel(this.mapping.getDietModelUrl).subscribe((res)=>{
      
      this.dietModel = res

    })

  }
  goBack(){
    this.navCtrl.back()
  }
  onSubmit(){
    
    if(this.dietForm.valid){
      this.isSuccess = true;
      this.dietService.addDiet(this.dietForm.value).subscribe((res)=>{
        if(res){
          let model = {DIET_ID:'', COURSE_NAME:'', DURATION:'',DESCRIPTION:'',VIDEOS:''
          }
          model.DIET_ID = res;
          model.COURSE_NAME = this.dietForm.value.courseName!;
          model.DESCRIPTION = this.dietForm.value.description!;
          model.DURATION = this.dietForm.value.duration!;
          model.VIDEOS = this.dietForm.value.videos!;

          this.sharedJson.diets.push(model);
          this.setToast(this.message.successMessage);
          setTimeout(()=>{
            this.goBack();
          },2000)

        }
      })
      
    }else{
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
