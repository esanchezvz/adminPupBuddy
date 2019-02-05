import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensualidades',
  templateUrl: './mensualidades.component.html',
  styleUrls: ['./mensualidades.component.css']
})
export class MensualidadesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toAlta() {
    this.router.navigate(["mensualidades/alta"]);
  }

  toConsulta() {
    this.router.navigate(["mensualidades/consulta"]);
  }
  
}
