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


import { CitaDTO } from '../models/citaDTO';

@Component({
  selector: 'cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {
    public User: User = new User;
    public session: Session = new Session;
    public citas: Cita[];    
    public pacientes: Paciente[];    
    public tiposCitas: TipoCita[];

    public listaPacientes : CitaDTO[];

    private  paciente  = new Paciente();
    constructor(private tipoCitaService:TipoCitaService,private pacienteService:PacienteService, private citaService:CitaService, private activatedRoute: ActivatedRoute,private Router: Router, private utilityService: UtilityService)
    {
        
        this.session = SESSION;
    }
    Initialize()
    {
        this.tiposCitas = [];
        this.pacientes = [];

        /*
        this.paciente.Nombre = "";
        this.paciente.PacienteId = 0;
        this.paciente.Edad = 0;
        this.paciente.Sexo = "";

        this.pacientes = [this.paciente];*/
        this.session = SESSION;
        
        //Pacientes
        this.pacienteService.getPacientes()
        //.do(pacientes => console.log("pacientes",pacientes))
        .subscribe((pacientes:any) => {
            this.pacientes = pacientes;
        })
        
        //TipoCitas
        this.tipoCitaService.getTipoCitas()
        .do(tiposCitas => console.log("tipoCitas",tiposCitas))
        .subscribe((tiposCitas:any) => { this.tiposCitas = tiposCitas})

        //Citas 
        this.citaService.getCitas()
        .do(citas => console.log("citas",citas))
        .subscribe((citas:any ) => {
            this.citas = citas;
        
            this.getCompletePatientList();
        })

        
    }

    loadGlobalVariables()
    {
        //Pacientes
        this.pacienteService.getPacientes()
        .do(pacientes => console.log("pacientes",pacientes))
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

    getCompletePatientList(){
        this.listaPacientes = [];
        this.citas.forEach(element => {
            let citaDTO:CitaDTO = new CitaDTO();
            citaDTO.Id = element.Id;
            //citaDTO.Fecha = element.Fecha;
            citaDTO.PacienteNombre = this.getPaciente(element.PacienteId);
            citaDTO.TipoCitaDescription= this.getTipoCita(element.TipoCitaId);
            this.listaPacientes.push(citaDTO);
        });
    }
    ngOnInit() {
  

        this.utilityService.isLogged().then((result: boolean) => {
          if (!result) {
            this.Router.navigate(['/login']);
          }
    
        });

        this.loadGlobalVariables();

    }

    getPaciente(pacienteId) : string
    {
        console.log("getPaciente "+ JSON.stringify(this.pacientes) );
        if(this.pacientes == undefined || this.pacientes.length <= 0)
        {
            return "";
        }
        let obj : any = this.pacientes.find(x => x.PacienteId == pacienteId);
        if(obj == undefined)
        {
            return "";
        }
         let stringVar : string = obj.Nombre;
         console.log(stringVar);
         console.log("::getPaciente");
        return  stringVar;
    }
    getTipoCita(TipoCitaId) : string
    {
        
        console.log("gettipoCita");
        if(this.tiposCitas == undefined || this.tiposCitas.length <= 0)
        {
            return "";
        }
        let obj : any = this.tiposCitas.find(x => x.TipoCitaId == TipoCitaId);
        if(obj == undefined)
        {
            return "";
        }
         let stringVar : string = obj.Descripcion;
         console.log(stringVar);
        return  stringVar;
    }
  
}