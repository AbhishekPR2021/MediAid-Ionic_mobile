import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class Messages{
    passwordMissmatch="The password not matching"
    missingFields="Please enter details in all fields"
    successMessage="Data entered successfully"

}