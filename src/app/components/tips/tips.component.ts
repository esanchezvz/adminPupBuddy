import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";

@Component({
  selector: "app-tips",
  templateUrl: "./tips.component.html",
  styleUrls: ["./tips.component.css"]
})

export class TipsComponent implements OnInit {
  tips: any[];
  headElements = ["", "ID", "Nombre Tip", "Fecha"];
  selectHandler: Function;
  selectedRow: any[];
  items: any[];


  constructor(
    private serviciosService: ServiciosService
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

  //Funcional prev de imagen al seleccionarla
  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        (<HTMLImageElement>document.getElementById('preview')).src = e.target.result
        //assuming element with id blah will always be an ImageElement
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  //END

  ngOnInit() {
    this.serviciosService.getTip().subscribe(
      response => {
        this.tips = response;
        this.items = this.tips.map(item => {
          return { ...item, selected: false };
        });
        console.log("TIPS->", this.items);
      },
      error => {
        console.log(error);
      }
    );
  }
}
