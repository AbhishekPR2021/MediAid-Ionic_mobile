import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  addMedicine(){
    this.router.navigate(['/addMedicine'])
  }

}
