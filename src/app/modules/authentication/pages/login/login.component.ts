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

  isFormValid(): boolean {
    return this.loginForm.valid
  }
  
  invalidField(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.submitForm) {
      return true
    } else {
      return false
    }
  }
  login() {
    this.submitForm = true
    if (this.loginForm.invalid) {
      return
    }
  }


}
