import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoaderPage implements OnInit {

  constructor(private router:Router,private authService:AuthService, private sqliteService:SqliteService) {
  }


  ngOnInit() {
    this.sqliteService.intiDb();
    this.navigate()
  }
  navigate() {
    setTimeout(() => {
      if (this.authService.authorized) {
        this.router.navigate(['/tabs'])
      } else {
        this.router.navigate(['/login'])
      }
    }, 3000);
  }
  ionViewWillEnter(){
    this.navigate()
  }

}
