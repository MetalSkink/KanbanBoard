import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

  usuarios:Usuario[];
  usuario = new Usuario();

  constructor(private _userService: UsuarioService) { }

  ngOnInit(): void {
    this._userService.getUsuarios().subscribe(data =>{
      this.usuarios= data;
      console.log(data);
    });
  }

  borrarUsuario(id:number){
    console.log("se borrara el usuario con el id:"+id);
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro que quiere borrar el usuario con el '+id+"?",
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if (resp.value){
        this._userService.deleteUsuario(id).subscribe(()=>{
          this._userService.getUsuarios().subscribe(data=>{
          this.usuarios= data;
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
    console.log(this.usuario);
    this._userService.agregarProyecto(this.usuario).subscribe(()=>{
      this._userService.getUsuarios().subscribe(data=>{
        this.usuarios= data;
        })
    });
  }

}
