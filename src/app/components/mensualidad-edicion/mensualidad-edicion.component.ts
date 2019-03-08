import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router, ActivatedRoute } from "@angular/router";
import { initDomAdapter } from "@angular/platform-browser/src/browser";

@Component({
  selector: "app-mensualidad-edicion",
  templateUrl: "./mensualidad-edicion.component.html",
  styleUrls: ["./mensualidad-edicion.component.css"]
})
export class MensualidadEdicionComponent implements OnInit {
  public idAut;
  public activado: Boolean; // Si está activado, desactivar input de autorización

  constructor(
    // private router: Router,
    private serviciosService: ServiciosService,
    private route: ActivatedRoute
  ) {}

  id: String;
  fechas: any[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.idAut = "VALOR INPUT";
    });
    this.serviciosService.getMembresia(this.id).subscribe(
      res => {
        this.fechas = res;
        console.log(this.fechas);
      },
      err => {
        console.log(err);
      }
    );
  }

  getFechas() {
    this.serviciosService
      .postAgendarMembresia({ idMembresia: this.id, idAut: this.idAut })
      .subscribe(
        res => {
          this.serviciosService.getMembresia(this.id).subscribe(
            res => {
              this.fechas = res;
              this.ngOnInit();
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
}
