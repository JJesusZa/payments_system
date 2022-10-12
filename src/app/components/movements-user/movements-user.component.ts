import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetServiceService } from 'src/app/data/get-service.service';
import { HelpersService } from 'src/app/data/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movements-user',
  templateUrl: './movements-user.component.html',
  styleUrls: ['./movements-user.component.css'],
})
export class MovementsUserComponent implements OnInit {
  id_worker: any;//id del worker
  month: any;//mes elegido 
  year: any;//año elegido
  arrMovements: any = [];//arreglo con los movimientos
  salary: any;//obejtopara mostrar el modal
  loader: boolean = false;//spinner
  constructor(
    private url: ActivatedRoute,
    private router: Router,
    private get: GetServiceService,
    public helpers: HelpersService
  ) {
    //traigo el id del worker de la url
    this.url.queryParams.subscribe((params) => {
      this.id_worker = params['id'];
    });
  }

  ngOnInit(): void {
    //cuando la aplicacion inicia muestro el swal
    this.indexSwal();
  }

  //Swal con 2 inputs 1:para el año y otro para el mes
  indexSwal() {
    Swal.fire({
      title: 'Seleccione el mes y el año',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Año">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Mes">',
      focusConfirm: false,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      preConfirm: () => {
        //valido que los inputs no esten vacios
        if (
          (document.getElementById('swal-input1') as HTMLInputElement).value ==
            '' ||
          (document.getElementById('swal-input2') as HTMLInputElement).value ==
            ''
        ) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }
        //valido que el mes sea un numero
        if (
          isNaN(
            Number(
              (document.getElementById('swal-input2') as HTMLInputElement).value
            )
          )
        ) {
          Swal.showValidationMessage('El mes debe ser un numero');
        }
        //valido que el año sea un numero y que tenga 4 digitos
        if (
          isNaN(
            Number(
              (document.getElementById('swal-input1') as HTMLInputElement).value
            )
          ) ||
          (document.getElementById('swal-input1') as HTMLInputElement).value
            .length != 4
        ) {
          Swal.showValidationMessage('El año debe ser un numero de 4 digitos');
        }

        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
        ];
      },
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.month = result.value[1];//respaldo el mes
        this.year = result.value[0];//respaldo el año
        this.helpers.loader();
        this.getMovements(this.id_worker, result.value[0], result.value[1]);
      }
      if (result.isDismissed) {
        //redirecciono a la pagina de workers
        this.router.navigate(['/']);
      }
    });
  }

  //funcion para traer los movimientos
  getMovements(id: any, year: any, month: any) {
    this.get.getMovementsByWorker(id, month, year).subscribe({
      next: (data: any) => {
        this.arrMovements = data;
/*         console.log(this.arrMovements); */
        //si no hay movimientos le muestro un mensaje al usuario
      },
      error: (error) => {
        this.helpers.error('Error al traer los movimientos');
      },
      complete: () => {
        if (this.arrMovements.length == 0) {
          Swal.fire({
            title: 'No hay movimientos para este mes, intenta con otro',
            icon: 'info',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.indexSwal();
            }
          });
          return;
        }
        Swal.close();
      },
    });
  }

  //funcion para calcular el salario mensual
  calculateSalary() {
    this.loader = true;
    this.get.getSalary(this.id_worker,this.month,this.year).subscribe({
      next: (data: any) => {
        this.salary = data;
      },
      error: (error) => {
        this.helpers.error('Error al calcular el salario');
      },
      complete: () => {
        this.loader = false;
      }
    });
  }
}
