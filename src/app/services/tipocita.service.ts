import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; // For methods for Observables
import { Observable } from 'rxjs/Observable';
import { TipoCita } from '../models/tipocita';

import { environment } from '../../environments/environment';

@Injectable()
export class TipoCitaService {
  public searchTerm: string;
  server = environment.avaApiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getTipoCitas(): Observable<any> {    
    return this.httpClient.get(this.server + 'TipoCitas/')
      .map((response: Response)=>{
          let result = response;
          return result;
      }

      );
  }

  getTipoCita(id: number): Observable<any> {
    return this.httpClient.get(this.server + 'TipoCitas/' + id)
      
      .map((response: Response)=>{
        let result = response;
        return result;
    }
    );
  }


}


