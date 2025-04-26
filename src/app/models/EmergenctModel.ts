import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EmergencyModel {
    ID: string;
    NAME: string;
    PHONE_NUMBER: number;
    ALTERNATE_PHONE_NUMBER: number;
    AGE: number;
    ADDRESS: string;
    HOSPITAL_CONTACT: number;
    LOCATION: string;
    REPORT: string;
    constructor(){
        this.ID = '',
        this.NAME='',
        this.PHONE_NUMBER=0
        this.ALTERNATE_PHONE_NUMBER=0
        this.AGE=0
        this.ADDRESS=''
        this.HOSPITAL_CONTACT=0
        this.LOCATION=''
        this.REPORT=''

    }
}
