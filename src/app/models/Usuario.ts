import { Tarea } from './Tarea';
export class Usuario{
  idUsuario: number;
  nombre: string;
  password: string;
  nControl: number;
  permisos:number;
  tareasDeUsuario: Tarea[];
}
