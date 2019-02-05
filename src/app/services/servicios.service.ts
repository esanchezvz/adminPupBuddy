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
  ipServer = "http://74.208.165.73:9910" //SERVIDOR
  // ipServer = "http://192.168.1.88:9910" //LOCAL


  constructor(private httpClient: HttpClient) {
    this.headers1.append('Access-Control-Allow-Origin', '*')
    this.httpOptions = {
      headers: this.headers1,
      withCredentials: false
    }
  }

  getTip(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/tips", this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getPaseador(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/paseador", this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getAgendados(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/agendados", this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getRealizados(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/realizados", this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }
  
  getSolicitud(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/solicitudes", this.httpOptions).pipe(
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

  postPaseoInicioFin(data): Observable<any> {
    return this.httpClient.post(this.ipServer + "/paseo", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  postMatch(data): Observable<any> {
    return this.httpClient.post(this.ipServer + "/match", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  postDirectorio(data): Observable<any> {
    return this.httpClient.post(this.ipServer + "/directorio", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getDirecotrio(): Observable<any> {
    return this.httpClient.get(this.ipServer + "/directorios", this.httpOptions).pipe(
      map((res: HttpResponse<Array<any>>) => {
        return res
      })
    )
  }

  postMensualidad(data): Observable<any> {
    return this.httpClient.post(this.ipServer + "/usuario", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  postMembresia(data): Observable<any> {
    return this.httpClient.post(this.ipServer + "/membresia", data, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getBuddies(uid): Observable<any> {
    return this.httpClient.get(this.ipServer + `/buddies/${uid}`, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getDirecciones(uid): Observable<any> {
    return this.httpClient.get(this.ipServer + `/direcciones/${uid}`, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getMembresias(): Observable<any> {
    return this.httpClient.get(this.ipServer + `/membresias`, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getTarjetas(uid): Observable<any> {
    return this.httpClient.get(this.ipServer + `/tarjetas/${uid}`, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }

  getTarifas(): Observable<any> {
    return this.httpClient.get(this.ipServer + `/tarifas`, this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res
      })
    )
  }
}
