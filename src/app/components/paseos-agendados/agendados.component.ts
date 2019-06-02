import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-agendados',
  templateUrl: './agendados.component.html',
  styleUrls: ['./agendados.component.css']
})
export class AgendadosComponent implements OnInit {
  agendados: any[];
  membresias: any[];
  consulta = false;
  headElements = [
    '# Paseador',
    'Fecha Servicio',
    'Hora Servicio',
    'Hora Inicio',
    'Status',
    'Ver mas'
  ];
  selectHandler: Function;
  selectedRow: any[];
  items: any[];
  fecha1: any;
  fecha2: any;
  minDate: any;
  paseo: any = {
    idPaseo: null,
    status: null,
    servicio: null
  };

  cobrar: any = {
    idSolicitud: null,
    idPaseo: null
  };

  constructor(private servicios: ServiciosService, private router: Router) {
    this.selectHandler = (elemID, index) => {
      this.items.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }

        if (elemID === item.id_tip) {
          item.selected = !item.selected;
        }
      });
    };
  }

  iniciarPaseo(elem, tipo) {
    tipo === 0
      ? (this.paseo.idPaseo = elem.id_paseo)
      : (this.paseo.idPaseo = elem.id_agendado);
    this.paseo.status = 1;
    this.paseo.servicio = tipo;
    console.log('PETICION', this.paseo);
    this.servicios.postPaseoInicioFin(this.paseo).subscribe(
      response => {
        console.log(response.message);
        if (response.message === 'Paseo iniciado') {
          alert('Paseo iniciado correctamente');
          // this.router.navigate(['paseos/match']);
        } else {
          alert('ERROR DESCONOCIDO');
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  terminarPaseo(elem, tipo) {
    tipo === 0
      ? (this.paseo.idPaseo = elem.id_paseo)
      : (this.paseo.idPaseo = elem.id_agendado);
    this.paseo.status = 2;
    this.paseo.servicio = tipo;
    // console.log(this.paseo);
    this.servicios.postPaseoInicioFin(this.paseo).subscribe(
      response => {
        console.log(response.message);
        if (response.message === 'Paseo finalizado') {
          alert('Paseo finalizado correctamente');
          // this.router.navigate(['paseos/match']);
        } else {
          alert('ERROR DESCONOCIDO');
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  generarCargo(elem) {
    console.log(elem);
    this.cobrar.idSolicitud = elem.id_solicitud;
    this.cobrar.idPaseo = elem.id_paseo;
    alert(
      `Espere unos segundos a que se verifique la información bancaria. \n En caso de ser exitosa será redirigido a otra pantalla`
    );
    this.servicios.postCargo(this.cobrar).subscribe(
      response => {
        console.log(response.message);
        if (response.tipo === 'SUCCESS') {
          // this.router.navigate(['paseos/match']);
        } else {
          alert(response.message);
        }
      },
      error => {
        console.error(error);
        alert('La tarjeta no paso, ponte en contacto con el cliente');
      }
    );
  }

  ngOnInit() {
    this.paseo = {
      idPaseo: null,
      status: null,
      servicio: null
    };
    if (this.consulta === true) {
      this.getFechas();
    }
  }

  checkHorarioVerano() {
    const today = moment();
    const year = new Date().getFullYear();
    const primerDomAbril = moment([year, 0 + 3])
      .endOf('month')
      .weekday(0);
    const ultimoSabOctubre = moment([year, 0 + 9])
      .endOf('month')
      .weekday(0);

    if (
      today.isSameOrAfter(primerDomAbril) &&
      today.isSameOrBefore(ultimoSabOctubre)
    ) {
      return true;
    } else {
      return false;
    }
  }

  toDetalles(paseo) {
    sessionStorage.setItem('detalles', JSON.stringify(paseo));
    this.router.navigate(['paseos/detalles']);
  }

  checkInput(value, id) {
    switch (id) {
      case 1:
        this.fecha1 = value;
        this.minDate = moment(this.fecha1)
          .add(1, 'days')
          .format('YYYY-MM-DD');
        break;
      case 2:
        this.fecha2 = value;
        break;
      default:
        this.fecha1 = null;
        this.fecha2 = null;
    }
  }

  getFechas() {
    const fecha1 = moment(this.fecha1).format('YYYY/MM/DD');
    const fecha2 = moment(this.fecha2).format('YYYY/MM/DD');
    this.consulta = true;

    console.log({ i: fecha1, f: fecha2 });
    this.servicios.postFechasAgendados({ i: fecha1, f: fecha2 }).subscribe(
      res => {
        this.agendados = res;
        console.log('agendados ->', this.agendados);
        // this.consulta1 = true;
      },
      err => {
        console.log(err);
      }
    );

    this.servicios
      .postFechasAgendadosMembresias({ i: fecha1, f: fecha2 })
      .subscribe(
        res => {
          this.membresias = res;
          console.log('membresias ->', this.membresias);
          // this.consulta1 = true;
        },
        err => {
          console.log(err);
        }
      );
  }

  toMembresia(elem) {
    let membresia;

    this.servicios.getMembresiaDetalle(elem.id_membresia).subscribe(
      res => {
        membresia = res;
        sessionStorage.setItem('membresia', JSON.stringify(membresia));
        this.router.navigate(['mensualidades/editar/', elem.id_membresia]);
      },
      err => {
        alert('Ocurrió un error. Intente de nuevo');
      }
    );
  }
}
