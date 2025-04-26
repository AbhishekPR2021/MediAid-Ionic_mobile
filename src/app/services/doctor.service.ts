import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SqliteService } from './sqlite.service';
import { SmsManager } from '@byteowls/capacitor-sms';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private sqlService:SqliteService) { }
  addDoctor(data:any):Observable<any> {
    return new Observable((observer) => {
      this.sqlService.addDoctors(data.name, data.address, data.phoneNumber, data.specialized).then((res) => {
        observer.next(res);
        observer.complete();
      }).catch((err) => {
        observer.error(err);
      })
    })

  }
  getDoctor():Observable<any> {
    return new Observable((observer)=>{
      this.sqlService.getDoctors().then((res)=>{
        observer.next(res)
      })
    })
   }
   getBooking():Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.getBooking().then((res)=>{
        observer.next(res);
      })
    })
   }
  deleteDoctor(id:number):Observable<any> {
    return new Observable((observer)=>{
      this.sqlService.deleteDoctors(id).then((res)=>{
        if(res){
          observer.next(true);
          observer.complete();
        }else{
          observer.next(false);
          observer.complete();
        }
      })
    })
   }
  setConsultingDoc(id:number, data:any):Observable<any> {
    return new Observable((observer)=>{
      this.sqlService.bookDoc(id, data.date, data.time, data.illness).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
   }
   cancelBooking(id:number):Observable<any> {
    return new Observable((observer)=>{
      this.sqlService.cancelBooking(id).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
   }
   

}
