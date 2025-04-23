import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit() {
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
