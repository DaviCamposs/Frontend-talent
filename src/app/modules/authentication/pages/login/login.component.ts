import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WrongCredentialsError } from 'src/app/core/errors/wrongCredentialsError';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup
  submitForm: boolean = false

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private notificationService: NotificationService) { 
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

    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value

    this.authenticationService.login(email, password).subscribe(
      () => {
        // redirect
      },
      error => {
        let message = 'Error server, try again'
        if (error instanceof WrongCredentialsError)
          message = 'Verify your email and password'
        this.notificationService.showMessageError(message)
      }
    )
  }


}
