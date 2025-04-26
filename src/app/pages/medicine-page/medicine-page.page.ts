import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MedicineService } from 'src/app/services/medicine.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-medicine-page',
  templateUrl: './medicine-page.page.html',
  styleUrls: ['./medicine-page.page.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicinePagePage implements OnInit {
  deleteActions:boolean=false
  editActions:boolean=false
  sharedMedicine:any;

  constructor(private router:Router,private sharedJson:SharedDataService,private medicinService:MedicineService, private toastController:ToastController, private ngZone:NgZone) { }

  ngOnInit() {
    this.sharedMedicine = this.sharedJson.medicine;
  }

  deleteAction(){
    this.deleteActions=true
  }
  clear(){
    this.deleteActions=this.editActions = false
  }
  editAction(){
    this.editActions=true
  }
  addMedicine(){
    this.router.navigate(['/addMedicine'])
  }
  deleteMedicine(id:number){
    this.medicinService.deleteMedicine(id).subscribe((res)=>{
      if(res){
        for(let k of this.sharedJson.medicine){
          if(k.MEDICINE_ID == id){
            let indx = this.sharedJson.medicine.findIndex((m: { MEDICINE_ID: number; })=>m.MEDICINE_ID=== id);
            if(indx !==-1){
              this.ngZone.run(()=>{
                this.sharedJson.medicine.splice(indx,1)
            })
          }
        }
      }
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
  demo(s:any){
  }


}
