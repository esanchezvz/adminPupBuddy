import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendados',
  templateUrl: './agendados.component.html',
  styleUrls: ['./agendados.component.css']
})

export class AgendadosComponent implements OnInit {
  agendados: any[];
  headElements = ["# Solicitud", "# Paseador", "Hora", "Status", "Hora Inicio", "Hora Finalizado"];
  selectHandler: Function;
  selectedRow: any[];
  items: any[];
  paseo:any = {
    idPaseo: null,
    status: null
  };

  constructor(
    private servicios: ServiciosService,
    private router: Router
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

  iniciarPaseo(elem) {
    this.paseo.idPaseo = elem.id_paseo;
    this.paseo.status = 1;
    this.servicios.postPaseoInicioFin(this.paseo).subscribe(
      response => {
        console.log(response.message)
        this.router.navigate(["paseos/agendados"]);
      },
      error => {
        console.error(error)
      }
    )
  }

  terminarPaseo(elem) {
    console.log(elem)
    this.paseo.idPaseo = elem.id_paseo;
    this.paseo.status = 2;
    this.servicios.postPaseoInicioFin(this.paseo).subscribe(
      response => {
        console.log(response.message)
        this.router.navigate(["paseos/match"]);
        
      },
      error => {
        console.error(error)
      }
    )
  }

  ngOnInit() {
    this.paseo = {
      idPaseo: null,
      status: null
    };
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
