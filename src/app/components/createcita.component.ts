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
    public showFail24:boolean = false;
    public showFailday:boolean = false;

    public fechaCita:Date;
    public horaCita:any;
    
    public citas: Cita[]; 

    private localCita:Cita[];

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

        //Citas 
        this.citaService.getCitas()
        .do(citas => console.log("citas",citas))
        .subscribe(citas => this.citas = citas)

    }

    
    IsCitaFromSameUserSameDate() : boolean
    {
                
        //let localCita:Cita = this.citas.find(x => x.PacienteId == this.cita.PacienteId && ((x.Fecha.setHours(0,0,0,0)) == (this.cita.Fecha.setHours(0,0,0,0))));

        this.citas.forEach(element => {
            if(element.PacienteId == this.cita.PacienteId)
            {
                var diff = Math.abs(element.Fecha.getTime() - this.cita.Fecha.getTime());
                var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
                if(diffDays <=1)
                {
                    return true;
                }
            }

        });
        //this.localCita = this.citas.find(x => x.PacienteId == this.cita.PacienteId);

        //console.log("citaval",localCita);
        // if(localCita == undefined)
        // {
        //     return false;
        // }
        return false;
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
            // if(!this.IsCitaFromSameUserSameDate())
            // {
                    console.log("CreateCita");
                    this.citaService.postCita(this.cita)       
                    .do(response => console.log("Cita",response))
                    .subscribe(response => {
                    this.response = response;
                    // this.paciente.birthDate = new Date(<string>person.birthDate);
                    if(!this.response.ok)
                    {
                        this.showAlert = true;
                        this.showFail24 = false;
                        this.showFailday = false;
                    }
                    
                    
                });
            // }
            // else{             
            //     this.showAlert = false;
            //     this.showFail24 = false;
            //     this.showFailday = true;
            //  }
         }
         else{             
            this.showAlert = false;
            this.showFail24 = true;
            this.showFailday = false;
         }
    }
  
}