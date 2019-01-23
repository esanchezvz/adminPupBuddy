import { Component } from '@angular/core';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pupbuddy-admin';
  logged;
  update$;
  constructor(logInService: LoginService) {
    this.logged = logInService.isLoggedIn
    this.update$ = logInService.updates.subscribe({
      next: (response: any) => {
        if (response.login) {

          location.reload(true)

        }
        else {

          this.logged = response.login
        }
      }
    })
  }

}
