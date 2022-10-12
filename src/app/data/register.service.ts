import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  //Funcion para registrar un usuario
  registerUser(user: any) {
    console.log(JSON.stringify(user));
    return this.http.post('http://localhost:3000/API/workers', user);
  }

  //Funcion para actualizar un usuario
  updateUser(id: any, user: any) {
    return this.http.put(`http://localhost:3000/API/worker/${id}`, user);
  }

  //funcion para eliminar un usuario
  deleteUser(id: any) {
    return this.http.delete(`http://localhost:3000/API/workers/${id}`);
  }

  //Funcion para registrar un movimiento
  registerMovement(movement: any) {
    return this.http.post('http://localhost:3000/API/movements', movement);
  }

  //Funcion para actualizar un movimiento
  updateMovement(id: any, user: any) {
    return this.http.put(`http://localhost:3000/API/movement/${id}`, user);
  }

  //funcion para eliminar un movimiento
  deleteMovement(id: any) {
    return this.http.delete(`http://localhost:3000/API/movements/${id}`);
  }
}
