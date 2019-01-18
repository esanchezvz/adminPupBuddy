import { Component, OnInit } from "@angular/core";
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

        if (elemID === item.id) {
          item.selected = !item.selected;
        }
      });
    };
  }

  ngOnInit() {
    this.serviciosService.getTip().subscribe(
      response => {
        this.tips = response;
        this.items = this.tips;
        this.items = this.tips.map(item => {
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
