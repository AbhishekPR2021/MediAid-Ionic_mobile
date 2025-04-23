import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergency-page',
  templateUrl: './emergency-page.page.html',
  styleUrls: ['./emergency-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
