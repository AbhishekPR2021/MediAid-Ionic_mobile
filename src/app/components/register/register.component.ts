import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule,CommonModule,FormsModule]
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email],),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(8)]),
    cpassword: new FormControl('', [Validators.required])
  })
  constructor(private fb: FormBuilder, private ac: AlertController) {
  }

  ngOnInit() {
  }
  // Handle form submission
  onSubmit() {
    if(this.registrationForm.valid){
      console.log('form submitted',this.registrationForm.value)
    }else{
      console.log('form is invalid')
    }
  }

  }
