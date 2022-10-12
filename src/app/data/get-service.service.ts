import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetServiceService {
  constructor(private http: HttpClient) {}

  //Funcion para traer todos los usuarios
  getUsers() {
    return this.http.get('http://localhost:3000/API/workers');
  }

  //funcion para traer el worker por id
  getWorker(id: any) {
    return this.http.get(`http://localhost:3000/API/worker/${id}`);
  }

  //Funcion para traer todos los movimientos
  getMovements() {
    return this.http.get('http://localhost:3000/API/movements');
  }

  //funcion para traer el movimiento por id
  getMovement(id: any) {
    return this.http.get(`http://localhost:3000/API/movement/${id}`);
  }

  //funcion para traer los movimientos por id del worker en un mes
  getMovementsByWorker(id: any, month: any, year: any) {
    return this.http.get(
      `http://localhost:3000/API/movements/${id}/${month}/${year}`
    );
  }

  //funcion para calcular el salario de un worker
  getSalary(id: any, month: any, year: any) {
    return this.http.get(
      `http://localhost:3000/API/calculateSalary/${id}/${month}/${year}`
    );
  }
}
