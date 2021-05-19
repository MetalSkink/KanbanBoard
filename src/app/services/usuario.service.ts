import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  url='http://localhost:8080/auth2';

  getUsuarios(){
    return this.http.get<Usuario[]>(this.url);
  }

  getUsuario(nombre:string){
    return this.http.get<Usuario>(`${this.url}/${nombre}`);
  }

   deleteUsuario(id:number){
     return this.http.delete(`${this.url}/${id}`);
   }

  // agregarProyecto(usuario:Usuario){
  //   return this.http.post(this.url,usuario);
  // }

}
