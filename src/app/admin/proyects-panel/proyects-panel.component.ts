import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/Proyecto';
import { ProyectService } from '../../services/proyect.service';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proyects-panel',
  templateUrl: './proyects-panel.component.html',
  styleUrls: ['./proyects-panel.component.css']
})
export class ProyectsPanelComponent implements OnInit {

  proyectos:Proyecto[];
  proyecto = new Proyecto();

  constructor(private _proyectService: ProyectService) {
    this._proyectService.getProyectos().subscribe(data =>{
      this.proyectos= data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    console.log("soy el init");

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

    // this._proyectService.deleteProyecto(id).subscribe(()=>{
    // this._proyectService.getProyectos().subscribe(data=>{
    // this.proyectos= data;
    // })
    // });
  }

  agregar(form:NgForm){
    if (form.invalid){
      console.log("formulario no valido");
      return;
    }
    console.log(form);
    console.log(this.proyecto);
    this._proyectService.agregarProyecto(this.proyecto).subscribe(()=>{
      this._proyectService.getProyectos().subscribe(data=>{
        this.proyectos= data;
        })
    });
  }
}
