import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-match',
  templateUrl: './paseos.component.html',
  styleUrls: ['./paseos.component.css']
})
export class PaseosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toMatch() {
    this.router.navigate(["paseos/match"]);
  }

  toAgendados() {
    this.router.navigate(["paseos/agendados"]);
  }

  toRealizados() {
    this.router.navigate(["paseos/realizados"]);
  }

}
