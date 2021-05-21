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

@Component({
  selector: 'app-tarea-detalles',
  templateUrl: './tarea-detalles.component.html',
  styles: [
  ]
})
export class TareaDetallesComponent implements OnInit {

  tarea:Tarea = null;
  bitacoras:Bitacora[] = [];
  formularioTarea:FormGroup;

  //Para el form
  acciones:Accion[];
  usuarios:Usuario[];

  constructor(private fb:FormBuilder,
              private _tareasService:TareaService,
              private _usuariosService:UsuarioService,
              private _adminService:AdminService,
              private _route:ActivatedRoute) {
                this.formularioTarea=this.fb.group({
                  nombreTarea:['',Validators.required],
                  descripcion:['',Validators.required],
                  idAsociado:['',Validators.required],
                  idUsuarioTarea:['',Validators.required],
                  idAccion:['',Validators.required]
                });
              }

  ngOnInit(): void {
    this._adminService.getAcciones().subscribe(data=>{
      this.acciones=data;
    });
    this._usuariosService.getUsuarios().subscribe(data2=>{
      this.usuarios=data2;
    });
    this.cargarTarea();

  }

  cargarTarea(){
    let id = this._route.snapshot.paramMap.get('id');
    let idNumber = Number(id);
    this._tareasService.getTareaPorId(idNumber).subscribe(data=>{
      this.tarea= data;
      this.bitacoras = data.bitacoras;
      console.log(this.tarea);
      //console.log(this.bitacoras);
      this.formularioTarea.setValue({
        idAsociado: this.tarea.idTarea,
        nombreTarea:this.tarea.nombreTarea,
        descripcion: this.tarea.descripcion,
        idUsuarioTarea: this.tarea.idUsuarioTarea,
        idAccion: this.tarea.accion.idAccion
      })
    });
  }

  editar(){

  }

}
