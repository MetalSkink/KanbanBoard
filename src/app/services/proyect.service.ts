import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../models/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor(private http:HttpClient) { }
  url='http://localhost:8080/proyectos';

  getProyectos(){
    return this.http.get<Proyecto[]>(this.url);
  }

  getProyecto(id:number){
    return this.http.get<Proyecto>(`${this.url}/${id}`);
  }

  deleteProyecto(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  agregarProyecto(proyecto:Proyecto){
    return this.http.post(this.url,proyecto);
  }
}
