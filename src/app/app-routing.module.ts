import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectsPanelComponent } from './admin/proyects-panel/proyects-panel.component';
import { TareasPanelComponent } from './admin/tareas-panel/tareas-panel.component';
import { UsersPanelComponent } from './admin/users-panel/users-panel.component';
import { LoginPanelComponent } from './login/login-panel/login-panel.component';
import { BoardComponent } from './board/board/board.component';
import { TareaDetallesComponent } from './admin/tareas-panel/tarea-detalles.component';

import { ProdGuardGuard as guard } from "./guards/prod-guard.guard";

const routes: Routes = [
  { path: 'login', component: LoginPanelComponent },
  { path: 'board', component: BoardComponent, canActivate: [guard],data: {expectedRol: ['admin','user']}},
  { path: 'proyectos', component: ProyectsPanelComponent, canActivate: [guard],data: {expectedRol: ['admin']}},
  { path: 'edit-proyecto/:id', component: ProyectsPanelComponent, canActivate: [guard],data: {expectedRol: ['admin']}},
  { path: 'tareas/:id', component: TareasPanelComponent, canActivate: [guard],data: {expectedRol: ['admin']}},
  { path: 'tarea-detalles/:id', component: TareaDetallesComponent, canActivate: [guard],data: {expectedRol: ['admin']}},
  { path: 'usuarios', component: UsersPanelComponent, canActivate: [guard],data: {expectedRol: ['admin']}},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
