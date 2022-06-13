import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup
  formSubmit: boolean = false

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },{
      validators: this.validatorEqualFields('password','confirmPassword')
    })
  }

  validatorEqualFields(field1: string , field2: string) {
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

  register() {
    this.formSubmit = true
    if (!this.registerForm.valid) 
      return
  }



}
