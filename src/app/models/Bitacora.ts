export class Bitacora {
  idBitacora?:number;
  idTareaAsoc:number;
  horaInicio:number;
  horaFin:number;
  horasTotales:number;
  constructor(idTareaAsoc:number,horaInicio:number,horaFin:number,horasTotales:number) {
    this.idTareaAsoc=idTareaAsoc;
    this.horaInicio=horaInicio;
    this.horaFin=horaFin;
    this.horasTotales=horasTotales;
  }
}
