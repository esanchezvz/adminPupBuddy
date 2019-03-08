import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import * as moment from "moment";

@Component({
  selector: "app-tips",
  templateUrl: "./tips.component.html",
  styleUrls: ["./tips.component.css"]
})
export class TipsComponent implements OnInit {
  tips: any[];
  headElements = ["", "ID", "Nombre Tip", "Fecha"];
  selectHandler: Function;
  items: any[];
  public enable = false;
  public formato;
  public imagenOriginal;
  public newPic = false;
  public nuevaImagen;

  constructor(
    private serviciosService: ServiciosService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe
  ) {
    this.formato = this.formBuilder.group({
      id_tip: ["", Validators.required],
      nombre: ["", Validators.required],
      texto: ["", Validators.required],
      fdp: ["", Validators.required],
      fregistro: ["", Validators.required],
      url: ["", Validators.required],
      img: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.serviciosService.getTip().subscribe(
      response => {
        this.tips = response;
        console.log("TIPS->", this.tips);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngDoCheck(): void {
    if (this.newPic === true) {
      this.formato.value.img = this.nuevaImagen;
    }
  }

  handleEditar(tip) {
    this.enable = true;
    this.formato = this.formBuilder.group({
      id_tip: [tip.id_tip, Validators.required],
      nombre: [tip.nombre, Validators.required],
      texto: [tip.texto, Validators.required],
      fdp: [moment(tip.fdp).format("YYYY-MM-DD"), Validators.required],
      fregistro: [tip.fregistro, Validators.required],
      url: [tip.url, Validators.required],
      img: [tip.img, Validators.required]
    });

    this.imagenOriginal = tip.img;
    console.log(this.imagenOriginal);
  }

  cancelar(e) {
    this.enable = false;
    this.imagenOriginal = null;
    this.nuevaImagen = null;
    this.formato = this.formBuilder.group({
      id_tip: ["", Validators.required],
      nombre: ["", Validators.required],
      texto: ["", Validators.required],
      fdp: ["", Validators.required],
      fregistro: ["", Validators.required],
      url: ["", Validators.required],
      img: ["", Validators.required]
    });
  }

  guardar() {
    this.formato.value.fdp = moment(this.formato.value.fdp).format(
      "DD/MM/YYYY"
    );

    this.serviciosService
      .putTip(this.formato.value, this.formato.value.id_tip)
      .subscribe(
        response => {
          confirm(response.message) ? this.ngOnInit() : this.ngOnInit();
        },
        err => {
          alert(err.message);
        }
      );
  }

  handleUpload(e) {
    let files = e.target.files;

    if (files[0] && this.checkImage(files[0])) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = event => {
        const base64 = reader.result.toString();
        this.nuevaImagen = base64;
        this.newPic = true;
        this.formato.value.img = this.nuevaImagen;
      };
    } else if (this.checkImage(files[0]) === false) {
      e.target.value = null;
      alert(
        "Recuerda que la imagen solo puede ser .png y no debe exceder 1MB."
      );
    }
  }

  checkImage(img: any) {
    if (img.size > 1000000) {
      console.log("TOO LARGE");
      return false;
    }
    if (
      // img.type.toString() === "image/jpeg" ||
      // img.type.toString() === "image/jpg" ||
      img.type.toString() === "image/png" //SOLO PNG
    ) {
      return true;
    }
    return false;
  }
}
