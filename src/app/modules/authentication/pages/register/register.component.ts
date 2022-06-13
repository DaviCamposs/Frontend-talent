import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteredEmailError } from 'src/app/core/errors/registeredEmailError';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup
  formSubmit: boolean = false

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private notificationService: NotificationService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validators: this.validatorEqualFields('password', 'confirmPassword')
    })
  }

  validatorEqualFields(field1: string, field2: string) {
    return (formGroup: FormGroup) => {
      const field1Control = formGroup.get(field1)
      const field2Control = formGroup.get(field2)

      if (field1Control?.value === field2Control?.value) {
        field2Control?.setErrors(null)
      } else {
        field2Control?.setErrors({ noEqualToPassword: true })
      }
    }
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmit) {
      return true
    } else {
      return false
    }
  }

  isFormValid(): boolean {
    return this.registerForm.valid
  }

  register() {
    this.formSubmit = true
    if (!this.registerForm.valid)
      return

    const name = this.registerForm.get('name')?.value
    const email = this.registerForm.get('email')?.value
    const password = this.registerForm.get('password')?.value

    this.authenticationService.register(name, email, password).subscribe(
      () => {
        this.notificationService.showMessageSuccess('Account registered!')
        this.registerForm.reset()
      },
      error => {
        let message = 'Error server, try again'
        if (error instanceof RegisteredEmailError)
          message = 'E-mail already registered'
        this.notificationService.showMessageError(message)
      }
    )
  }

}
