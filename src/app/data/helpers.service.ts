import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  //loader de SweetAlert2
  loader() {
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  //funcion para mostrar un mensaje de error
  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  //funcion que retorna un mensaje de succes
  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Exito',
      text: message,
    });
  }

  //funcion que retorna el rol del usuario
  getRolUser(role: any) {
    //objeto con 3 roles
    const roles = {
      0: 'Chofer',
      1: 'Cargador',
      2: 'Auxiliar',
    };
    //retornamos el rol del usuario
    return roles[role as keyof typeof roles];
  }

  //funcion que retorna el mes en español
  getMonth(month: any) {
    //objeto con los meses
    const months = {
      0: 'Enero',
      1: 'Febrero',
      2: 'Marzo',
      3: 'Abril',
      4: 'Mayo',
      5: 'Junio',
      6: 'Julio',
      7: 'Agosto',
      8: 'Septiembre',
      9: 'Octubre',
      10: 'Noviembre',
      11: 'Diciembre',
    };
    //retornamos el mes
    return months[month as keyof typeof months];
  }
}
