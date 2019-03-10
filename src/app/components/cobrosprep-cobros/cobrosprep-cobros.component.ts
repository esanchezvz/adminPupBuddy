import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-cobrosprep-cobros",
  templateUrl: "./cobrosprep-cobros.component.html",
  styleUrls: ["./cobrosprep-cobros.component.css"]
})
export class CobrosprepCobrosComponent implements OnInit {
  solicitudes: any;
  membresias: any;
  fecha1: any;
  fecha2: any;
  habilitarConsulta: Boolean = false;
  consultaHecha: Boolean = false;
  consulta1: Boolean;
  consulta2: Boolean;
  minDate: any;

  constructor(private servicios: ServiciosService, private router: Router) {}

  ngOnInit() {
    console.log("Solicitudes ->", this.solicitudes);
    console.log("Membresias ->", this.membresias);
    this.consulta1 = false;
    this.consulta2 = false;
    if (!this.consultaHecha) {
      this.servicios.getCobrosPaseos().subscribe(
        res => {
          this.solicitudes = res;
          console.log("Solicitudes ->", this.solicitudes);
        },
        err => {
          console.log(err);
        }
      );

      this.servicios.getMembresias().subscribe(
        res => {
          this.membresias = res;
          console.log("Membresias ->", this.membresias);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  ngDoCheck(): void {
    this.consulta1 && this.consulta2 ? this.ngOnInit() : null;

    if (this.fecha1 && this.fecha2) {
      this.habilitarConsulta = true;
      this.minDate = moment(this.fecha1)
        .add(1, "days")
        .format("YYYY-MM-DD");
    } else {
      this.habilitarConsulta = false;
    }
  }

  checkInput(value, id) {
    switch (id) {
      case 1:
        this.fecha1 = value;
        this.minDate = moment(this.fecha1)
          .add(1, "days")
          .format("YYYY-MM-DD");
        break;
      case 2:
        this.fecha2 = value;
        break;
      default:
        this.fecha1 = null;
        this.fecha2 = null;
    }
  }

  consulta() {
    this.consultaHecha = true;
    const fecha1 = moment(this.fecha1).format("DD/MM/YYYY");
    const fecha2 = moment(this.fecha2).format("DD/MM/YYYY");

    console.log({ i: fecha1, f: fecha2 });
    this.servicios.postMembresias({ i: fecha1, f: fecha2 }).subscribe(
      res => {
        this.membresias = res;
        console.log("Membresias ->", this.membresias);
        this.consulta1 = true;
      },
      err => {
        console.log(err);
      }
    );

    this.servicios.postCobrosPaseosR({ i: fecha1, f: fecha2 }).subscribe(
      res => {
        this.solicitudes = res;
        console.log("Solicitudes ->", this.solicitudes);
        this.consulta2 = true;
      },
      err => {
        console.log(err);
      }
    );
  }
}
