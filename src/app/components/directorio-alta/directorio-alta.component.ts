import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { toBase64String } from "@angular/compiler/src/output/source_map";

@Component({
  selector: "app-directorio-alta",
  templateUrl: "./directorio-alta.component.html",
  styleUrls: ["./directorio-alta.component.css"]
})
export class DirectorioAltaComponent implements OnInit {
  public formato;
  public imgFlag = false;
  private urlImg = "";
  private urlImgFinal = "";

  constructor(
    private serviciosService: ServiciosService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe
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
      img: [""]
    });
  }

  altaDirectorio() {
    if (this.urlImg == "") {
      alert("Favor de agregar una imagen");
      return;
    }
    if (this.formato.invalid) {
      alert("Favor de verificar los campos");
      return;
    }
    this.getOnlyBase64(); // Obtiene la base 64 en finalUrl
    console.log(this.urlImgFinal);
    this.formato.value.img = this.urlImgFinal;
    this.serviciosService.postDirectorio(this.formato.value).subscribe(
      res => {
        this.formato.reset();
        alert(`¡Éxito!\n${res.message}`);
      },
      error => {
        alert("Error! Vuelva a intentar.");
      }
    );
  }

  ngOnInit() {}

  onFileChanged(event) {
    // CONTROL DE IMAGEN AGREGADA
    if (event.target.files && event.target.files[0]) {
      if (this.checkImage(event.target.files[0])) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = event => {
          this.urlImg = reader.result.toString();
        };
        this.imgFlag = true;
      }
    }
  }

  getOnlyBase64() {
    this.urlImgFinal = this.urlImg; //.split("base64,")[1];
  }

  checkImage(img: any) {
    if (img.size > 1000000) {
      console.log("TOO LARGE");
      alert("La imagen supera el máximo de 1MB");
      return false;
    }
    if (
      img.type.toString() === "image/jpeg" ||
      // img.type.toString() === "image/png" ||
      img.type.toString() === "image/jpg"
    ) {
      return true;
    }

    alert("Solo se pueden subir imagenes de tipo JPEG, JPG y PNG");
    return false;
  }
}
