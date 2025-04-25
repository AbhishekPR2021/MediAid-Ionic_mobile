import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SqliteService } from './sqlite.service';

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
  setConsultingDoc():Observable<any> {
    return new Observable((observer)=>{
      
    })
   }

}
