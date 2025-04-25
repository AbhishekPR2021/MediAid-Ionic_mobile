import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.page.html',
  styleUrls: ['./doctor-page.page.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctorPagePage implements OnInit {

  isAuthenticated:boolean = false;
  deleteActions:boolean=false
  editActions:boolean=false
  constructor(private router:Router, private sharedJson:SharedDataService) { }
  sharedDoctor:any
  ngOnInit() {
    this.isAuth();

  }
  ionViewWillEnter(){
    this.sharedDoctor = this.sharedJson.doctors;
    console.log('this.sharedDoctor',this.sharedDoctor)

  }
  initLoader(){
    this.router.navigate(['/loader'])
  }
  isAuth(){
    // if(!this.isAuthenticated){
    //   this.router.navigate(['login'])
    // }
  }
  addDoctor(){
    console.log('add doc')
    this.router.navigate(['/addDoctor'])
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
}
