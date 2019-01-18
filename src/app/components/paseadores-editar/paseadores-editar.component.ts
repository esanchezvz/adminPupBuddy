import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from "src/app/services/servicios.service";

@Component({
  selector: 'app-paseadores-editar',
  templateUrl: './paseadores-editar.component.html',
  styleUrls: ['./paseadores-editar.component.css']
})
export class PaseadoresEditarComponent implements OnInit {
  paseadores: any = [];
  headElements = ['', 'ID', 'Nombre', 'Email', 'Teléfono', 'Status']; //FALTA CALIFICACION  Y STATUS
  selectHandler: Function;
  selectedRow: any[];

  items = this.paseadores.map(item => {
    return { ...item, selected: false }
  })

  constructor(
    private router: Router,
    private serviciosService: ServiciosService
  ) {
    this.selectHandler = (elemID, elem) => {
      localStorage.setItem("editPaseador", JSON.stringify(elem));
      this.router.navigate([`paseadores/editar/${elemID}`]);
    }
  }

  ngOnInit() {
    this.serviciosService.getPaseador().subscribe(
      response => {
        console.log(response)
        this.paseadores = response;
        this.items = this.paseadores;
        this.items = this.paseadores.map(item => {
          return { ...item, selected: false };
        });

        console.log("RESPONSE->", this.items);
      },
      error => {
        console.log(error);
      }
    );
  }

}
