import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoginPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  register(){
    this.router.navigate(['register'])
  }

}
