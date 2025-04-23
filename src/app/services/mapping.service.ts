import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  getDoctorModelUrl='assets/data/doctors.json';
  getDietModelUrl='assets/data/diets.json';
  getMedicineModelUrl='assets/data/medicines.json';
  getEmergencyModelUrl='assets/data/emergency.json';
  getUserModelUrl='assets/data/users.json';

}
