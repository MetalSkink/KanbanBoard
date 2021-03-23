import { Usuario } from "./Usuario";

export class Tarea{
  idTarea: number;
  idAsociado:number;
  nombreTarea: string;
  horaInicio: number= 0;
  horaFin: number = 0;
  horasAcumuladas: number = 0;
  status: string ="Sin comenzar";
  idUsuarioTarea: number;
  descripcion: string;
}
