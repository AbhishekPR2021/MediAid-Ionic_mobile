import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-page',
  templateUrl: './emergency-page.page.html',
  styleUrls: ['./emergency-page.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmergencyPagePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  updateDetails(){
    this.router.navigate(['/emergency']);
  }

}
