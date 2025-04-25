import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-diet-page',
  templateUrl: './diet-page.page.html',
  styleUrls: ['./diet-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule]
})
export class DietPagePage implements OnInit {

  deleteActions:boolean=false
  editActions:boolean=false
  sharedDiet:any;
  constructor(private router:Router,private sharedJson:SharedDataService) { }

  ngOnInit() {
    this.sharedDiet = this.sharedJson.diets;
    console.log('this.sharedDiet',this.sharedDiet)
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


}
