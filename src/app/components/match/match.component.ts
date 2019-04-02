import { Component, OnInit } from '@angular/core';
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  solicitudes: any[];
  paseadores: any[];
  titulosSolicitudes = ["", "Solicitud", "Fecha Servicio", "Hora Servicio", "Ver mas"];
  titulosPaseadores = ["", "ID", "Nombre"];
  selectHandlerSolicitud: Function;
  selectHandlerPaseador: Function;
  makeMatch: Function;
  selectedRow: any[];
  itemsSolicitud: any[];
  itemsPaseador: any[];
  match: any = {};

  constructor(
    private servicios: ServiciosService,
    private router: Router
  ) {
    this.match = {
      "idUsuario": null,
      "idPaseador": null,
      "idSolicitud": null
    }

    this.makeMatch = () => {
      console.log(this.match)
      this.servicios.postMatch(this.match).subscribe(
        response => {
          console.log(response)
          this.router.navigate(["paseos/agendados"]);
        },
        error => {
          console.log(error)
        })
    }

    this.selectHandlerSolicitud = (elemID, index) => {
      this.itemsSolicitud.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }
        if (elemID === item.id_solicitud) {
          item.selected = true;
          this.match.idUsuario = item.id_usuario;
          this.match.idSolicitud = item.id_solicitud;
        }
      });
    };

    this.selectHandlerPaseador = (elemID, index) => {
      this.itemsPaseador.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }
        if (elemID === item.id_paseador) {
          item.selected = true;
          this.match.idPaseador = item.id_paseador;
        }
      });
    };
  }

  ngOnInit() {

    // GET PASEADORES
    this.servicios.getPaseador().subscribe(
      response => {
        this.paseadores = response;
        this.itemsPaseador = this.paseadores.map(item => {
          return { ...item, selected: false }
        });
        console.log('PASEADORES ->', this.itemsPaseador)
      },
      error => {
        console.log(error);
      }
    )

    // GET SOLICITUDES
    this.servicios.getSolicitud().subscribe(
      response => {
        this.solicitudes = response;
        // this.itemsSolicitud = this.solicitudes;
        this.itemsSolicitud = this.solicitudes.map(item => {
          return { ...item, selected: false }
        });
        console.log('SOLICITUDES ->', this.itemsSolicitud)
      },
      error => {
        console.log(error);
      }
    )
  }

  toDetalles(paseo) {
    sessionStorage.setItem('detalles', JSON.stringify(paseo));
    this.router.navigate(['paseos/solicitud']);
  }

}
