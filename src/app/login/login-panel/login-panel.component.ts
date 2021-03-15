import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  usuario= new Usuario();
  logeado:boolean= false;
  idUsuario:number;

  constructor(private router:Router,
              private _usuariosServive:UsuarioService) {
    this.logeado=Boolean(localStorage.getItem('sesion'));
    console.log(this.logeado);
    if (this.logeado) {
      console.log('te voy a redirigir al board');

    }else{
      console.log('te quedas en el login');
    }
    this.idUsuario=Number(localStorage.getItem('nControl'));
    this._usuariosServive.getUsuario(this.idUsuario).subscribe(data=>{
      console.log(data);

    })

  }

  ngOnInit(): void {
  }

  login(form:NgForm){
    if (form.invalid){
      console.log("formulario no valido");
      return;
    }
    console.log(this.usuario);
    let guardarNumero:string= String(this.usuario.idUsuario);

    console.log("El id que se esta guardando es "+guardarNumero);


    localStorage.setItem('nControl', guardarNumero);
    localStorage.setItem('sesion', 'true');

    this.router.navigateByUrl('/board');


  }

}
