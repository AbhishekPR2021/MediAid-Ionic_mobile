import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

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
  sharedMedicine:any;

  constructor(private router:Router,private sharedJson:SharedDataService) { }

  ngOnInit() {
    this.sharedMedicine = this.sharedJson.medicine;
    console.log('this.sharedMedicine',this.sharedMedicine)
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
