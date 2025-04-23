import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
