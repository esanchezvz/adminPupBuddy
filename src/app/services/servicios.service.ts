import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  headers1 = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8'
  );
  httpOptions: any;
  ipServer = 'https://www.appwit-api.com:9910'; //SERVIDOR
  // ipServer = "http://192.168.15.6:9910"; //LOCAL

  constructor(private httpClient: HttpClient) {
    this.headers1.append('Access-Control-Allow-Origin', '*');
    this.httpOptions = {
      headers: this.headers1,
      withCredentials: false
    };
  }

  getTip(): Observable<any> {
    return this.httpClient.get(this.ipServer + '/tips', this.httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      })
    );
  }

  getPaseador(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + '/paseadores', this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getAgendados(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + '/agendados', this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getRealizados(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + '/realizados', this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getSolicitud(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + '/solicitudes', this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postPaseador(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/paseador', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postTip(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/tip', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postPaseoInicioFin(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/paseo', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postMatch(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/match', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postDirectorio(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/directorio', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getDirecotrio(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + '/directorios', this.httpOptions)
      .pipe(
        map((res: HttpResponse<Array<any>>) => {
          return res;
        })
      );
  }

  postMensualidad(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/usuario', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postMembresia(data): Observable<any> {
    // CREA MEMBRESIA
    return this.httpClient
      .post(this.ipServer + '/membresia', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postCargo(data): Observable<any> {
    // Genera cargo del servicio
    return this.httpClient
      .post(this.ipServer + '/cargo', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getMembresia(id): Observable<any> {
    // Trae arregle de fechas o 404
    // Si es 404 llamar postAgendarMembresia y Luego getMembresia(id)
    return this.httpClient
      .get(this.ipServer + `/membresia/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getBuddies(uid): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/buddies/${uid}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getDirecciones(uid): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/direcciones/${uid}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getTarjetas(uid): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/tarjetas/${uid}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getTarifas(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/tarifas`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postMatchMembresia(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/matchadmin', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postAgendarMembresia(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/agendar', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postEstatusPaseador(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/paseadorst', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postEstatusDirectorio(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/directoriost', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  putAltaPagoMembresia(data): Observable<any> {
    return this.httpClient
      .put(this.ipServer + '/agendar', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  putTip(data, id): Observable<any> {
    return this.httpClient
      .put(`${this.ipServer}/tip/${id}`, data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  putPaseador(data, id): Observable<any> {
    return this.httpClient
      .put(`${this.ipServer}/paseador/${id}`, data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  putDirectorio(data, id): Observable<any> {
    return this.httpClient
      .put(`${this.ipServer}/directorio/${id}`, data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getCobrosPaseos(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + '/cobrosPaseos', this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getMembresias(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/membresias`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postCobrosPaseosR(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/cobrosPaseosR', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postMembresias(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/membresias', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postRecibo(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/recibo', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getPaseos(id): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/paseos/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getPaseadorInfo(id): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/paseador/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getRecibos(): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/recibos`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getRecibosId(id): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/recibos/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  putRecibo(data): Observable<any> {
    return this.httpClient
      .put(`${this.ipServer}/recibos`, data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postPago(data): Observable<any> {
    return this.httpClient
      .post(`${this.ipServer}/pagar`, data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getHistorial(uid): Observable<any> {
    return this.httpClient
      .get(this.ipServer + `/historial/${uid}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postHistorico(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + `/historico`, data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postRealizados(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/realizados', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getDetallesPaseoAdmin(id): Observable<any> {
    return this.httpClient
      .get(`${this.ipServer}/detalleap/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getBuddyInfo(id): Observable<any> {
    return this.httpClient
      .get(`${this.ipServer}/buddie/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getDetallesSolicitudAdmin(id): Observable<any> {
    return this.httpClient
      .get(`${this.ipServer}/detalleas/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getMembresiaDetalle(id): Observable<any> {
    return this.httpClient
      .get(`${this.ipServer}/membresias/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postFechasRealizadosMembresias(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/agendadosr', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postFechasAgendados(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/agendados', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  postFechasAgendadosMembresias(data): Observable<any> {
    return this.httpClient
      .post(this.ipServer + '/agendadosm', data, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getUsuario(id): Observable<any> {
    return this.httpClient
      .get(`${this.ipServer}/usuario/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getBuddy(id): Observable<any> {
    return this.httpClient
      .get(`${this.ipServer}/buddie/${id}`, this.httpOptions)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      );
  }
}
