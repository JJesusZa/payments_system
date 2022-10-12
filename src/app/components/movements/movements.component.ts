import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { GetServiceService } from 'src/app/data/get-service.service';
import { HelpersService } from 'src/app/data/helpers.service';
import { RegisterService } from 'src/app/data/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit {
  arrMovements: any = [];
  arrWorkers: any = [];
  action: any; //1 es para agregar, 2 es para editari
  id_movement: any; //variable para salvar el id del movimiento y poder editar

  formaddMovement = this.fb.group({
    n_client: [{ value: '', disabled: true }, Validators.required],
    name: ['', Validators.required],
    role: [{ value: '', disabled: true }, Validators.required],
    month: ['', Validators.required],
    year: [''],
    deliveries: ['', Validators.required],
  });

  constructor(
    private get: GetServiceService,
    private register: RegisterService,
    public helpers: HelpersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.helpers.loader();
    this.getMovements();
    this.getWorkers();
  }

  //funcion para traer los movimientos
  getMovements() {
    this.get.getMovements().subscribe({
      next: (v) => {
        this.arrMovements = v;
      },
      error: (e) => {
        this.helpers.error('Algo salio mal, vuelva a intentarlo');
      },
    });
  }

  //funcion para agregar un movimiento
  addMovement() {
    if (this.formaddMovement.invalid) {
      this.helpers.error('Todos los campos son obligatorios');
      return;
    }
    this.helpers.loader();
    this.register
      .registerMovement(this.formaddMovement.getRawValue())
      .subscribe({
        next: (v) => {
          this.formaddMovement.reset();//limpiamos el formulario
          this.getMovements();//traemos los movimientos
        },
        error: (e) => {
          this.helpers.error('Algo salio mal, vuelva a intentarlo');
        },
        complete: () => {
          Swal.close();
        },
      });
  }

  //funcion para traer un movimiento
  getMovement(id: any) {
    this.id_movement = id; //salvamos el id del movimiento
    this.action = 2; //le digo que es para editar
    this.helpers.loader();
    this.get.getMovement(id).subscribe({
      next: (v: any) => {
        //setamos los valores del formulario
        this.formaddMovement.get('n_client')?.setValue(v.n_client);
        this.formaddMovement.get('name')?.setValue(v.name);
        this.formaddMovement.get('role')?.setValue(v.role);
        this.formaddMovement.get('month')?.setValue(v.month);
        this.formaddMovement.get('year')?.setValue(v.year);
        this.formaddMovement.get('deliveries')?.setValue(v.deliveries);
      },
      error: (e) => {
        this.helpers.error('Algo salio mal, vuelva a intentarlo');
      },
      complete: () => {
        Swal.close();
      },
    });
  }

  //funcion para editar un movimiento
  updateMovement() {
    if (this.formaddMovement.invalid) {
      this.helpers.error('Todos los campos son obligatorios');
      return;
    }
    this.helpers.loader();
    this.register
      .updateMovement(this.id_movement, this.formaddMovement.getRawValue())
      .subscribe({
        next: (v) => {
          this.formaddMovement.reset();
          this.getMovements();
        },
        error: (e) => {
          this.helpers.error('Algo salio mal, vuelva a intentarlo');
        },
        complete: () => {
          Swal.close();
        },
      });
  }

  //funcion para eliminar un trabajador
  deleteMovement(id: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta accion',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.helpers.loader();
        this.register.deleteMovement(id).subscribe({
          next: (v) => {
            this.helpers.success('Movimiento eliminado');
            this.getMovements();
          },
          error: (e) => {
            this.helpers.error('Algo salio mal, vuelva a intentarlo');
          },
          complete: () => {
            Swal.close();
          },
        });
      }
    });
  }

  //funcion para traer los workers
  getWorkers() {
    this.get.getUsers().subscribe({
      next: (v) => {
        this.arrWorkers = v;
      },
      error: (e) => {
        this.helpers.error('Algo salio mal, vuelva a intentarlo');
      },
      complete: () => {
        Swal.close();
      },
    });
  }

  //funcion para traer la info del worker que seleccionamos
  getInfoWorker(event: any) {
    this.arrWorkers.forEach((element: any) => {
      if (element._id == event.target.value) {
        console.log(element.name);
        this.formaddMovement.get('n_client')?.setValue(element.n_client);
        this.formaddMovement.get('name')?.setValue(element.name);
        this.formaddMovement.get('role')?.setValue(element.role);
        this.formaddMovement
          .get('year')
          ?.setValue(new Date().getFullYear().toString());
      }
    });
  }
}
