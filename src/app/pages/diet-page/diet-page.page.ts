import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-diet-page',
  templateUrl: './diet-page.page.html',
  styleUrls: ['./diet-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DietPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
