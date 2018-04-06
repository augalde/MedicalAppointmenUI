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
            .do(cita => console.log("cita ",cita))
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
        .do(pacientes => console.log("pacientes",pacientes))
        .subscribe(pacientes => this.pacientes = pacientes)
        //TipoCitas
        this.tipoCitaService.getTipoCitas()
        .do(tiposCitas => console.log("tipoCitas",tiposCitas))
        .subscribe(tiposCitas => this.tiposCitas = tiposCitas)
        

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

    Delete(){
        
         
            console.log("Delete");
            this.citaService.deleteCita(this.cita.Id)       
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
  
}