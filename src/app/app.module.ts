import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";

//Componentes
import { ProyectsPanelComponent } from './admin/proyects-panel/proyects-panel.component';
import { TareasPanelComponent } from './admin/tareas-panel/tareas-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoardComponent } from './board/board/board.component'
import { LoginPanelComponent } from './login/login-panel/login-panel.component';
import { UsersPanelComponent } from './admin/users-panel/users-panel.component';
import { ProdInterceptorService } from './interceptors/prod-interceptor.service';
import { TareaDetallesComponent } from './admin/tareas-panel/tarea-detalles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectsPanelComponent,
    TareasPanelComponent,
    NavbarComponent,
    UsersPanelComponent,
    LoginPanelComponent,
    BoardComponent,
    TareaDetallesComponent,
    SidebarComponent,

  ],
  imports: [
    DragDropModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProdInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
