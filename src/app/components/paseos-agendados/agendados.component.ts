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
  paseo: any = {
    idPaseo: null,
    status: null
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

  iniciarPaseo(elem) {
    this.paseo.idPaseo = elem.id_paseo;
    this.paseo.status = 1;
    this.servicios.postPaseoInicioFin(this.paseo).subscribe(
      response => {
        console.log(response.message);
        this.ngOnInit();
      },
      error => {
        console.error(error);
      }
    );
  }

  terminarPaseo(elem) {
    console.log(elem);
    this.paseo.idPaseo = elem.id_paseo;
    this.paseo.status = 2;
    this.servicios.postPaseoInicioFin(this.paseo).subscribe(
      response => {
        console.log(response.message);
        this.ngOnInit();
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
        this.router.navigate(['paseos/match']);
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
      status: null
    };
    this.servicios.getAgendados().subscribe(
      response => {
        this.items = response;
        console.log('items', response);
        this.agendados = this.items.map(item => {
          return {
            ...item,
            selected: false,
            fechaEditada: moment(item.rmatch).add(1, 'hours'),
            horaInicioEditada: moment(item.inicio)
              .add(1, 'hours')
              .valueOf()
          }; /*@TODO JCVD: quitar la hora que se agrega cuando se arregle el servicio*/
        });
        console.log('AGENDADOS ->', this.agendados);
      },
      error => {
        console.log(error);
      }
    );
  }

  toDetalles(paseo) {
    sessionStorage.setItem('detalles', JSON.stringify(paseo));
    this.router.navigate(['paseos/detalles']);
  }
}
