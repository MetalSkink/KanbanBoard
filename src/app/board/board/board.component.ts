import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Tarea } from '../../models/Tarea';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  idUsuario:number;
  tareasDeUsuario:Tarea[];
  backlog:Tarea[];

  constructor(private _usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.idUsuario=Number(localStorage.getItem('nControl'));
    this._usuariosService.getUsuario(this.idUsuario).subscribe(data=>{
      console.log(data.tareasDeUsuario);
      this.tareasDeUsuario=data.tareasDeUsuario;
      this.backlog=data.tareasDeUsuario;

    })
  }

  empezar(){
    // let date: Date = new Date();
    // console.log(date);

    let fecha1 = new Date('2016/08/12');
    let fecha2 = new Date()

    let resta = fecha2.getTime() - fecha1.getTime()
    console.log(Math.round(resta/ (1000*60*60*24)))
  }

  pausar(){
    let date: Date = new Date();
    console.log("tarea pausada a las"+ date);
  }

  drop (event: CdkDragDrop<Tarea[]>): void{
    console.log("arrastrado test");
    if ( event.previousContainer === event.container){
      return
    }
  }
}
