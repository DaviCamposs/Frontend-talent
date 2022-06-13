import Swal from 'sweetalert2'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showMessageError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }

  showMessageSuccess(message: string) {
    Swal.fire(
      'Success',
      message,
      'success'
    )
  }
}
