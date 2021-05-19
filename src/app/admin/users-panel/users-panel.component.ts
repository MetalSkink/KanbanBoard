import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  createUsuario:FormGroup;
  //Campos nuevos
  // nuevoUsuario: NuevoUsuario;
  // nombre:string;
  // nombreUsuario: string;
  // email: string;
  // password: string;

  constructor(private _userService: UsuarioService,
              private authService:AuthService,
              private fb: FormBuilder) {
                this.createUsuario=this.fb.group({
                  nombre:['',Validators.required],
                  nombreUsuario:['',Validators.required],
                  email:['',[Validators.required,Validators.email]],
                  password:['',[Validators.required,Validators.minLength(6)]],
                })
              }

  ngOnInit(): void {
    this._userService.getUsuarios().subscribe(data =>{
      this.usuarios= data;
    });
  }

  borrarUsuario(usuario){

     Swal.fire({
       title: '¿Esta seguro?',
       text: '¿Esta seguro que quiere borrar al usuario '+usuario.nombre+"?",
       icon: 'question',
       showConfirmButton: true,
       showCancelButton: true
     }).then(resp =>{
       if (resp.value){
         this._userService.deleteUsuario(usuario.id).subscribe(()=>{
           this._userService.getUsuarios().subscribe(data=>{
           this.usuarios= data;
           })
           });
       }
     })


  }

  agregarUsuario(){
    if(this.createUsuario.invalid){
      return
    }
    const nuevoUsuario: NuevoUsuario={
      nombre: this.createUsuario.value.nombre,
      nombreUsuario: this.createUsuario.value.nombreUsuario,
      password :this.createUsuario.value.password,
      email: this.createUsuario.value.email,
    }
    console.log(nuevoUsuario);

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
    //this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario,this.email,this.password);
    this.authService.nuevo(nuevoUsuario).subscribe(()=>{
      this._userService.getUsuarios().subscribe(data =>{
        this.usuarios= data;
      });
    })
  }

}
