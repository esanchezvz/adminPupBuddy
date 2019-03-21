import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.component.html',
  styleUrls: ['./realizados.component.css']
})
export class RealizadosComponent implements OnInit {
  realizados: any[];
  items: any[];
  fecha1: any;
  fecha2: any;
  habilitarConsulta: Boolean = false;
  consultaHecha: Boolean = false;
  consultaFechas: Boolean;
  minDate: any;
  nBuddies: any;
  monto: any;

  constructor(private servicios: ServiciosService, private router: Router) {}

  ngOnInit() {
    this.monto = 0;
    this.nBuddies = 0;
    this.servicios.getRealizados().subscribe(
      response => {
        this.items = response;
        this.realizados = this.items.map(item => {
          if (item.status === 2) {
            this.monto += 89 * item.buddies;
            this.nBuddies += item.buddies;
          }
          return {
            ...item,
            fechaEditada: moment(item.inicio).add(1, 'hours'),
            monto: item.status === 2 ? item.buddies * 89 : 'N/A'
          }; /*@TODO JCVD: quitar la hora que se agrega cuando se arregle el servicio*/
        });
        console.log(this.realizados);
        console.log(this.monto);
        console.log(this.nBuddies);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngDoCheck(): void {
    this.consultaFechas ? this.ngOnInit() : null;

    if (this.fecha1 && this.fecha2) {
      this.habilitarConsulta = true;
      this.minDate = moment(this.fecha1)
        .add(1, 'days')
        .format('YYYY-MM-DD');
    } else {
      this.habilitarConsulta = false;
    }
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

  consulta() {
    this.consultaHecha = true;
    this.monto = 0;
    this.nBuddies = 0;
    const fecha1 = moment(this.fecha1).format('YYYY/MM/DD');
    const fecha2 = moment(this.fecha2).format('YYYY/MM/DD');

    console.log({ i: fecha1, f: fecha2 });
    this.servicios.postRealizados({ i: fecha1, f: fecha2 }).subscribe(
      res => {
        this.items = res;
        this.consultaFechas = true;
        this.realizados = this.items.map(item => {
          if (item.status === 2) {
            this.monto += 89 * item.buddies;
            this.nBuddies += item.buddies;
          }
          return {
            ...item,
            fechaEditada: moment(item.inicio).add(1, 'hours'),
            monto: item.status === 2 ? item.buddies * 89 : 'N/A'
          }; /*@TODO JCVD: quitar la hora que se agrega cuando se arregle el servicio*/
        });
        console.log(this.realizados);
      },
      err => {
        console.log(err);
      }
    );
  }
}
