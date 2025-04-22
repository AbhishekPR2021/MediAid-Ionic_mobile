import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoaderPage implements OnInit {

  constructor(private router:Router) {
  }
   

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 3000);
  }


}
