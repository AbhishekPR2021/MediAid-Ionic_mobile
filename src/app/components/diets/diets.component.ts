import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isEdit = false;
  editId!:any;
  dietForm = new FormGroup({
    courseName: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    videos: new FormControl('',[Validators.required])
  })

  constructor(private sharedJson:SharedDataService, private dietService: DietService ,private toastController:ToastController, 
    private http:HttpService,private mapping:MappingService,private router:Router,private navCtrl:NavController, 
    private message:Messages,
    private ngZone:NgZone,
    private activatedRoutes:ActivatedRoute
  ) {
    this.activatedRoutes.queryParams.subscribe(()=>{
      if(this.router?.getCurrentNavigation()?.extras.state){
        let val = this.router.getCurrentNavigation()!.extras.state;
        this.isEdit = val!['data']=='edit' ? true:false
        if(this.isEdit){
          this.editId = val!['value'];
        }
      }
    })

   }

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
      if(this.isEdit){
        this.isSuccess = true;
        this.dietService.ediDiet(this.dietForm.value,this.editId).subscribe((res)=>{
          if(res){
            let model = {DIET_ID:'', COURSE_NAME:'', DURATION:'',DESCRIPTION:'',VIDEOS:''
            }
            model.DIET_ID = this.editId;
            model.COURSE_NAME = this.dietForm.value.courseName!;
            model.DESCRIPTION = this.dietForm.value.description!;
            model.DURATION = this.dietForm.value.duration!;
            model.VIDEOS = this.dietForm.value.videos!;

            //first remove the older data
            console.log('diet json',this.sharedJson.diets)
            for(let k of this.sharedJson.diets){
              if(k.DIET_ID == this.editId){
                console.log('id')
                let indx = this.sharedJson.diets.findIndex((m: { DIET_ID: number; })=>m.DIET_ID=== this.editId);
                if(indx !==-1){
                  this.ngZone.run(()=>{
                    console.log('diet json',this.sharedJson.diets)
                    this.sharedJson.diets.splice(indx,1)
                })
              }
            }
          }
          console.log('pushin ')
          // then add new respo
            this.ngZone.run(()=>{
              this.sharedJson.diets.push(model);
              console.log('diet json',this.sharedJson.diets)
            })
            
            this.setToast(this.message.successMessage);
            setTimeout(()=>{
              this.goBack();
            },2000)
  
          }
        })
  
      }else{
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
      }
     
      
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
