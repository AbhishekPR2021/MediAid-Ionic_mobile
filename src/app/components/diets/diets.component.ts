import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.scss'],
  imports:[IonicModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DietsComponent  implements OnInit {
  dietModel:any={}
  constructor(private http:HttpService,private mapping:MappingService,private router:Router,private navCtrl:NavController) { }

  ngOnInit() {
    this.dietModel = this.http.getModel(this.mapping.getDietModelUrl).subscribe((res)=>{
      
      this.dietModel = res
      console.log(this.dietModel.subPhases)

    })

  }
  goBack(){
    this.navCtrl.back()
  }
}
