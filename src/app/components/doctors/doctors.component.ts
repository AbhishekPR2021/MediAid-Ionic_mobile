import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  imports:[IonicModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class DoctorsComponent  implements OnInit {

  doctorsModel:any={}
  constructor(private http:HttpService,private mapping:MappingService) { }

  ngOnInit() {
    this.doctorsModel = this.http.getModel(this.mapping.getDoctorModelUrl).subscribe((res)=>{
      
      this.doctorsModel = res
      console.log(this.doctorsModel.subPhases)

    })

  }

}
