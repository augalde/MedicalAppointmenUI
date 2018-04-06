import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; // For methods for Observables
import { Observable } from 'rxjs/Observable';
import { Paciente } from '../models/paciente';


import { environment } from '../../environments/environment';

@Injectable()
export class PacienteService {
  public searchTerm: string;
  server = environment.avaApiBaseUrl;

  result:any;
  
  constructor(private httpClient: HttpClient) { }

  getPacientes(): Observable<any> {    
    return this.httpClient.get(this.server + '/Pacientes/')
      .map((response: Response)=>{
          let result = response;
          return result;
      }

      );
  }

  getPaciente(id: number): Observable<any> {
    return this.httpClient.get(this.server + '/Pacientes/' + id)
      
      .map((response: Response)=>{
        let result = response;
        return result;
    }
    );
  }

  updatePaciente(paciente: Paciente): Observable<any> {
    return this.httpClient.put(this.server + '/Pacientes',paciente)
      
      .map((response: Response)=>{
        let result = response;
        return result;
    }
    );
  }

  postPaciente(paciente: Paciente): Observable<any> {
    return this.httpClient.post(this.server + '/Pacientes' , paciente)
    .map((response: Response)=>{
        let result = response;
        return result;
    });
  }

}

interface PacientesResponse {
  pacientes: Paciente[];
}

interface PacienteResponse {
  paciente: Paciente;
}
