import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { Usuario } from 'src/app/models/Usuario';
import { Tarea } from '../../models/Tarea';
import { TareaService } from '../../services/tarea.service';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Proyecto } from '../../models/Proyecto';
import { ProyectService } from '../../services/proyect.service';


@Component({
  selector: 'app-tareas-panel',
  templateUrl: './tareas-panel.component.html',
  styleUrls: ['./tareas-panel.component.css']
})
export class TareasPanelComponent implements OnInit {

  tareas:Tarea[];
  usuarios:Usuario[];
  tareasProyecto: Proyecto;
  tarea= new Tarea();

  constructor(private _tareasService:TareaService,
              private _usuariosService:UsuarioService,
              private _proyectosService:ProyectService,
              private _route:ActivatedRoute) {
                console.log(this._route.snapshot.paramMap.get('id'));

              }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    let idNumber = Number(id);
    console.log(idNumber);

    this._tareasService.getTareas().subscribe(data=>{
      this.tareas=data;
      // console.log(data);
    })

    this._usuariosService.getUsuarios().subscribe(data2=>{
      this.usuarios=data2;
      // console.log(this.usuarios);
    })

    this._proyectosService.getProyecto(idNumber).subscribe(data3=>{
      this.tareasProyecto=data3;
      console.log(this.tareasProyecto);

    })


  }

  borrarTarea(id:number){
    console.log("se borrara la tarea con el ID" +id);
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro que quiere borrar la tareas con el ID: '+id+"?",
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if (resp.value){
        this._tareasService.deleteTarea(id).subscribe(()=>{
          this._tareasService.getTareas().subscribe(data=>{
            this.tareas=data;
          })
        });

      }
    });
  }



}
