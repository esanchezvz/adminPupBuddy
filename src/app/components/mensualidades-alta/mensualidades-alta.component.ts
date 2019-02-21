import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-mensualidades-alta",
  templateUrl: "./mensualidades-alta.component.html",
  styleUrls: ["./mensualidades-alta.component.css"]
})
export class MensualidadesAltaComponent implements OnInit {
  public formato;
  show: Boolean;
  headElementsT1 = ["", "ID", "Nombre Buddy"];
  headElementsT2 = ["", "ID", "Nombre Dirección"];
  selectHandlerBuddies: Function;
  selectHandlerDirecciones: Function;
  buddies: any[];
  currentDate = moment();
  // tarjetas: any[];
  direcciones: any[];
  tarifas: any[];
  membresia = {
    id_usuario: null,
    id_direccion: null,
    id_buddy: null,
    f_alta: null,
    f_corte: null,
    h_paseo1: null,
    h_paseo2: null,
    tipo_servicio: null,
    monto: null
  };

  constructor(
    private serviciosService: ServiciosService,
    private formBuilder: FormBuilder
  ) {
    this.formato = this.formBuilder.group({
      email: ["", Validators.required]
    });

    this.selectHandlerBuddies = (elemID, index) => {
      this.buddies.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }

        if (elemID === item.id_buddy) {
          item.selected = !item.selected;
          this.membresia.id_buddy = elemID;
        }
      });
    };

    this.selectHandlerDirecciones = (elemID, index) => {
      this.direcciones.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }

        if (elemID === item.id_direccion) {
          item.selected = !item.selected;
          this.membresia.id_direccion = elemID;
        }
      });
    };
  }

  ngOnInit() {
    this.getTarifas();
  }

  consultaUsuario() {
    this.serviciosService.postMensualidad(this.formato.value).subscribe(
      response => {
        this.membresia.id_usuario = response.id_usuario;
        this.getBuddies(response.id_usuario);
        this.getDirecciones(response.id_usuario);
        // this.getTarjetas(response.id_usuario);
        this.formato.reset();
      },
      error => {
        alert(`${error}\n Intente de Nuevo.`);
      }
    );
  }

  getBuddies(uid) {
    this.serviciosService.getBuddies(uid).subscribe(
      response => {
        this.buddies = response.map(buddy => {
          return { ...buddy, selected: false };
        });
        console.log("BUDDIES ->", this.buddies);
      },
      error => {
        console.log(error);
      }
    );
  }

  getTarifas() {
    this.serviciosService.getTarifas().subscribe(
      response => {
        this.tarifas = response.map(tarifa => tarifa);
        console.log(this.tarifas);
      },
      error => {
        console.log(error);
      }
    );
  }

  // getTarjetas(uid) {
  //   this.serviciosService.getTarjetas(uid).subscribe(
  //     response => {
  //       this.tarjetas = response.map(tarjeta => {
  //         return { ...tarjeta, selected: false };
  //       });
  //       console.log("TARJETAS ->", this.tarjetas);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  getDirecciones(uid) {
    this.serviciosService.getDirecciones(uid).subscribe(
      response => {
        this.direcciones = response.map(dir => {
          return { ...dir, selected: false };
        });
        console.log("DIRECCIONES ->", this.direcciones);
      },
      error => {
        console.log(error);
      }
    );
  }

  setService(event) {
    // Mostrar Segundo Input de Hora
    if (event.target.value % 2 !== 0) {
      this.show = true;
    } else {
      this.show = false;
    }

    const servicio = this.tarifas.filter(
      tarifa => tarifa.id == event.target.value
    );
    console.log("SERVICIO", servicio);
    this.membresia.tipo_servicio = servicio[0].id;
    this.membresia.monto = servicio[0].costo;
  }

  setDates(event) {
    const fAlta = moment(event.target.value);
    this.membresia.f_alta = fAlta.valueOf();
    this.membresia.f_corte = fAlta
      .add(1, "months")
      .subtract(1, "days")
      .valueOf();
  }

  setTime1() {
    const hr = (<HTMLInputElement>document.getElementById("timePicker")).value;
    if (hr.length > 1) {
      const hora = moment(hr, "HH:mm a").valueOf();
      this.membresia.h_paseo1 = hora;
    } else {
      console.error("EMPTY");
    }
  }

  setTime2() {
    const hr = (<HTMLInputElement>document.getElementById("timePicker2")).value;
    if (hr.length > 1) {
      const hora = moment(hr, "HH:mm a").valueOf();
      this.membresia.h_paseo2 = hora;
      console.log("-->", hora);
    } else {
      console.error("EMPTY");
    }
  }

  sendMembresia() {
    this.setTime1();
    this.show ? this.setTime2() : null;
    this.serviciosService.postMembresia(this.membresia).subscribe(
      response => {
        alert(`${response.message}`);
        this.formato.reset();
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.membresia);
  }
}
