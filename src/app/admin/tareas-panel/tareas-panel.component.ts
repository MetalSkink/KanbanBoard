import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { Usuario } from 'src/app/models/Usuario';
import { Tarea } from '../../models/Tarea';
import { TareaService } from '../../services/tarea.service';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from '../../models/Proyecto';
import { ProyectService } from '../../services/proyect.service';
import { AdminService } from '../../services/admin.service';
import { Accion } from '../../models/Accion';


@Component({
  selector: 'app-tareas-panel',
  templateUrl: './tareas-panel.component.html',
  styleUrls: ['./tareas-panel.component.css']
})
export class TareasPanelComponent implements OnInit {

  createTarea:FormGroup;
  usuarios:Usuario[];
  acciones:Accion[];
  tareasProyecto: Tarea[]=[];
  proyecto = new Proyecto();
  idNumber:number;

  constructor(private fb:FormBuilder,
              private _usuariosService:UsuarioService,
              private _proyectosService:ProyectService,
              private _adminService:AdminService,
              private _tareasService:TareaService,
              private _route:ActivatedRoute) {
                this.createTarea=this.fb.group({
                  nombreTarea:['',Validators.required],
                  descripcion:['',Validators.required],
                  idAsociado:['',Validators.required],
                  idUsuarioTarea:['',Validators.required],
                  idAccion:['',Validators.required]
                })
              }

  ngOnInit(): void {
    this._usuariosService.getUsuarios().subscribe(data2=>{
      this.usuarios=data2;
    });

    this._adminService.getAcciones().subscribe(data=>{
      this.acciones=data;
    })

    this.getTareasDeProyecto();

  }

  getTareasDeProyecto():void{
    let id = this._route.snapshot.paramMap.get('id');
    let idNumber = Number(id);
    this._proyectosService.getProyecto(idNumber).subscribe(data3=>{
      this.proyecto=data3;
      this.tareasProyecto=data3.tareas;
      // console.log(data3);
      // console.log(this.proyecto);
      // console.log(this.tareasProyecto);
      this.createTarea.setValue({
        idAsociado: this.proyecto.idProyecto,
        nombreTarea:null,
        descripcion: null,
        idUsuarioTarea: null,
        idAccion:1
      })

    })
  }

borrar(tarea:Tarea){
  Swal.fire({
         title: '¿Esta seguro que quiere borrar la tarea "'+tarea.nombreTarea+'"?',
         text: 'Esto sera permanente',
         icon: 'question',
         showConfirmButton: true,
         showCancelButton: true
       }).then(resp =>{
         if (resp.value){
           this._tareasService.deleteTarea(tarea.idTarea).subscribe(()=>{
            this.getTareasDeProyecto();
           });
         }
       });
}

cancelar(tarea:Tarea){
  Swal.fire({
         title: '¿Esta seguro que quiere cancelar la tarea "'+tarea.nombreTarea+'"?',
         text: 'Esto hara que el programador ya no pueda trabajar en ella',
         icon: 'question',
         showConfirmButton: true,
         showCancelButton: true
       }).then(resp =>{
         if (resp.value){
            this._tareasService.statusCancelar(tarea.idTarea, tarea).subscribe(()=>{
              this.getTareasDeProyecto();
            });
         }
       });
}

agregar(){
  if(this.createTarea.invalid){
    Swal.fire({
      title:'Todos los campos son obligatorios',
      icon:'error'
    });
    return

     }
     const tarea:Tarea={
      idAsociado: Number(this._route.snapshot.paramMap.get('id')),
      nombreTarea: this.createTarea.value.nombreTarea,
      idUsuarioTarea: Number(this.createTarea.value.idUsuarioTarea),
      descripcion: this.createTarea.value.descripcion,
      accion:{
        idAccion: Number(this.createTarea.value.idAccion),
      },
      columna: {
        idColumna: 1
      },
      status: {
        idStatus: 1
      },
      }
      this._tareasService.agregarTarea(tarea).subscribe(()=>{
        this.getTareasDeProyecto();
      });


}
}
