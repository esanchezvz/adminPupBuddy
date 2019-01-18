import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-directorio-alta',
  templateUrl: './directorio-alta.component.html',
  styleUrls: ['./directorio-alta.component.css']
})
export class DirectorioAltaComponent implements OnInit {

  public formato;

  constructor(private serviciosService: ServiciosService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe) {

    this.formato = this.formBuilder.group({
      nombre: ['', Validators.required],
      cat: ['', Validators.required],
      dir: ['', Validators.required],
      coord: ['', Validators.required],
      tel: ['', Validators.required],
      url: ['', Validators.required],
      fb: ['', Validators.required],
      ig: ['', Validators.required],
      nombreT: ['', Validators.required],
      telT: ['', Validators.required],
      emailT: ['', Validators.required]
    })
  }

  altaDirectorio() {
    console.log(this.formato.value);
    // this.formato.value.fnacimiento = this.datePipe.transform(this.formato.value.fnacimiento, 'dd/MM/yyyy')
    // this.serviciosService.putPaseador(this.formato.value).subscribe(response => {
    //   console.log("RESPONSE->", response.message)
    // },
    //   error => { console.log(error) }
    // )
  }

  ngOnInit() {
  }

}
