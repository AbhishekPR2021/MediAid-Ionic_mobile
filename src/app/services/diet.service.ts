import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private sqliteService: SqliteService,
    private sqlService:SqliteService
  ) { }
  addDiet(data:any):Observable<any>{
    return new Observable((observer)=>{
      this.sqliteService.addDiet(data.courseName, data.duration, data.description, data.videos).then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  getDiet():Observable<any>{
    return new Observable((observer)=>{
      this.sqliteService.getDiet().then((res)=>{
        observer.next(res);
        observer.complete();
      })
    })
  }
  deleteDiet(id:number):Observable<any> {
    return new Observable((observer)=>{
      this.sqlService.deleteDiet(id).then((res)=>{
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

}
