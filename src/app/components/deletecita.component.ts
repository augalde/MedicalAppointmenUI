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
  selector: 'deletecita',
  templateUrl: './deletecita.component.html',
  styleUrls: ['./deletecita.component.css']
})
export class DeleteCitaComponent {
    public User: User = new User;
    public session: Session = new Session;
    public cita: Cita;    
    public paciente: Paciente;
    public pacientes: Paciente[];    
    public tiposCitas: TipoCita[];
    public tipoCita: TipoCita;

    public response: Response;
    public showAlert:boolean = false;

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

        this.activatedRoute.paramMap.subscribe(paramMap => {
            let id: number = +paramMap.get('id'); // (+) converts to number
            
            this.citaService.getCita(id)
            .do(cita => console.log("Paciente",cita))
            .subscribe(cita => {
            this.cita =cita;
            // this.paciente.birthDate = new Date(<string>person.birthDate);
             });
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
         if(this.fechaCita)
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
            }
            
        });
         }
         else{
             
         }
    }
  
}