import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toRealizar() {
    this.router.navigate(["pagos/realizar"]);
  }

  toHistorico() {
    this.router.navigate(["pagos/historico"]);
  }

}
