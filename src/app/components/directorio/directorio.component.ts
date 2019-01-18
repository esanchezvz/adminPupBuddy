import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toAlta() {
    this.router.navigate(["directorio/alta"]);
  }

  toConsulta() {
    this.router.navigate(["directorio/consulta"]);
  }

}
