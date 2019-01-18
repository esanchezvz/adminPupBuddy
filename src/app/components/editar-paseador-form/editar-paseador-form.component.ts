import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-paseador-form',
  templateUrl: './editar-paseador-form.component.html',
  styleUrls: ['./editar-paseador-form.component.css']
})
export class EditarPaseadorFormComponent implements OnInit {
  paseador: any;
  public masc:boolean;
  public fem:boolean;
  constructor() {}

  ngOnInit() {
    this.paseador = JSON.parse(localStorage.getItem("editPaseador"));
    if (this.paseador.sexo === 0) {
      this.fem = true; // Si es Femenino
      this.masc = false; // Si es Femenino
    } else {
      this.masc = true; // Si es masculino
      this.fem = false;
    }
    console.log(this.paseador)
  }

}
