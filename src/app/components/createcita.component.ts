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
    public strMessage : string = "";

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
        let citaDate: Date = new Date(this.cita.Fecha)
        let specificDay = citaDate.getDate();
        let month = citaDate.getMonth();
        let year = citaDate.getFullYear();
        console.log(specificDay);

        let localCita:Cita[] = this.citas.filter(x => x.PacienteId == this.cita.PacienteId && new Date(x.Fecha).getDate() == specificDay && new Date(x.Fecha).getMonth() == month && new Date(x.Fecha).getFullYear() == year && x.Id != this.cita.Id) ;

        if(localCita && localCita.length > 0)
        {
            return true;
        }
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
        this.showAlert = false;
                        this.showFailday = false;

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
            if(!this.IsCitaFromSameUserSameDate())
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
                        this.showFailday = false;
                    }
                    else{
                        this.strMessage = this.response.toString();
                        this.showAlert = false;
                        this.showFailday = true;
                    }
                    
                    
                });
           }
            else{             
                this.showAlert = false;
                this.showFailday = true;
                this.strMessage = "No se pudo Crear la Cita del Paciente. Restriccion: Paciente tiene cita agendada mismo dia."
             }
         }
         else{             
            this.showAlert = false;
            this.strMessage = "No se pudo Crear la Cita del Paciente. Restriccion 24 horas.";
            this.showFailday = true;
         }
    }
  
}