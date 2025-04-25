import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private sqlService:SqliteService) { }
  addMedicine(data:any):Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.addMedicine(data.name, data.time, data.completion).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  getMedicine():Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.getMedicine().then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  deleteMedicine(id:any):Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.deleteMedicine(id).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  setTimeForMedicine():Observable<any>{
    return new Observable((observer)=>{

    })
  }
  
}
