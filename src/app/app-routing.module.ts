import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployesComponent } from './components/employes/employes.component';
import { MovementsUserComponent } from './components/movements-user/movements-user.component';
import { MovementsComponent } from './components/movements/movements.component';

const routes: Routes = [
  { path: '', component: EmployesComponent },
  {path: 'trabajadores', component: EmployesComponent},
  {path: 'movimientos', component: MovementsComponent},
  {path: 'movimientos-trabajador', component: MovementsUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
