import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
  imports:[IonicModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyComponent  implements OnInit {
  emergencyMode:any={}

  constructor(private http:HttpService,private mapping:MappingService) { }

  ngOnInit() {
    this.emergencyMode = this.http.getModel(this.mapping.getEmergencyModelUrl).subscribe((res)=>{
      
      this.emergencyMode = res
      console.log(this.emergencyMode.subPhases)

    })

  }

}
