import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
  imports:[IonicModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicinesComponent  implements OnInit {
  medicineModel:any={}
  constructor(private http:HttpService,private mapping:MappingService) { }

  ngOnInit() {
    this.medicineModel = this.http.getModel(this.mapping.getMedicineModelUrl).subscribe((res)=>{
      
      this.medicineModel = res
      console.log(this.medicineModel.subPhases)

    })

  }

}
