import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizados',
  templateUrl: './realizados.component.html',
  styleUrls: ['./realizados.component.css']
})
export class RealizadosComponent implements OnInit {

  realizados: any[];

  constructor(
    private servicios: ServiciosService,
    private router: Router
    ) { }

  ngOnInit() {
    this.servicios.getRealizados().subscribe(
      response => {
        console.log(response.message)
        this.realizados = response
      },
      error => {
        console.error(error)
      }
    )
  }

}
