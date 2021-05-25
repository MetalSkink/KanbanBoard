import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Accion } from 'src/app/models/Accion';
import { Tarea } from 'src/app/models/Tarea';
import { TareaService } from 'src/app/services/tarea.service';
import { Bitacora } from '../../models/Bitacora';
import { AdminService } from '../../services/admin.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { ProyectService } from '../../services/proyect.service';
import { Proyecto } from '../../models/Proyecto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-detalles',
  templateUrl: './tarea-detalles.component.html',
  styles: [],
})
export class TareaDetallesComponent implements OnInit {
  tarea: Tarea = null;
  bitacoras: Bitacora[] = [];
  formularioTarea: FormGroup;

  //Para el form
  acciones: Accion[];
  usuarios: Usuario[];
  proyectos: Proyecto[] = [];

  constructor(
    private fb: FormBuilder,
    private _tareasService: TareaService,
    private _usuariosService: UsuarioService,
    private _adminService: AdminService,
    private _proyectService: ProyectService,
    private _route: ActivatedRoute
  ) {
    this.formularioTarea = this.fb.group({
      nombreTarea: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', Validators.required],
      idUsuarioTarea: ['', Validators.required],
      idAccion: ['', Validators.required],
      idAsoc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._adminService.getAcciones().subscribe((data) => {
      this.acciones = data;
    });
    this._usuariosService.getUsuarios().subscribe((data2) => {
      this.usuarios = data2;
    });
    this._proyectService.getProyectos().subscribe((data3) => {
      this.proyectos = data3;
    });
    this.cargarTarea();
  }

  cargarTarea() {
    let id = this._route.snapshot.paramMap.get('id');
    let idNumber = Number(id);
    this._tareasService.getTareaPorId(idNumber).subscribe((data) => {
      this.tarea = data;
      this.bitacoras = data.bitacoras;
      this.formularioTarea.setValue({
        nombreTarea: this.tarea.nombreTarea,
        descripcion: this.tarea.descripcion,
        idUsuarioTarea: this.tarea.idUsuarioTarea,
        idAccion: this.tarea.accion.idAccion,
        idAsoc: this.tarea.idAsociado,
      });
    });
  }

  editar() {
    if (this.formularioTarea.invalid) {
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        icon: 'error',
      });
      return;
    }
    const tarea: Tarea = {
      idTarea: this.tarea.idTarea,
      idAsociado: Number(this.formularioTarea.value.idAsoc),
      nombreTarea: this.formularioTarea.value.nombreTarea,
      idUsuarioTarea: Number(this.formularioTarea.value.idUsuarioTarea),
      descripcion: this.formularioTarea.value.descripcion,
      accion: {
        idAccion: Number(this.formularioTarea.value.idAccion),
      },
      columna: {
        idColumna: this.tarea.columna.idColumna,
      },
      status: {
        idStatus: this.tarea.status.idStatus,
      },
    };
    this._tareasService.editarTarea(tarea.idTarea,tarea).subscribe(()=>{
      this.cargarTarea();
    });
    Swal.fire({
      title: 'Tarea Actualizada',
      icon: 'success',
    });

  }
}
