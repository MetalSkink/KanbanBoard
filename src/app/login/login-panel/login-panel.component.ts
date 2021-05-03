import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  usuario= new Usuario();
  logeado:boolean= false;
  idUsuario:number;

  //NUEVOS CAMPOS
  isLogged = false;
  isLoginFail= false;
  loginUsuario : LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];

  errMsj:string;

  constructor(
    private router:Router,
    private tokenService:TokenService,
    private authService:AuthService) {

    //CODIGO QUE NO SE SI BORRAR
    // this.idUsuario=Number(localStorage.getItem('nControl'));
    // this._usuariosServive.getUsuario(this.idUsuario).subscribe(data=>{
    //   console.log(data);

    // })

  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged= true;
      this.isLoginFail= false;
      this.roles= this.tokenService.getAuthorities();
    }
    if(this.isLogged= true){
      this.router.navigate(["/board"])
    }
    //PARA QUE NO REGRESE AL LOGIN SI YA ESTA LOGEADO
    //if ( this.isLogged= true) {
      //this.router.navigate(["/board"])
    //}
  }

  onLogin(){
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged =true;
        this.isLoginFail=false;
        console.log(data);

        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(["/board"])

      },
      err =>{
        //console.log(err);
        this.isLogged = false;
        this.isLoginFail= true;
        this.errMsj = err.error.message;
        console.log(this.errMsj);
      }
    );
  }
}
