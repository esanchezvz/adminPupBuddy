import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-directorio-consulta',
  templateUrl: './directorio-consulta.component.html',
  styleUrls: ['./directorio-consulta.component.css']
})
export class DirectorioConsultaComponent implements OnInit {
  elements: any = new Array<any>()
  
  headElements = ['', 'ID', 'Nombre', 'Categoría', 'Titular', 'Status'];
  selectHandler: Function;
  selectedRow: any[];


  constructor(private router: Router, private service: ServiciosService) {
    this.getDirectorio()
  }

  ngOnInit() {
  }

  getDirectorio(){
    this.service.getDirecotrio().subscribe(
      res =>{
        res.forEach(e => {
          this.elements.push({
            id: e.id_directorio, 
            nombre: e.nombre, 
            categoria: e.categoria,
            titular: e.t_nombre, 
            status: 'Activo' })// CAMBIAR A SERVICIO
        });
      },
      err =>{
        //alert("No pudimos obtener los datos...")
      }
    );
  }

  selectedDir(id){
    this.router.navigate(['directorio/editar/', id]);
  }

}
