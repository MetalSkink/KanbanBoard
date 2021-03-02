import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectsPanelComponent } from './admin/proyects-panel/proyects-panel.component';
import { TareasPanelComponent } from './admin/tareas-panel/tareas-panel.component';
import { UsersPanelComponent } from './admin/users-panel/users-panel.component';

const routes: Routes = [
  { path: 'proyectos', component: ProyectsPanelComponent },
  { path: 'tareas/:id', component: TareasPanelComponent },
  { path: 'usuarios', component: UsersPanelComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'proyectos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
