import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { EmergencyService } from 'src/app/services/emergency.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoaderPage implements OnInit {

  constructor(private router:Router,private authService:AuthService, private sqliteService:SqliteService, private sharedJson: SharedDataService, private docService:DoctorService,
    private mediService:MedicineService, private emergencyService:EmergencyService
  ) {
  }


  ngOnInit() {
    this.sqliteService.intiDb();
    this.navigate()
  }
  navigate() {
    
    setTimeout(() => {
      this.authService.getUserData().subscribe((res)=>{
        console.log('loader data user',res);
        if(res[0].IS_AUTH == 1){
          this.authService.authorized = true;
          this.sharedJson.user = res[0];
          console.log('this.sharedJson.user',this.sharedJson.user)
          this.getDocDetails();
          this.getMedicineDetails();
          this.getEmeregencyDetails();
          this.router.navigate(['/tabs'])
        }else{
          this.router.navigate(['/login'])
        }
      })
    }, 3000);
  }
  ionViewWillEnter(){
    this.navigate()
  }
  getDocDetails(){
    this.docService.getDoctor().subscribe((res)=>{
      let datas:any=[]
      for(let i of res){
        datas.push(i)
      }
      this.sharedJson.doctors = datas;
      console.log('this.sharedJson.doctors',this.sharedJson.doctors)
    })
  }
  getMedicineDetails(){
    this.mediService.getMedicine().subscribe((res)=>{
      let datas:any=[]
      for(let i of res){
        datas.push(i)
      }
      this.sharedJson.medicine = datas;
      console.log('this.sharedJson.medicine',this.sharedJson.medicine)
    })
  }
  getEmeregencyDetails(){
    this.emergencyService.getPrimaryContact().subscribe((res)=>{
      let datas:any=[];
      for(let i of res){
        datas.push(i)
      }
      this.sharedJson.emergency = datas;
      console.log('this.sharedJson.emergency',this.sharedJson.emergency)

    })
  }

}
