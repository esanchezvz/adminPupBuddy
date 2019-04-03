import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServiciosService } from "src/app/services/servicios.service";

@Component({
  selector: "app-directorio-consulta",
  templateUrl: "./directorio-consulta.component.html",
  styleUrls: ["./directorio-consulta.component.css"]
})
export class DirectorioConsultaComponent implements OnInit {
  public elements;

  headElements = ["", "ID", "Nombre", "Categoría", "Titular", "Status"];
  selectHandler: Function;
  selectedRow: any[];

  constructor(private router: Router, private service: ServiciosService) {}

  ngOnInit() {

    this.service.getDirecotrio().subscribe(
      res => {
        console.log(res)
        this.elements = res
      },
      err => {
        //alert("No pudimos obtener los datos...")
      }
    );


  }

  /*getDirectorio() {
    this.service.getDirecotrio().subscribe(
      res => {
        this.elements = res.map(item => {
          const comercio = {
            ...item,
            status: "Activo"
          };
          return comercio;
        });
        console.log(this.elements);
      },
      err => {
        //alert("No pudimos obtener los datos...")
      }
    );
  }*/

  selectedDir(item) {
    sessionStorage.setItem("comercio", JSON.stringify(item));
    this.router.navigate(["directorio/editar/", item.id_directorio]);
  }

  changeStatus(st, ps) {

    var data = {
      "status": st,
      "idDirectorio": ps
    }

    this.service.postEstatusDirectorio(data).subscribe(
      response => {
        console.log(response);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }
}
