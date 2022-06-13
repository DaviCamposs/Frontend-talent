import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup
  submitForm: boolean = false

  constructor(private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      email: [ '', [Validators.required,Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


}
