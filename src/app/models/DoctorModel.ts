import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DoctorMode{

    DOCT_ID:string;
    NAME:string;
    ADDRESS:string;
    PHONE_NUMBER:number;
    SPECIALIZED:string;
    constructor(){
        this.DOCT_ID = ''
        this.NAME=''
        this.ADDRESS=''
        this.PHONE_NUMBER=0
        this.SPECIALIZED=''
    }
}