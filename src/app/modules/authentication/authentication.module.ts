import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { CoreModule } from 'src/app/core/core.module';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CoreModule
  ]
})
export class AuthenticationModule { }
