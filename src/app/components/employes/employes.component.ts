import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetServiceService } from 'src/app/data/get-service.service';
import { HelpersService } from 'src/app/data/helpers.service';
import { RegisterService } from 'src/app/data/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css'],
})
export class EmployesComponent implements OnInit {
  arrWorkers: any = [];
  action:any;//1 es para agregar, 2 es para editari
  id_worker: any;//variable para salvar el id del trabajador y poder editar

  formaddWorker = this.fb.group({
    n_client: ['', Validators.required],
    name: ['', Validators.required],
    role: ['', Validators.required],
  });

  constructor(
    private get: GetServiceService,
    private register: RegisterService,
    public helpers: HelpersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.helpers.loader();//inicio la aplicacion con el loader
    this.getWorkers();//y traigo los trabajadores
  }

  //funcion para traer los trabajadores
  getWorkers() {
    this.get.getUsers().subscribe({
      next: (v) => {
      /*   console.log(v); */
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

  //funcion para agregar un trabajador
  addWorker() {
    if (this.formaddWorker.invalid) {
      this.helpers.error('Todos los campos son obligatorios');
      return;
    }
    this.helpers.loader();
    this.register.registerUser(this.formaddWorker.value).subscribe({
      next: (v:any) => {
        this.formaddWorker.reset();
        this.getWorkers();
      },
      error: (e) => {
        console.log(e);
        this.helpers.error('Algo salio mal, vuelva a intentarlo');
      },
      complete: () => {
        Swal.close();
      },
    });
  }

  //funcion para traer un trabajador
  getWorker(id: any) {
    this.id_worker = id;//salvamos el id del trabajador
    this.action = 2;//le digo que es para editar
    this.helpers.loader();
    this.get.getWorker(id).subscribe({
      next: (v:any) => {
       /*  console.log(v); */
        this.formaddWorker.setValue({
          n_client: v.n_client,
          name: v.name,
          role: v.role,
        });

      
      },
      error: (e) => {
        this.helpers.error('Algo salio mal, vuelva a intentarlo');
      },
      complete: () => {
        Swal.close();
      },
    });
  }

  //funcion para editar un trabajador
  updateWorker() {
    /* console.log(this.id_worker); */
    if (this.formaddWorker.invalid) {
      this.helpers.error('Todos los campos son obligatorios');
      return;
    }
    this.helpers.loader();
    this.register.updateUser(this.id_worker,this.formaddWorker.value).subscribe({
      next: (v) => {
        /* console.log(v); */
        this.formaddWorker.reset();
        this.getWorkers();
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
  deleteWorker(id: any) {
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
        this.register.deleteUser(id).subscribe({
          next: (v) => {
            this.helpers.success('Trabajador eliminado');
            this.getWorkers();
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
}
