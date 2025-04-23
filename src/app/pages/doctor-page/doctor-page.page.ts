import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.page.html',
  styleUrls: ['./doctor-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctorPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
