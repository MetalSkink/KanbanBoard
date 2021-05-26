import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Tarea } from '../../models/Tarea';
import { TareaService } from '../../services/tarea.service';
import { Bitacora } from '../../models/Bitacora';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  nombreUsuario: string;
  tareasDeUsuario: Tarea[] = [];
  //Para cada tarea
  Backlog: Tarea[] = [];
  toDo: Tarea[] = [];
  Doing: Tarea[] = [];
  Done: Tarea[] = [];

  constructor(
    private _usuariosService: UsuarioService,
    private _tareasService: TareaService
  ) {}

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.Backlog = [];
    this.toDo = [];
    this.Doing = [];
    this.Done = [];
    this.nombreUsuario = String(sessionStorage.getItem('AuthUsername'));
    this._usuariosService.getUsuario(this.nombreUsuario).subscribe((data) => {
      this.tareasDeUsuario = data.tareas;
      this.tareasDeUsuario.forEach((tarea) => {
        if (tarea.columna.idColumna === 1) {
          this.Backlog.push(tarea);
        } else if (tarea.columna.idColumna === 2) {
          this.toDo.push(tarea);
        } else if (tarea.columna.idColumna === 3) {
          this.Doing.push(tarea);
        } else if (tarea.columna.idColumna === 4) {
          this.Done.push(tarea);
        }
      });
    });
  }

  empezar(tarea: Tarea) {
    Swal.fire({
      title: '¿Esta seguro?',
      text:
        '¿Esta seguro que quiere iniciar la tarea ' + tarea.nombreTarea + '?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        let HoraInicio: Date = new Date();

        const bitacora: Bitacora = {
          idTareaAsoc: tarea.idTarea,
          horaInicio: HoraInicio,
          horaFin: null,
          horasTotales: 0,
        };

        this._tareasService
          .statusProgreso(tarea.idTarea, tarea)
          .subscribe(() => {
            //this.obtenerTareas();
          });
        this._tareasService.iniciarBitacora(bitacora).subscribe(() => {
          this.obtenerTareas();
        });
      }
    });
  }

  pausar(tarea: Tarea) {
    Swal.fire({
      title: '¿Esta seguro?',
      text:
        '¿Esta seguro que quiere pausar la tarea: "' + tarea.nombreTarea + '"?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        let HoraFin: Date = new Date();

        const bitacora: Bitacora = {
          idTareaAsoc: tarea.idTarea,
          horaInicio: null,
          horaFin: HoraFin,
          horasTotales: 0,
        };
        this._tareasService.statusPausar(tarea.idTarea, tarea).subscribe(() => {
          //this.obtenerTareas();
        });
        this._tareasService
          .pausarBitacora(tarea.idTarea, bitacora)
          .subscribe(() => {
            this.obtenerTareas();
          });
      }
    });
  }

  bajarColumna(tarea: Tarea) {
    this._tareasService
      .bajarColumnaTarea(tarea.idTarea, tarea)
      .subscribe(() => {
        this.obtenerTareas();
      });
  }

  subirColumna(tarea: Tarea) {
    this._tareasService
      .subirColumnaTarea(tarea.idTarea, tarea)
      .subscribe(() => {
        this.obtenerTareas();
      });
  }
}
