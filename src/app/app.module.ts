import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {DragDropModule} from "@angular/cdk/drag-drop";

//Componentes
import { ProyectsPanelComponent } from './admin/proyects-panel/proyects-panel.component';
import { TareasPanelComponent } from './admin/tareas-panel/tareas-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BoardComponent } from './board/board/board.component'
import { LoginPanelComponent } from './login/login-panel/login-panel.component';
import { UsersPanelComponent } from './admin/users-panel/users-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectsPanelComponent,
    TareasPanelComponent,
    NavbarComponent,
    UsersPanelComponent,
    LoginPanelComponent,
    BoardComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
