import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import * as moment from "moment";

@Component({
  selector: "app-pagos-realizar",
  templateUrl: "./pagos-realizar.component.html",
  styleUrls: ["./pagos-realizar.component.css"]
})
export class PagosRealizarComponent implements OnInit {
  recibos = [];
  idRecibo;
  fecha;
  factura;
  selectedRows = [];

  constructor(private servicios: ServiciosService) {}

  ngOnInit() {
    this.selectedRows = [];
    this.servicios.getRecibos().subscribe(
      res => {
        this.recibos = res.map(item => {
          return { ...item, selected: false };
        });
        console.log(this.recibos);
      },
      err => {
        console.log(err);
      }
    );
  }

  consulta() {
    this.servicios.getRecibosId(this.idRecibo).subscribe(
      res => {
        this.recibos = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  setId(event) {
    this.idRecibo = event.target.value;
  }

  revisar(recibo) {
    const { id_recibo } = recibo;

    const data = {
      idRecibo: id_recibo,
      fPago: moment(this.fecha).valueOf(),
      factura: this.factura
    };
    let confirmar = confirm("Seguro que desea pagar este recibo?");
    console.log(data);
    if (confirmar) {
      this.servicios.putRecibo(data).subscribe(
        res => {
          alert("Pago Gaurdado exitosamente.");
          this.ngOnInit();
        },
        err => {
          alert("Ha Ocurrido un error. Intente nuevamente");
          console.log(err);
        }
      );
    }
  }

  pagar(recibo) {
    const { id_recibo } = recibo;
    let confirmar = confirm("Seguro que desea pagar este recibo?");
    if (confirmar) {
      this.servicios.postPago({ idRecibo: id_recibo }).subscribe(
        res => {
          alert("Pago realizado exitosamente,");
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  selectRow(fila, target) {
    if (this.selectedRows.length === 0) {
      fila.selected = !fila.selected;
      this.selectedRows.push(fila);
      this.fecha = null;
      this.factura = null;
    } else if (this.selectedRows.length === 1) {
      this.fecha = null;
      this.factura = null;
      const recibosIndex = this.recibos.indexOf(this.selectedRows[0]);
      this.recibos[recibosIndex].selected = false;
      this.selectedRows.splice(0, 1);
      this.selectedRows.push(fila);
      fila.selected = !fila.selected;
    }
    if (target.checked === false && fila.selected === true) {
      this.fecha = null;
      this.factura = null;
      console.log(target.checked);
      console.log(this.selectedRows);
      fila.selected = false;
      this.selectedRows.splice(0, 1);
    }
  }

  setDate(target) {
    this.fecha = target.value;
    // console.log(moment(this.fecha).valueOf());
  }

  setFactura(target) {
    this.factura = target.value;
    // console.log(this.factura);
  }
}
