import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { ServiciosService } from "src/app/services/servicios.service";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-directorio-edita",
  templateUrl: "./directorio-edita.component.html",
  styleUrls: ["./directorio-edita.component.css"]
})
export class DirectorioEditaComponent implements OnInit {
  public directorio;
  public formato;
  public imagen;
  public flag = false;

  constructor(
    private servicios: ServiciosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formato = this.formBuilder.group({
      nombre: ["", Validators.required],
      categoria: ["", Validators.required],
      direccion: ["", Validators.required],
      lat: ["", Validators.required],
      lng: ["", Validators.required],
      tel: ["", Validators.required],
      web: ["", Validators.required],
      fb: ["", Validators.required],
      instagram: ["", Validators.required],
      t_nombre: ["", Validators.required],
      t_tel: ["", Validators.required],
      t_email: ["", Validators.required],
      url_img: [""]
    });
  }

  ngOnInit() {
    this.directorio = JSON.parse(sessionStorage.getItem("comercio"));
    console.log(this.directorio);
    this.formato = this.formBuilder.group({
      nombre: [this.directorio.nombre, Validators.required],
      categoria: [this.directorio.categoria, Validators.required],
      direccion: [this.directorio.direccion, Validators.required],
      lat: [this.directorio.lat, Validators.required],
      lng: [this.directorio.lng, Validators.required],
      tel: [this.directorio.tel, Validators.required],
      web: [this.directorio.web, Validators.required],
      fb: [this.directorio.fb, Validators.required],
      instagram: [this.directorio.instagram, Validators.required],
      t_nombre: [this.directorio.t_nombre, Validators.required],
      t_tel: [this.directorio.t_tel, Validators.required],
      t_email: [this.directorio.t_email, Validators.required],
      url_img: [this.directorio.url_img]
    });
    console.log(this.formato.value);
  }

  registrar() {
    this.servicios
      .putDirectorio(this.formato.value, this.directorio.id_directorio)
      .subscribe(
        response => {
          console.log(this.formato.value);
          alert(`${response.message} \n Paseador editado exitosamente`);
          this.toConsulta();
        },
        error => {
          alert(`${error.message}\n Intente de Nuevo.`);
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
        this.flag = true;
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
      console.log("TOO LARGE");
      return false;
    }
    if (
      img.type.toString() === "image/jpeg" ||
      img.type.toString() === "image/jpg"
      // img.type.toString() === "image/png" //SOLO PNG
    ) {
      return true;
    }
    return false;
  }

  toConsulta() {
    this.router.navigate(["directorio/consulta"]);
  }
}
