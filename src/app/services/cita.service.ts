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

  getCita(id: number): Observable<any> {
    return this.httpClient.get(this.server + 'Citas/' + id)      
      .map((response: Response)=>{
        let result = response;
        return result;
    }
    );
  }

  setCita(cita: Cita): Observable<any> {
    return this.httpClient.put(this.server + 'Citas/' , cita)
    .map((response: Response)=>{
      let result = response;
      return result;
  }
  );
  }

  postCita(cita: Cita): Observable<any> {
    return this.httpClient.post(this.server + 'Citas/' , cita)
    .map((response: Response)=>{
        let result = response;
        return result;
    });
  }

  deleteCita(id: number): Observable<any> {
    return this.httpClient.delete(this.server + 'Citas/' + id)      
      .map((response: Response)=>{
        let result = response;
        return result;
    }
    );
  }

}

interface CitasResponse {
  citas: Cita[];
}

interface CitaResponse {
  cita: Cita;
}
