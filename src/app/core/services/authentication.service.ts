import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisteredEmailError } from '../errors/registeredEmailError';
import { WrongCredentialsError } from '../errors/wrongCredentialsError';
import { LoginUserDTO } from './DTO/LoginUserDTO';
import { RegisterUserDTO } from './DTO/registerUserDTO';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private base_url: string

  private isLoggedSubject: BehaviorSubject<boolean>;
  public isLogged: Observable<boolean>;

  constructor(private http: HttpClient, private storageService: StorageService) { 
    this.base_url = environment.backendUrl
    this.isLoggedSubject = new BehaviorSubject<boolean>(!!this.storageService.getJwt());
    this.isLogged = this.isLoggedSubject.asObservable();
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
      .pipe(
        tap((res: LoginUserDTO)=> {
          if (res.message == 'Verify your credentials')
            throw new WrongCredentialsError()
            this.storageService.saveJwt(res.jwt)
            this.isLoggedSubject.next(true)
        }),
        catchError(this.handlerError)
      )
  }

  logout() {
    this.storageService.clear()
    this.isLoggedSubject.next(false)
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 403 || error instanceof WrongCredentialsError)
    return throwError(() => new WrongCredentialsError())
    if (error instanceof RegisteredEmailError) {
      return throwError(() => new RegisteredEmailError())
    }
    return throwError(() => new Error('Server Error, try again'));
  }
}
