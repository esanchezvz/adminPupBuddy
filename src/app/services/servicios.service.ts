import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  headers1 = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  httpOptions: any
  ipServer = "http://74.208.165.73:9910"


  constructor(private httpClient: HttpClient) {
    this.headers1.append('Access-Control-Allow-Origin', '*')
    this.httpOptions = {
      headers: this.headers1,
      withCredentials: false
    }
  }

  getTip(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/tip", this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  putPaseador(data): Observable<any> {
    return this.httpClient.put(this.ipServer + "/paseador", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  postTip(data): Observable<any> {
    return this.httpClient.post(this.ipServer + "/tip", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }
}
