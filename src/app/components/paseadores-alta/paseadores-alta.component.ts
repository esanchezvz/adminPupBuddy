import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-paseadores-alta',
  templateUrl: './paseadores-alta.component.html',
  styleUrls: ['./paseadores-alta.component.css']
})
export class PaseadoresAltaComponent implements OnInit {
  public formato;
  public sexo: Number;

  constructor(private serviciosService: ServiciosService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe) {

    this.formato = this.formBuilder.group({
      nombre: ['', Validators.required],
      ap: ['', Validators.required],
      am: ['', Validators.required],
      fnacimiento: ['', Validators.required],
      sexo: [1],
      email: ['', Validators.required],
      cel: ['', Validators.required],
      rfc: ['', Validators.required],
      banco: ['', Validators.required],
      cuenta: ['', Validators.required],
      clabe: ['', Validators.required]
    })
  }

  altaPaseador() {
    this.formato.value.fnacimiento = this.datePipe.transform(this.formato.value.fnacimiento, 'dd/MM/yyyy')
    this.serviciosService.putPaseador(this.formato.value).subscribe(response => {
      alert(`${response.message} \n Paseador agragado exitosamente`)
      this.formato.reset()
    },
      error => { alert(`${error}\n Intente de Nuevo.`) }
    )
  }

  setSexo(event) {
    event === 'Masculino' ? this.sexo = 1 : this.sexo = 0;
  }

  ngOnInit() {
  }

}
