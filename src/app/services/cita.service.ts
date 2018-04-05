import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; // For methods for Observables
import { Observable } from 'rxjs/Observable';
import { Cita } from '../models/cita';

import { environment } from '../../environments/environment';

@Injectable()
export class CitaService {
  public searchTerm: string;
  server = environment.avaApiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getCitas(): Observable<any> {    
    return this.httpClient.get(this.server + 'Citas/')
      .map((response: Response)=>{
          let result = response;
          return result;
      }

      );
  }

  getCita(id: number): Observable<Cita> {
    return this.httpClient.get<CitaResponse>(this.server + 'Citas/' + id)
      .map(({cita}) => cita); // Destructuring!!!
  }

  setPaciente(cita: Cita): Observable<Cita> {
    return this.httpClient.post<CitaResponse>(this.server + 'Citas/' , cita)
      .map(({cita}) => cita); // Destructuring!!!
  }

  postCita(cita: Cita): Observable<any> {
    return this.httpClient.post(this.server + 'Citas/' , cita)
    .map((response: Response)=>{
        let result = response;
        return result;
    });
  }

}

interface CitasResponse {
  citas: Cita[];
}

interface CitaResponse {
  cita: Cita;
}
