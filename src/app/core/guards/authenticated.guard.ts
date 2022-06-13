import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService, private storageService: StorageService) { }

  canActivate(): boolean {
    const jwt = this.storageService.getJwt()
    const jwtHelper = new JwtHelperService()

    if (jwtHelper.isTokenExpired(jwt ?? '')) {
      this.authenticationService.isLoggedSubject.next(false)
      this.router.navigateByUrl('')
    }
    this.authenticationService.isLoggedSubject.next(true)
    return true
  }

}
