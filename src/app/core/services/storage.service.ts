import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveJwt(value: string) {
    localStorage.setItem('jwt', value)
  }

  getJwt(): string | null {
    return localStorage.getItem('jwt')
  }

  clear() {
    localStorage.clear()
  }
}
