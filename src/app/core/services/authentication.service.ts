import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisteredEmailError } from '../errors/RegisteredEmailError';
import { LoginUserDTO } from './DTO/LoginUserDTO';
import { RegisterUserDTO } from './DTO/registerUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private base_url: string

  constructor(private http: HttpClient) { 
    this.base_url = environment.backendUrl
  }

  register(name: string , email: string , password: string): Observable<RegisterUserDTO> {
    return this.http.post<RegisterUserDTO>(this.base_url + 'auth/register', { name , email , password })
      .pipe(
        tap((res: RegisterUserDTO) => {
          if (res.message === 'E-mail already registered')
            throw new RegisteredEmailError()
        }),
        catchError(this.handlerError)
      )
  }

  login(email: string, password: string): Observable<LoginUserDTO> {
    return this.http.post<LoginUserDTO>(this.base_url + 'auth/login',{ email , password })
  }

  private handlerError(error: HttpErrorResponse) {
    if (error instanceof RegisteredEmailError) {
      return throwError(() => new RegisteredEmailError())
    }
    return throwError(() => new Error('Server Error, try again'));
  }
}
