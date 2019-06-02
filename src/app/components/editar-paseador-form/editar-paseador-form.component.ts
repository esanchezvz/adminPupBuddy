import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-paseador-form',
  templateUrl: './editar-paseador-form.component.html',
  styleUrls: ['./editar-paseador-form.component.css']
})
export class EditarPaseadorFormComponent implements OnInit {
  paseador: any;
  public masc: boolean;
  public fem: boolean;
  public formato;
  public imagen;
  public flag = false;

  constructor(
    private servicios: ServiciosService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.formato = this.formBuilder.group({
      nombre: ['', Validators.required],
      ap: ['', Validators.required],
      am: ['', Validators.required],
      fnacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      cel: ['', Validators.required],
      confirmCel: ['', Validators.required],
      rfc: ['', Validators.required],
      banco: ['', Validators.required],
      accesskey: ['', Validators.required],
      cuenta: ['', Validators.required],
      clabe: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.paseador = JSON.parse(localStorage.getItem('editPaseador'));
    if (this.paseador.sexo === 0) {
      this.fem = true; // Si es Femenino
      this.masc = false; // Si es Femenino
    } else {
      this.masc = true; // Si es masculino
      this.fem = false;
    }
    // this.formato = this.formBuilder.group({
    //   nombre: [this.paseador.nombre, Validators.required],
    //   ap: [this.paseador.ap, Validators.required],
    //   am: [this.paseador.am, Validators.required],
    //   fnacimiento: [this.paseador.fnacimiento, Validators.required],
    //   sexo: [this.paseador.sexo, Validators.required],
    //   email: [this.paseador.email, Validators.required],
    //   confirmEmail: [this.paseador.email, Validators.required],
    //   cel: [this.paseador.cel, Validators.required],
    //   confirmCel: [this.paseador.cel, Validators.required],
    //   rfc: [this.paseador.rfc, Validators.required],
    //   banco: [this.paseador.banco, Validators.required],
    //   accesskey: ['', Validators.required],
    //   cuenta: [this.paseador.cuenta, Validators.required],
    //   clabe: [this.paseador.clabe, Validators.required],
    //   img: [this.paseador.urlImg, Validators.required]
    // });
    console.log(this.paseador);
  }

  registrar() {
    this.formato.value.fnacimiento = moment(
      this.formato.value.fnacimiento
    ).format('DD/MM/YYYY');
    if (
      this.formato.value.email === this.formato.value.confirmEmail &&
      this.formato.value.cel === this.formato.value.confirmCel
    ) {
      this.servicios
        .putPaseador(this.formato.value, this.paseador.id_paseador)
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
    } else {
      alert(
        'Compruebe que los campos de correo y número telefónico coincidan.'
      );
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
        this.flag = true;
        this.formato.value.img = this.imagen;
      };
    } else if (this.checkImage(files[0]) === false) {
      e.target.value = null;
      alert(
        'Recuerda que la imagen solo puede ser .png y no debe exceder 1MB.'
      );
    }
  }

  checkImage(img: any) {
    if (img.size > 1000000) {
      console.log('TOO LARGE');
      return false;
    }
    if (
      img.type.toString() === 'image/jpeg' ||
      img.type.toString() === 'image/jpg'
      // img.type.toString() === "image/png" //SOLO PNG
    ) {
      return true;
    }
    return false;
  }

  toConsulta() {
    this.router.navigate(['paseadores/consulta']);
  }
}
