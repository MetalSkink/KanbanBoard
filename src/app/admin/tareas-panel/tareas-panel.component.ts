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


@Component({
  selector: 'app-tareas-panel',
  templateUrl: './tareas-panel.component.html',
  styleUrls: ['./tareas-panel.component.css']
})
export class TareasPanelComponent implements OnInit {

  createTarea:FormGroup;
  usuarios:Usuario[];
  tareasProyecto: Tarea[]=[];
  proyecto = new Proyecto();
  idNumber:number;

  constructor(private fb:FormBuilder,
              private _tareasService:TareaService,
              private _usuariosService:UsuarioService,
              private _proyectosService:ProyectService,
              private _route:ActivatedRoute) {
                // console.log(this._route.snapshot.paramMap.get('id'));
                this.createTarea=this.fb.group({
                  nombreTarea:['',Validators.required],
                  descripcion:['',Validators.required],
                  idAsociado:['',Validators.required],
                  idUsuarioTarea:['',Validators.required]
                })
              }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    let idNumber = Number(id);
    // console.log(idNumber);

    // this._tareasService.getTareas().subscribe(data=>{
    //   this.tareas=data;
    //   // console.log(data);
    // })

    this._usuariosService.getUsuarios().subscribe(data2=>{
      this.usuarios=data2;
      console.log(this.usuarios);
    });

    this._proyectosService.getProyecto(idNumber).subscribe(data3=>{
      this.proyecto=data3;
      this.tareasProyecto=data3.tareas;
      console.log(data3);

      console.log(this.proyecto);
      console.log(this.tareasProyecto);
      this.createTarea.setValue({
        idAsociado: this.proyecto.idProyecto,
        nombreTarea:null,
        descripcion: null,
        idUsuarioTarea: null
      })

    })




  }

  borrarTarea(idTarea:number){
    console.log("se borrara la tarea con el ID " +idTarea);
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro que quiere borrar la tarea con el ID: '+idTarea+'?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if (resp.value){
        let id = this._route.snapshot.paramMap.get('id');
        let idNumber = Number(id);
        this._tareasService.deleteTarea(idTarea).subscribe(()=>{
          this._proyectosService.getProyecto(idNumber).subscribe(data=>{
            this.tareasProyecto=data.tareas;
          })
        });

      }
    });
  }

  agregar(){
    if(this.createTarea.invalid){
      return
    }
    const tarea:Tarea={
      idAsociado: this.createTarea.value.idAsociado,
      nombreTarea: this.createTarea.value.nombreTarea,
      idUsuarioTarea: Number(this.createTarea.value.idUsuarioTarea),
      descripcion: this.createTarea.value.descripcion,
      status: "Sin empezar",
      horaInicio: 0,
      horaFin: 0,
      horasAcumuladas: 0
    }

    console.log(tarea);
    let id = this._route.snapshot.paramMap.get('id');
    let idNumber = Number(id);
    this._tareasService.agregarTarea(tarea).subscribe(()=>{
      this._proyectosService.getProyecto(this.idNumber).subscribe(data=>{
        this.tareasProyecto=data.tareas;
      })
    })

  }



}
