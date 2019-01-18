import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tips-padre',
  templateUrl: './tips-padre.component.html',
  styleUrls: ['./tips-padre.component.css']
})
export class TipsPadreComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toAlta() {
    this.router.navigate(["tips/alta"]);
  }

  toConsulta() {
    this.router.navigate(["tips/consulta"]);
  }

}
