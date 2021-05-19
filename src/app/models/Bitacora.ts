export class Bitacora {
  idBitacora?:number;
  idTareaAsoc:number;
  horaInicio:Date;
  horaFin:Date;
  horasTotales:number;

  constructor(idTareaAsoc:number,horaInicio:Date,horaFin:Date,horasTotales:number) {
    this.idTareaAsoc=idTareaAsoc;
    this.horaInicio=horaInicio;
    this.horaFin=horaFin;
    this.horasTotales=horasTotales;
  }
}
