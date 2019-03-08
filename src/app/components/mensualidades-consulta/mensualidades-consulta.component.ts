import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiciosService } from "src/app/services/servicios.service";

@Component({
  selector: "app-mensualidades-consulta",
  templateUrl: "./mensualidades-consulta.component.html",
  styleUrls: ["./mensualidades-consulta.component.css"]
})
export class MensualidadesConsultaComponent implements OnInit {
  membresias: any = [];
  headElements = [
    "",
    "ID",
    "Fecha Alta",
    "Fecha Corte",
    "Tipo",
    "Buddy",
    "Hora Paseo",
    "Monto",
    "Status Pago"
  ];
  selectHandler: Function;
  selectedRow: any[];

  constructor(
    private router: Router,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit() {
    this.serviciosService.getMembresias().subscribe(
      res => {
        this.membresias = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  toEditar(elem, id) {
    sessionStorage.setItem("membresia", JSON.stringify(elem));
    this.router.navigate(["mensualidades/editar/", id]);
  }
}
