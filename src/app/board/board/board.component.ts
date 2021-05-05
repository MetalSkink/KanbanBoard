import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Tarea } from '../../models/Tarea';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  nombreUsuario:string;
  tareasDeUsuario:Tarea[]=[];
  //Para cada tarea
  Backlog:Tarea[]=[];
  toDo:Tarea[]=[];
  Doing:Tarea[]=[];
  Done:Tarea[]=[];

  constructor(private _usuariosService: UsuarioService,
              private _tareasService :TareaService) {

  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas(){
    this.Backlog=[];
    this.toDo=[];
    this.Doing=[];
    this.Done=[];
    this.nombreUsuario=String(sessionStorage.getItem('AuthUsername'));
    this._usuariosService.getUsuario(this.nombreUsuario).subscribe(data=>{
      //console.log(data);
      this.tareasDeUsuario=data.tareas;
      console.log(this.tareasDeUsuario);
      this.tareasDeUsuario.forEach(tarea=> {
        if (tarea.columna.idColumna === 1) {
          console.log("tienes id 1");
          this.Backlog.push(tarea);
        }else if (tarea.columna.idColumna === 2) {
          this.toDo.push(tarea);
          console.log("tienes id 2");
        }else if (tarea.columna.idColumna === 3) {
          this.Doing.push(tarea);
          console.log("tienes id 3");
        }else if (tarea.columna.idColumna === 4) {
          this.Done.push(tarea);
          console.log("tienes id 4");
        }
      });
    })
    // console.log(this.Backlog);
    // console.log(this.toDo);
    // console.log(this.Doing);
    // console.log(this.Done);

  }

  empezar(){
    // let date: Date = new Date();
    // console.log(date);

    // let fecha1 = new Date('2016/08/12');
    // let fecha2 = new Date()

    // let resta = fecha2.getTime() - fecha1.getTime()
    // console.log(Math.round(resta/ (1000*60*60*24)))

    let HoraInicio = Date.now();
    console.log("tarea empezada a las"+ HoraInicio);

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

  backlogR(){

  }

  toDoL(){

  }

  toDoR(){

  }

  doingL(){

  }

  doingR(){

  }

  doneL(){

  }

  bajarColumna(tarea:Tarea){
    //let nuevaColumna = tarea.columna.idColumna - 1;
    this._tareasService.bajarColumnaTarea(tarea.idTarea,tarea).subscribe(()=>{
      this.obtenerTareas();
    });
  }

  subirColumna(tarea:Tarea){
    this._tareasService.subirColumnaTarea(tarea.idTarea,tarea).subscribe(()=>{
      this.obtenerTareas();
    });
  }


}
