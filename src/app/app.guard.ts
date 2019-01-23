
import { LoginService } from './services/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.loginService.isLoggedIn) {
      console.log('AUTORIZED')
      return true;
    } else {
      //window.alert("You don't have permission to view this page"); 
      this.router.navigate(['login']);
      console.log('NOT AUTORIZED')
      return false;
    }
  }

}
