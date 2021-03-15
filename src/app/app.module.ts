import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectsPanelComponent } from './admin/proyects-panel/proyects-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { TareasPanelComponent } from './admin/tareas-panel/tareas-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule} from '@angular/forms';
import { UsersPanelComponent } from './admin/users-panel/users-panel.component';
import { LoginPanelComponent } from './login/login-panel/login-panel.component';
import { BoardComponent } from './board/board/board.component'

@NgModule({
  declarations: [
    AppComponent,
    ProyectsPanelComponent,
    TareasPanelComponent,
    NavbarComponent,
    UsersPanelComponent,
    LoginPanelComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
