import { Component } from '@angular/core';
import { Cita } from '../models/cita'
import { CitaService } from '../services/cita.service'
import { Paciente } from '../models/paciente'
import { PacienteService } from '../services/paciente.service'

import { TipoCita } from '../models/tipocita';
import { TipoCitaService } from '../services/tipocita.service'

import {ActivatedRoute} from '@angular/router'
import { SESSION } from '../models/session-data'
import { Session } from '../models/session'
import { User } from '../models/user'

import { UtilityService } from '../services/utility.service'
import { Router } from '@angular/router';

@Component({
  selector: 'createcita',
  templateUrl: './createcita.component.html',
  styleUrls: ['./createcita.component.css']
})
export class CitaComponent {
    public User: User = new User;
    public session: Session = new Session;
    public cita: Cita;    
    public pacientes: Paciente[];    
    public tiposCitas: TipoCita[];

    public response: Response;
    public showAlert:boolean = false;
    
    constructor(private tipoCitaService:TipoCitaService,private pacienteService:PacienteService, private citaService:CitaService, private activatedRoute: ActivatedRoute,private Router: Router, private utilityService: UtilityService)
    {

        this.session = SESSION;
        
        //Pacientes
        this.pacienteService.getPacientes()
        .do(pacientes => console.log("pacientes",pacientes))
        .subscribe(pacientes => this.pacientes = pacientes)
        //TipoCitas
        this.tipoCitaService.getTipoCitas()
        .do(tiposCitas => console.log("tipoCitas",tiposCitas))
        .subscribe(tiposCitas => this.tiposCitas = tiposCitas)
    }

    ngOnInit() {

        this.utilityService.isLogged().then((result: boolean) => {
          if (!result) {
            this.Router.navigate(['/login']);
          }
    
        });
    }

    getPaciente(pacienteId) : string
    {
        return  this.pacientes.find(x => x.PacienteId == pacienteId).Nombre;
    }
    getTipoCita(tipocitaId) : string
    {
        return  this.tiposCitas.find(x => x.TipoCitaId == tipocitaId).Descripcion;
    }

    Salvar(){
        console.log("CreateCita");
        this.citaService.postCita(this.cita)       
        .do(response => console.log("Cita",response))
         .subscribe(response => {
         this.response = response;
        // this.paciente.birthDate = new Date(<string>person.birthDate);
        if(!this.response.ok)
        {
            this.showAlert = true;
        }
    });
  
}