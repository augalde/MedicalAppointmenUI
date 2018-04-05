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
export class CreateCitaComponent {
    public User: User = new User;
    public session: Session = new Session;
    public cita: Cita;    
    public paciente: Paciente;
    public pacientes: Paciente[];    
    public tiposCitas: TipoCita[];
    public tipoCita: TipoCita;

    public response: Response;
    public showAlert:boolean = false;
    
    public showFail:boolean = false;

    public fechaCita:Date;
    public horaCita:any;

    constructor(private tipoCitaService:TipoCitaService,private pacienteService:PacienteService, private citaService:CitaService, private activatedRoute: ActivatedRoute,private Router: Router, private utilityService: UtilityService)
    {

        this.fechaCita=new Date();

        this.session = SESSION;
        this.cita = new Cita();
        this.cita.PacienteId = -1;
        this.cita.Id = -1;
        this.cita.Fecha = new Date();
        this.cita.TipoCitaId = -1;
        this.fechaCita;
        this.tiposCitas = [];  
        
    }

    ngOnInit() {

        this.utilityService.isLogged().then((result: boolean) => {
          if (!result) {
            this.Router.navigate(['/login']);
          }
    
        });
        this.loadGlobalVariables();
        console.log("tipocit2",this.tiposCitas);
    }

    loadGlobalVariables()
    {
        //Pacientes
        this.pacienteService.getPacientes()
        .do(pacientes => console.log("pacientes",this.pacientes))
        .subscribe(pacientes => this.pacientes = pacientes)
        //TipoCitas
        this.tipoCitaService.getTipoCitas()
        .do(tiposCitas => console.log("tipoCitas",tiposCitas))
        .subscribe(tiposCitas => this.tiposCitas = tiposCitas)

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
        this.cita.PacienteId = this.paciente.PacienteId;
        this.cita.TipoCitaId =  this.tipoCita.TipoCitaId;
        this.cita.Fecha  =  this.fechaCita;

        let nowVar = new Date();
        
         let date1: string = nowVar.toString();//params.data.incidentTime;
        let date2: string = this.cita.Fecha.toString();

        let diffInMs: number = Date.parse(date2) - Date.parse(date1);
        let diffInHours: number = diffInMs / 1000 / 60 / 60;

        // validating restriccion 24hours
         if(diffInHours > 24)
         {
            console.log("CreateCita");
            this.citaService.postCita(this.cita)       
            .do(response => console.log("Cita",response))
            .subscribe(response => {
            this.response = response;
            // this.paciente.birthDate = new Date(<string>person.birthDate);
            if(!this.response.ok)
            {
                this.showAlert = true;
                this.showFail = false;
            }
            
        });
         }
         else{             
            this.showAlert = false;
            this.showFail = true;
         }
    }
  
}