import { Component, OnInit, ElementRef } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cobrosprep-recibos",
  templateUrl: "./cobrosprep-recibos.component.html",
  styleUrls: ["./cobrosprep-recibos.component.css"]
})
export class CobrosprepRecibosComponent implements OnInit {
  paseos = [];
  paseador = [];
  paseosRecibo = [];
  idPaseador: String;
  monto: any;
  habilitarServicio = false;
  constructor(private servicios: ServiciosService, private router: Router) {}

  ngOnInit() {
    this.monto = 0;
    this.paseos = [];
    this.paseador = [];
    this.idPaseador = "";
    this.paseosRecibo = [];
    this.habilitarServicio = false;
  }

  addPaseo(event, paseo) {
    const index = this.paseosRecibo.indexOf(paseo);
    paseo.selected = event.target.checked;

    if (event.target.checked === true && index === -1) {
      this.paseosRecibo.push(paseo);
      this.monto += paseo.buddies * 40;
    } else if (event.target.checked === false && index > -1) {
      this.monto -= paseo.buddies * 40;
      this.paseosRecibo.splice(index, 1);
    }

    console.log(this.paseosRecibo);

    this.paseosRecibo.length > 0
      ? (this.habilitarServicio = true)
      : (this.habilitarServicio = false);
  }

  getPaseos() {
    this.monto = 0;
    this.paseos = [];
    this.servicios.getPaseos(this.idPaseador).subscribe(
      res => {
        this.paseos = res.map(item => {
          return { ...item, selected: false };
        });
        this.getPaseadorInfo();
        console.log(this.paseos);
      },
      err => {
        alert("Ocurrió un error.\n Por favor intente de nuevo.");
      }
    );
  }

  getPaseadorInfo() {
    this.paseador = [];
    this.servicios.getPaseadorInfo(this.idPaseador).subscribe(
      res => {
        this.paseador = res;
        // console.log(this.paseador);
      },
      err => {
        alert(
          "Ocurrió un error.\n No se pudo obtener la información del Paseador.\nPor favor intente de nuevo."
        );
      }
    );
  }

  setId(event) {
    this.idPaseador = event.target.value;
  }

  postRecibo() {
    const paseos = this.paseosRecibo.map(item => {
      const { idServicio, tipo, buddies } = item;
      return { idPaseo: idServicio, tipo };
    });
    const data = {
      idPaseador: this.idPaseador,
      monto: this.monto,
      paseos
    };

    console.log(data);
    this.servicios.postRecibo(data).subscribe(
      res => {
        console.log(res);
        alert("Recibo generado exitosamente.");
        this.router.navigate(["pagos/realizar"]);
      },
      err => {
        console.log(err);
        alert("Ocurrio un error al generar el recibo.");
      }
    );
  }
}
