import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cobrosprep',
  templateUrl: './cobrosprep.component.html',
  styleUrls: ['./cobrosprep.component.css']
})
export class CobrosprepComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toCobros() {
    this.router.navigate(["cobrosprep/cobros"]);
  }

  toRecibos() {
    this.router.navigate(["cobrosprep/recibos"]);
  }

}
