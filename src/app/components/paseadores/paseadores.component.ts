import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paseadores',
  templateUrl: './paseadores.component.html',
  styleUrls: ['./paseadores.component.css']
})
export class PaseadoresComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  toAlta() {
    console.log('paseadores/alta');
    this.router.navigate(["paseadores/alta"]);
  }

  toEditar() {
    console.log('paseadores/editar');
    this.router.navigate(["paseadores/editar"]);
  }

}
