import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-alta-tip",
  templateUrl: "./alta-tip.component.html",
  styleUrls: ["./alta-tip.component.css"]
})
export class AltaTipComponent implements OnInit {
  public formato;
  public imagen;

  constructor(
    private serviciosService: ServiciosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formato = this.formBuilder.group({
      nombre: ["", Validators.required],
      texto: ["", Validators.required],
      fdp: ["", Validators.required],
      fregistro: ["", Validators.required],
      url: ["", Validators.required],
      img: ["", Validators.required]
    });
  }

  ngOnInit() {}

  registrar() {
    this.formato.value.fdp = moment(this.formato.value.fdp).format(
      "DD/MM/YYYY"
    );
    this.serviciosService.postTip(this.formato.value).subscribe(
      res => {
        alert(res.message);
        this.router.navigate(["tips/consulta"]);
      },
      err => {
        alert("ERROR\n" + err.message);
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
        this.imagen = base64;
        this.formato.value.img = this.imagen;
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

  toConsulta() {
    this.router.navigate(["tips/consulta"]);
  }
}
