import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine-page',
  templateUrl: './medicine-page.page.html',
  styleUrls: ['./medicine-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MedicinePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
