import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-clientes-consulta",
  templateUrl: "./clientes-consulta.component.html",
  styleUrls: ["./clientes-consulta.component.css"]
})
export class ClientesConsultaComponent implements OnInit {
  uid: any;
  historial: any;
  buddies: any;
  direcciones: any;
  emailUsuario: any;

  constructor(private servicios: ServiciosService, private router: Router) {}

  ngOnInit() {}

  consulta() {
    this.servicios.postMensualidad({ email: this.emailUsuario }).subscribe(
      response => {
        this.uid = response.id_usuario;
        this.getBuddies(this.uid);
        this.getDirecciones(this.uid);
        this.getHistorial(this.uid);
      },
      error => {
        alert(`${error}\n Intente de Nuevo.`);
      }
    );
  }

  getHistorial(uid) {
    this.servicios.getHistorial(uid).subscribe(
      res => {
        this.historial = res;
        console.log(res);
      },
      err => {
        console.log(err);
        alert("Ocurrió un error al obtener el historial!");
      }
    );
  }

  getBuddies(uid) {
    this.servicios.getBuddies(uid).subscribe(
      res => {
        this.buddies = res;
        console.log(res);
      },
      err => {
        console.log(err);
        alert("Ocurrió un error al obtener buddies!");
      }
    );
  }

  getDirecciones(uid) {
    this.servicios.getDirecciones(uid).subscribe(
      res => {
        this.direcciones = res;
        console.log(res);
      },
      err => {
        console.log(err);
        alert("Ocurrió un error al obtener las direcciones!");
      }
    );
  }

  setEmail(target) {
    this.emailUsuario = target.value;
  }
}
