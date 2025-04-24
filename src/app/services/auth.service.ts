import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authorized:boolean=false
  params=[]
  constructor(private sqlService:SqliteService) { }
  getAuth(data:any):Observable<any>{
    debugger
    return new Observable((observer)=>{
      this.sqlService.getAuth(data.email,data.password).then((res)=>{
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
  addUser(data:any):Observable<any>{
    return new Observable((observer)=>{
      this.sqlService.addUser(data.name,data.email,data.age,data.bloodGroup,data.phoneNumber,data.password).then(()=>{
        observer.next('success');
        observer.complete();  
      }).catch((err)=>{
        observer.error(err);
      })
    })
  }
    
  
}
