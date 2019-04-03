import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-detalles-calendario",
  templateUrl: "./detalles-calendario.component.html",
  styleUrls: ["./detalles-calendario.component.css"]
})
export class DetallesCalendarioComponent implements OnInit {
  detalles: any;
  paseador: any;
  buddies: any[];
  buddyText: String;
  paseoEnCurso: Boolean;
  oneBuddy = false;
  twoBuddies = false;
  threeBuddies = false;
  fourBuddies = false;
  idBuddies: Number[];
  getBuddiesInfo: Boolean;
  public fecha;
  public statusText;

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.buddies = [];
    const { id_paseo } = JSON.parse(sessionStorage.getItem("detalles"));
    this.servicio.getDetallesPaseoAdmin(id_paseo).subscribe(
      res => {
        this.detalles = res;
        this.detalles.status === 1
          ? (this.paseoEnCurso = true)
          : (this.paseoEnCurso = false);

        this.getBuddiesInfo = true;
        const { buddy0, buddy1, buddy2, buddy3 } = this.detalles;
        this.idBuddies = [buddy0, buddy1, buddy2, buddy3];
        this.fecha = moment(this.detalles.fecha);

        if (this.detalles.status === 1) {
          this.statusText = "En Curso";
        } else if (this.detalles.status === 0) {
          this.statusText = "Agendado";
        }
        console.log(this.detalles);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.getBuddiesInfo) {
      console.log(this.idBuddies);
      this.idBuddies.map(id => {
        const buddy = null;
        if (id !== 0) {
          this.servicio.getBuddyInfo(id).subscribe(
            res => {
              this.buddies.push(res);
            },
            err => {
              console.log(err);
            }
          );
        }
      });
      this.getNumberOfBuddies() === 1
        ? (this.buddyText = "Buddy")
        : (this.buddyText = "Buddies");

      if (this.getNumberOfBuddies() === 1) {
        this.oneBuddy = true;
      } else if (this.getNumberOfBuddies() === 2) {
        this.twoBuddies = true;
      }
      if (this.getNumberOfBuddies() === 3) {
        this.threeBuddies = true;
      }
      if (this.getNumberOfBuddies() === 4) {
        this.fourBuddies = true;
      }

      this.getBuddiesInfo = false;
    }
  }

  getNumberOfBuddies() {
    const arr = this.idBuddies.filter(id => id !== 0);
    return arr.length;
  }
}
