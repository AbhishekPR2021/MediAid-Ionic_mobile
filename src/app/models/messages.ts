import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class Messages{
    passwordMissmatch="The password not matching"
    missingFields="One more fields are incorrect, Please enter details in all fields"
    successMessage="Data entered successfully"
    authenticationFailed="Authentication Failed please try again"
    logoutMessage="Logged out successfully"
    emergencyStopped="Emergency service aborted!"
    bookedSuccessgully="Successfully Booked"

}