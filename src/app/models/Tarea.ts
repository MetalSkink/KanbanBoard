import { Bitacora } from './Bitacora';
import { Status } from './Status';
import { Accion } from './Accion';
import { Columna } from './Columna';

export class Tarea{
  idTarea?: number;
  nombreTarea: string;
  idAsociado:number;
  idUsuarioTarea: number;
  bitacoras?:Bitacora[];
  status: Status;
  accion:Accion;
  columna:Columna;
  descripcion?: string;
}
