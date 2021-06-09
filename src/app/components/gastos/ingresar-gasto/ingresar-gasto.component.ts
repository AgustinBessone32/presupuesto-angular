import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto : string
  cantidad: number
  formularioIncorrecto : boolean
  txtIncorrecto : string

  constructor( private _presupuestoService: PresupuestoService ) { 
    this.nombreGasto = ''
    this.cantidad = 0 
    this.formularioIncorrecto = false
    this.txtIncorrecto = ''
  }

  ngOnInit(): void {
  }

  agregarGasto(){
    if(this.cantidad > this._presupuestoService.restante){
      this.formularioIncorrecto= true
      this.txtIncorrecto = 'Cantidad ingresada es mayor al restante'
      return
    }
    
    if(this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true
      this.txtIncorrecto = 'Nombre gasto o cantidad incorrecta'
    }else{ 

      const gasto = {
        nombre: this.nombreGasto.toUpperCase(),
        cantidad: this.cantidad
      }

      this._presupuestoService.agregarGasto(gasto)

      this.formularioIncorrecto = false
      this.nombreGasto = ''
      this.cantidad = 0
    }
  }

}
