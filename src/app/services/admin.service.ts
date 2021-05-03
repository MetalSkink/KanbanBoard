import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../models/Status';
import { Accion } from '../models/Accion';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  urlStatus='http://localhost:8080/status'
  urlAccion='http://localhost:8080/acciones'

  getStatus(){
    return this.http.get<Status[]>(this.urlStatus);
  }

  getAcciones(){
    return this.http.get<Accion[]>(this.urlAccion);
  }

}
