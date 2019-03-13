import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import * as moment from "moment";

@Component({
  selector: "app-pagos-historico",
  templateUrl: "./pagos-historico.component.html",
  styleUrls: ["./pagos-historico.component.css"]
})
export class PagosHistoricoComponent implements OnInit {
  fecha1: any;
  fecha2: any;
  recibos: any;

  constructor(private servicio: ServiciosService) {}

  ngOnInit() {
    // this.servicio.getRecibos().subscribe(
    //   res => {
    //     this.recibos = res;
    //     console.log(this.recibos);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  setFecha1(target) {
    this.fecha1 = target.value;
    console.log(this.fecha1);
  }

  setFecha2(target) {
    this.fecha2 = target.value;
    console.log(this.fecha2);
  }

  consulta() {
    const data = {
      i: this.fecha1,
      f: this.fecha2
    };

    this.servicio.postHistorico(data).subscribe(
      res => {
        this.recibos = res;
        console.log(res);
      },
      err => {
        alert("Ocurrió un error, intente nuevamente.");
        console.log(err);
      }
    );
  }
}
