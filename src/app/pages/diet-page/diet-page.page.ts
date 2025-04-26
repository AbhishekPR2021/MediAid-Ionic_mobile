import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DietService } from 'src/app/services/diet.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-diet-page',
  templateUrl: './diet-page.page.html',
  styleUrls: ['./diet-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule, ReactiveFormsModule]
})
export class DietPagePage implements OnInit {

  deleteActions:boolean=false
  editActions:boolean=false
  sharedDiet:any;
  constructor(private router:Router,private sharedJson:SharedDataService,
    private dietService:DietService,
    private ngZone:NgZone
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.sharedDiet = this.sharedJson.diets;

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
  addDiet(){
    this.router.navigate(['/addDiet'])
  }
  deleteDiet(id:number){
    console.log('id',id)
    this.dietService.deleteDiet(id).subscribe((res)=>{
      if(res){
        for(let k of this.sharedJson.doctors){
          if(k.DOCT_ID == id){
            let indx = this.sharedJson.doctors.findIndex((m: { DOCT_ID: number; })=>m.DOCT_ID=== id);
            if(indx !==-1){
              this.ngZone.run(()=>{
                this.sharedJson.doctors.splice(indx,1)
            })
          }
        }
      }

      }
    })
  }
  editDiet(){

  }


}
