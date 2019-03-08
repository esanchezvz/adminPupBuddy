import { Component, OnInit } from "@angular/core";
import { ServiciosService } from "src/app/services/servicios.service";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-paseadores-alta",
  templateUrl: "./paseadores-alta.component.html",
  styleUrls: ["./paseadores-alta.component.css"]
})
export class PaseadoresAltaComponent implements OnInit {
  public formato;
  public sexo: Number;
  public imagen;
  public imgFlag = false;

  constructor(
    private serviciosService: ServiciosService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public router: Router
  ) {
    this.formato = this.formBuilder.group({
      nombre: ["", Validators.required],
      ap: ["", Validators.required],
      am: ["", Validators.required],
      fnacimiento: ["", Validators.required],
      sexo: ["", Validators.required],
      email: ["", Validators.required],
      cel: ["", Validators.required],
      rfc: ["", Validators.required],
      banco: ["", Validators.required],
      cuenta: ["", Validators.required],
      clabe: ["", Validators.required],
      img: ["", Validators.required]
    });
  }

  altaPaseador() {
    this.formato.value.sexo = this.sexo;
    this.formato.value.fnacimiento = this.datePipe.transform(
      this.formato.value.fnacimiento,
      "dd/MM/yyyy"
    );
    this.serviciosService.postPaseador(this.formato.value).subscribe(
      response => {
        alert(`${response.message} \n Paseador agragado exitosamente`);
        this.formato.reset();
      },
      error => {
        alert(`${error}\n Intente de Nuevo.`);
      }
    );
  }

  ngDoCheck(): void {
    if (this.imgFlag === true) {
      this.formato.value.img = this.imagen;
    }
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
        this.imgFlag = true;
        console.log(this.formato.value.img);
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

  setSexo(event) {
    event === "Masculino" ? (this.sexo = 1) : (this.sexo = 0);
  }

  toConsulta() {
    this.router.navigate(["paseadores/consulta"]);
  }

  ngOnInit() {}
}
