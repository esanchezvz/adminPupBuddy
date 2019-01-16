import { Component, OnInit } from '@angular/core';
import { elementStart } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  elements: any = [
    { id: 1, nombre: 'Nombre Tip 1', fecha: '26/06/2019' },
    { id: 2, nombre: 'Nombre Tip 2', fecha: '01/11/2019' },
    { id: 3, nombre: 'Nombre Tip 3', fecha: '14/02/2019' },
  ];
  headElements = ['', 'ID', 'Nombre Tip', 'Fecha'];
  selectHandler: Function;
  selectedRow: any[];
  items = this.elements.map(item => {
    return {...item, selected: false}
  })
  constructor() { 

    this.selectHandler = (elemID, index) => {
      this.items.forEach(item => {
        if (item.selected === true) {
          item.selected = false;
        }
        
        if (elemID === item.id) {
          item.selected = !item.selected;
        }
      });
    }

  }

  ngOnInit() {
  }


}
