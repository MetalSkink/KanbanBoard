import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from '../models/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http:HttpClient) { }
  url='http://localhost:8080/tareas';

  getTareas(){
    return this.http.get<Tarea[]>(this.url);
  }

  getTareasDeProyecto(id){
    return this.http.get<Tarea[]>(`${this.url}/${id}`);
  }

  deleteTarea(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  agregarTarea(tarea:Tarea){
    return this.http.post(this.url,tarea);
  }

  bajarColumnaTarea(id:number,tarea: Tarea){
    return this.http.put<any>(this.url + `/bajar/${id}`,tarea);
  }

  subirColumnaTarea(id:number,tarea: Tarea){
    return this.http.put<any>(this.url + `/subir/${id}`,tarea);
  }
}
