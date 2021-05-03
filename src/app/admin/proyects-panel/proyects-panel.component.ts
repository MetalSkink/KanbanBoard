import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/Proyecto';
import { ProyectService } from '../../services/proyect.service';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyects-panel',
  templateUrl: './proyects-panel.component.html',
  styleUrls: ['./proyects-panel.component.css']
})
export class ProyectsPanelComponent implements OnInit {

  createProyecto:FormGroup;
  proyectos:Proyecto[]=[];
  submitted=false;


  constructor(private _proyectService: ProyectService,
              private fb:FormBuilder) {
    this.createProyecto=this.fb.group({
      nombreProyecto:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this._proyectService.getProyectos().subscribe(data =>{
      this.proyectos= data;
      console.log(data);
    });

  }

  borrarProyecto(id:number){
    console.log("se borrara el proyecto con el id:"+id);
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro que quiere borrar el proyecto '+id+"?",
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if (resp.value){
        this._proyectService.deleteProyecto(id).subscribe(()=>{
          this._proyectService.getProyectos().subscribe(data=>{
          this.proyectos= data;
          })
          });
      }
    });
  }

  agregar(){
    if(this.createProyecto.invalid){
      return
    }
    const proyecto:Proyecto={
      nombreProyecto: this.createProyecto.value.nombreProyecto
    }
    this._proyectService.agregarProyecto(proyecto).subscribe(()=>{
      this._proyectService.getProyectos().subscribe(data=>{
        this.proyectos= data;
        })
    });

  }
}
