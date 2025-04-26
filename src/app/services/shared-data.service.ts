import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  user:any=[];
  medicine:any=[];
  emergency:any=[];
  doctors:any=[];
  diets:any=[];


  constructor() { }
}
