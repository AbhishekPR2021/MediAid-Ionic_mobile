import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePagePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  updateProfile(){
    this.router.navigate(['/register'])
  }
}
