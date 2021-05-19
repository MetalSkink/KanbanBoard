import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from '../models/Tarea';
import { Bitacora } from '../models/Bitacora';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http:HttpClient) { }
  url    ='http://localhost:8080/tareas';
  urlBita='http://localhost:8080/bitacoras';

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

  statusProgreso(id:number,tarea: Tarea){
    return this.http.put<any>(this.url + `/progreso/${id}`,tarea);
  }

  statusPausar(id:number,tarea: Tarea){
    return this.http.put<any>(this.url + `/pausar/${id}`,tarea);
  }

  iniciarBitacora(bitacora:Bitacora){
    return this.http.post<any>(this.urlBita + `/iniciarBitacora`,bitacora);
  }

  pausarBitacora(id:number,bitacora:Bitacora){
    return this.http.put<any>(this.urlBita + `/pausarBitacora/${id}`,bitacora);
  }
}
