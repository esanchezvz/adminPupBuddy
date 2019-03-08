import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from "@angular/router";
import { initDomAdapter } from "@angular/platform-browser/src/browser";

@Component({
  selector: "app-mensualidad-edicion",
  templateUrl: "./mensualidad-edicion.component.html",
  styleUrls: ["./mensualidad-edicion.component.css"]
})
export class MensualidadEdicionComponent implements OnInit {
  public idAut;
  public membresia;
  public tipoMembresia;
  public textoBoton;
  public showFechas: any[];
  public paseadores;
  public selectHandlerSolicitud: Function;
  public selectHandlerPaseador: Function;
  public makeMatch: Function;
  public itemsSolicitud: any[];
  public itemsPaseador: any[];
  public match: any = {};
  selectedPaseador = false;
  selectedPaseo = false;
  allowMatch = false;

  constructor(
    private serviciosService: ServiciosService,
    private router: Router
  ) {
    this.match = {
      idPaseador: null,
      idAgendado: null
    };

    this.makeMatch = () => {
      console.log(this.match);
      this.serviciosService.postMatchMembresia(this.match).subscribe(
        response => {
          console.log(response);
          alert("Paseo de Membresía agendado exitosamente");
          this.ngOnInit();
          // this.router.navigate(["paseos/agendados"]);
        },
        error => {
          console.log(error);
        }
      );
    };

    this.selectHandlerSolicitud = (elemID, index) => {
      this.selectedPaseo = false;
      this.showFechas.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }
        if (elemID === item.id_agendado) {
          item.selected = true;
          this.selectedPaseo = true;
          this.match.idAgendado = item.id_agendado;
        }
      });
    };

    this.selectHandlerPaseador = (elemID, index) => {
      this.selectedPaseador = false;
      this.paseadores.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }
        if (elemID === item.id_paseador) {
          item.selected = true;
          this.selectedPaseador = true;
          this.match.idPaseador = item.id_paseador;
        }
      });
    };
  }

  id: String;
  fechas: any[];

  ngOnInit() {
    this.membresia = JSON.parse(sessionStorage.getItem("membresia"));
    this.getMembresiaFechas();
    switch (this.membresia.tipo_servicio) {
      case 2:
        this.tipoMembresia = "Gold Mensual";
        break;
      case 3:
        this.tipoMembresia = "VIB Mensual";
        break;
      case 4:
        this.tipoMembresia = "Gold Trimestral";
        break;
      case 5:
        this.tipoMembresia = "VIB Trimestral";
        break;
      case 6:
        this.tipoMembresia = "Gold Anual";
        break;
      case 7:
        this.tipoMembresia = "VIB Anual";
        break;
      default:
    }
  }

  ngDoCheck(): void {
    // Cambiar Texto botón en dependiendo en status_admin
    this.membresia.status_pago === 0
      ? (this.textoBoton = "Activar")
      : (this.textoBoton = "Desactivar");
    this.selectedPaseador === true && this.selectedPaseo === true
      ? (this.allowMatch = true)
      : (this.allowMatch = false);

    // console.log("MEMBRESÍA ->", this.membresia);
    // console.log("FECHAS ->", this.showFechas);
  }

  getAuthNumber(value) {
    this.idAut = value;
    console.log(this.idAut);
  }

  activarMembresia() {
    this.serviciosService
      .postAgendarMembresia({
        idMembresia: this.membresia.id_membresia,
        idAut: this.idAut
      })
      .subscribe(
        res => {
          this.serviciosService
            .getMembresia(this.membresia.id_membresia)
            .subscribe(
              res => {
                this.fechas = res;
                console.log(this.fechas);
                this.router.navigate(["mensualidades/consulta"]);
              },
              err => {
                console.log(err);
              }
            );
        },
        err => {
          console.log(err);
        }
      );
  }

  getMembresiaFechas() {
    this.serviciosService.getMembresia(this.membresia.id_membresia).subscribe(
      res => {
        this.fechas = res;
        this.showFechas = this.fechas.map(item => {
          if (item.r_match === null) {
            return { ...item, selected: false };
          }
        });

        this.paseadores = this.paseadores.map(item => {
          return { ...item, selected: false };
        });
      },
      err => {
        console.log(err);
      }
    );

    this.serviciosService.getPaseador().subscribe(
      res => {
        this.paseadores = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
