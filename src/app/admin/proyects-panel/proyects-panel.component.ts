import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/Proyecto';
import { ProyectService } from '../../services/proyect.service';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyects-panel',
  templateUrl: './proyects-panel.component.html',
  styleUrls: ['./proyects-panel.component.css']
})
export class ProyectsPanelComponent implements OnInit {

  createProyecto:FormGroup;
  proyectos:Proyecto[]=[];
  submitted=false;
  //Campos para editar
  isEditar=false;
  idParams:string | null;
  idNumber:number | null;
  titulo:string ='Agregar Proyecto';
  proyecto:Proyecto;


  constructor(private _proyectService: ProyectService,
              private fb:FormBuilder,
              private aRoute: ActivatedRoute) {
    this.createProyecto=this.fb.group({
      nombreProyecto:['',Validators.required]
    });
    this.idParams= this.aRoute.snapshot.paramMap.get('id');
    this.idNumber = Number(this.idParams);
  }

  ngOnInit(): void {
    this._proyectService.getProyectos().subscribe(data =>{
      this.proyectos= data;
    });
    this.esEditar();

  }


  esEditar(){
    if(this.idParams !== null){
      this.titulo ='Editar Proyecto';
      this.isEditar=true;
      this._proyectService.getProyecto(this.idNumber).subscribe(data =>{
        this.proyecto=data
        this.createProyecto.setValue({
          nombreProyecto: data.nombreProyecto
        })
      });
      }
  }



  borrarProyecto(proyecto:Proyecto){
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro que quiere borrar el proyecto: '+proyecto.nombreProyecto+"?",
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if (resp.value){
        this._proyectService.deleteProyecto(proyecto.idProyecto).subscribe(()=>{
          this._proyectService.getProyectos().subscribe(data=>{
          this.proyectos= data;
          Swal.fire({
            title:'Proyecto borrado con exito',
            icon: 'success'
          });
          })
          });
      }
    });
  }

  agregar(){
    const proyecto:Proyecto={
      nombreProyecto: this.createProyecto.value.nombreProyecto
    }
    this._proyectService.agregarProyecto(proyecto).subscribe(()=>{
      this._proyectService.getProyectos().subscribe(data=>{
        this.proyectos= data;
        Swal.fire({
          title:'Proyecto agregado con exito',
          icon: 'success'
        });
        })
    });

  }

  editar(id: number){
    const proyecto:Proyecto={
      nombreProyecto: this.createProyecto.value.nombreProyecto
    }
    this._proyectService.editarProyecto(id,proyecto).subscribe(()=>{
      this._proyectService.getProyectos().subscribe(data=>{
        this.proyectos= data;
        Swal.fire({
          title:'Proyecto modificado con exito',
          icon: 'success'
        });
        })
    });

  }

  agregarEditarProyecto(){
    if(this.createProyecto.invalid){
      Swal.fire({
        title:'EL nombre es  obligatorio',
        icon:'error'
      });
      return
    }
    if (this.idParams=== null) {
      this.agregar();
    }else{
      this.editar(this.idNumber);
    }
  }


}
