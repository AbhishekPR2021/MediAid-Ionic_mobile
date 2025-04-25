import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private sqlService:SqliteService) { }
  setPrimaryContact(data:any):Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.addEmergency(data.name, data.phoneNumber, data.altPhoneNumber, data.age, data.address, data.location, data.report).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  getPrimaryContact():Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.getEmergency().then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  deletePrimaryContact(id:number):Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.deleteEmergency(id).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  // callEmergency():Observable{
  //   return new Observable((observer)=>{

  //   })
  // }
  // cancelEmergency():Observable{
  //   return new Observable((observer)=>{

  //   })
  // }
  // setLocation():Observable{
  //   return new Observable((observer)=>{

  //   })
  // }
  
}
