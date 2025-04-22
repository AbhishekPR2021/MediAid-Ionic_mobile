import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  insertUser(data:any){
    console.log('service user',data)
  }
  getUserDetails(id:any){
    
  }
}
