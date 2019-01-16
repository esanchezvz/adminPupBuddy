import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  resp: any
  active = false;
  public formatoLog;

  constructor(private router: Router,
              private login: LoginService,
              public formBuilder: FormBuilder) { 

    this.formatoLog = this.formBuilder.group({
      email: ['', Validators.required],
      pss: ['', Validators.required]
    });

    if (login.isLoggedIn) {
      router.navigate(['tips'])
    } else {
      this.active = true
    }
    
  }

  ngOnInit() {
  }

  logMeIn() {

    //this.modalService.open("custom-modal-2")

    this.login.logIn(this.formatoLog.value).subscribe(
      response => {
        this.resp = response;

        this.login.sendUpdate({ login: true })

        localStorage.setItem("id", this.resp.id)
        localStorage.setItem("token", this.resp.token)

        this.router.navigate(['tips']);

      },
      error => {
        console.log(error)
        //this.modalService.close("custom-modal-2")
        //this.modalService.open("custom-modal-1")
      }
    )
  }

}
