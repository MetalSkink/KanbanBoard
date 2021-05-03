import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { NuevoUsuario } from '../../models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

  usuarios:Usuario[];
  usuario = new Usuario();
  //Campos nuevos
  nuevoUsuario: NuevoUsuario;
  nombre:string;
  nombreUsuario: string;
  email: string;
  password: string;

  constructor(private _userService: UsuarioService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this._userService.getUsuarios().subscribe(data =>{
      this.usuarios= data;
    });
  }

  borrarUsuario(id:number){
    // console.log("se borrara el usuario con el id:"+id);
    // Swal.fire({
    //   title: '¿Esta seguro?',
    //   text: '¿Esta seguro que quiere borrar el usuario con el '+id+"?",
    //   icon: 'question',
    //   showConfirmButton: true,
    //   showCancelButton: true
    // }).then(resp =>{
    //   if (resp.value){
    //     this._userService.deleteUsuario(id).subscribe(()=>{
    //       this._userService.getUsuarios().subscribe(data=>{
    //       this.usuarios= data;
    //       })
    //       });
    //   }
    // });


    // this._proyectService.deleteProyecto(id).subscribe(()=>{
    // this._proyectService.getProyectos().subscribe(data=>{
    // this.proyectos= data;
    // })
    // });
  }

  agregarUsuario(form:NgForm){
    // if (form.invalid){
    //   console.log("formulario no valido");
    //   return;
    // }
    // console.log(form);
    // console.log(this.usuario);
    // this._userService.agregarProyecto(this.usuario).subscribe(()=>{
    //   this._userService.getUsuarios().subscribe(data=>{
    //     this.usuarios= data;
    //     })
    // });
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario,this.email,this.password);

  }

}
