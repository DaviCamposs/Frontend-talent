import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.http.post<RegisterUserDTO>(this.base_url + 'auth/login', { name , email , password })
  }
}
