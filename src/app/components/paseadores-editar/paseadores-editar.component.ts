import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paseadores-editar',
  templateUrl: './paseadores-editar.component.html',
  styleUrls: ['./paseadores-editar.component.css']
})
export class PaseadoresEditarComponent implements OnInit {
  elements: any = [
    { id: 1, nombre: 'Esteban Sánchez', email: 'esteban.sanvaz@pup-buddy.com', telefono: 5533328717, calificacion: 9, status: 'Activo' },
    { id: 2, nombre: 'Manuel Sánchez', email: 'manuel.vaz@pup-buddy.com', telefono: 5533328717, calificacion: 8, status: 'Activo' },
    { id: 3, nombre: 'Maribel Sánchez', email: 'maribel.san@pup-buddy.com', telefono: 5533328717, calificacion: 10, status: 'Suspendido' },
    { id: 4, nombre: 'Carlos Vivar', email: 'carlos.vivar@pup-buddy.com', telefono: 5533328717, calificacion: 8, status: 'Activo' },
    { id: 5, nombre: 'Jose Sánchez', email: 'jose.sanchez@pup-buddy.com', telefono: 5533328717, calificacion: 9, status: 'Suspendido' },
    { id: 6, nombre: 'Mariana Ramos', email: 'mariana.ramos@pup-buddy.com', telefono: 5533328717, calificacion: 8.5, status: 'Activo' },
    { id: 7, nombre: 'María Isabel Vázquez', email: 'mavari.vaz@pup-buddy.com', telefono: 5533328717, calificacion: 9.2, status: 'Activo' },
    { id: 8, nombre: 'Manuel Tielas', email: 'manuel.tielas@pup-buddy.com', telefono: 5533328717, calificacion: 8.9, status: 'Activo' },
    { id: 9, nombre: 'Teresa García', email: 'teresa.gracia@pup-buddy.com', telefono: 5533328717, calificacion: 9.1, status: 'Activo' },
    { id: 10, nombre: 'Tony Stark', email: 'iron.man@pup-buddy.com', telefono: 5533328717, calificacion: 10, status: 'Suspendido' },
  ];
  headElements = ['', 'ID', 'Nombre', 'Email', 'Teléfono', 'Rating', 'Status'];
  selectHandler: Function;
  selectedRow: any[];

  items = this.elements.map(item => {
    return {...item, selected: false}
  })

  constructor() {
    this.selectHandler = (elemID, index) => {
      this.items.forEach(item => {
        if (elemID === item.id) {
          item.selected = !item.selected;
          console.log(item)
        }
      });
    }
  }

  ngOnInit() {
  }

}
