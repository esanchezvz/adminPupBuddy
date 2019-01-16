import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Output() updates = new EventEmitter();
  public baseUrl = "";
  public firstCheck = false

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  get isLoggedIn(): any {
    let token = localStorage.getItem('token');
    console.log(token)
    if (token != "" && token != null) {
      this.loggedIn.next(true);
      return this.loggedIn.asObservable(), true;

    } else {
      console.warn('Sesión no iniciada')
      this.loggedIn.next(false);
      this.logOut();
      return this.loggedIn.asObservable(), false;
    }
  }

  logIn(data): Observable<any> {
    var headers1 = new HttpHeaders()
    headers1.append('Content-Type', 'application/json');
    headers1.append('Access-Control-Allow-Origin', '*')
    const httpOptions = {
      headers: headers1,
      withCredentials: false,
    };
    // Cambiar a la del servidor
    return this.httpClient.post("http://74.208.165.73:9910/login", data, httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }


  logOut() {
    this.sendUpdate({ login: false })
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public sendUpdate(state) {
    this.updates.next(state)
    //this.updates.asObservable()
  }

}
