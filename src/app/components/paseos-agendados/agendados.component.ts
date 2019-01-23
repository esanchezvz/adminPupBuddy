import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-agendados',
  templateUrl: './agendados.component.html',
  styleUrls: ['./agendados.component.css']
})
export class AgendadosComponent implements OnInit {
  agendados: any[];
  headElements = ["", "# Solicitud", "# Paseador", "Hora", "Status", "Hora Inicio", "Hora Finalizado"];
  selectHandler: Function;
  selectedRow: any[];
  items: any[];

  constructor(
    private servicios: ServiciosService
  ) {
    this.selectHandler = (elemID, index) => {
      this.items.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }

        if (elemID === item.id_tip) {
          item.selected = !item.selected;
        }
      });
    };
  }

  ngOnInit() {
    this.servicios.getAgendados().subscribe(
      response => {
        this.agendados = response;
        this.items = this.agendados.map(item => {
          return { ...item, selected: false }
        });
        console.log('AGENDADOS ->', this.items)
      },
      error => {
        console.log(error);
      }
    )
  }

}
