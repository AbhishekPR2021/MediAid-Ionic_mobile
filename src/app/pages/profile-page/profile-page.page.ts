import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
