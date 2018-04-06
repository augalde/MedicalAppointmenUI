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
  selector: 'editcita',
  templateUrl: './editcita.component.html',
  styleUrls: ['./editcita.component.css']
})
export class EditCitaComponent {
    public User: User = new User;
    public session: Session = new Session;
    public cita: Cita;    
    public paciente: Paciente;
    public pacientes: Paciente[];    
    public tiposCitas: TipoCita[];
    public tipoCita: TipoCita;

    public response: Response;
    public showAlert:boolean = false;
    public showFailday:boolean = false;
    public strErrorMessage : string = "";
    public fechaCita:Date;
    public horaCita:any;
    public citas: Cita[];    

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
        
        //Citas 
        this.citaService.getCitas()
        .do(citas => console.log("citas",citas))
        .subscribe(citas => this.citas = citas)
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

    isValidTipoCita() : boolean
    {
        
        var x = this.tiposCitas.find(x => x.TipoCitaId == this.cita.TipoCitaId);
        if(x == undefined)
        {
            return false;
        }
        return true
    }

    Edid(){
        this.showAlert = false;
                    this.strErrorMessage =   "";
                    this.showFailday = false;
        // this.cita.PacienteId = this.paciente.PacienteId;
        // this.cita.TipoCitaId =  this.tipoCita.TipoCitaId;
        // this.cita.Fecha  =  this.fechaCita;
        if(this.isValidTipoCita())
        {
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
                        this.citaService.setCita(this.cita)       
                        .do(response => console.log("Cita",response))
                        .subscribe(response => {
                        this.response = response;
                        // this.paciente.birthDate = new Date(<string>person.birthDate);
                        if(!this.response.ok)
                        {
                            this.showAlert = true;
                            this.showFailday = false;
                        }
                        
                        
                    });
                }
                else{             
                    this.showAlert = false;
                    this.strErrorMessage =   "No se pudo actualizar la Cita del Paciente. Restriccion: Paciente tiene cita agendada mismo dia.";
                    this.showFailday = true;
                }
            }
            else{             
                this.showAlert = false;
                this.strErrorMessage ="No se pudo actualizar la Cita del Paciente. Restriccion 24 horas.";
                this.showFailday = true;
            }
        }
        else{
            this.showAlert = false;
            this.strErrorMessage =   "Por favor seleccione un Tipo Cita valido";
            this.showFailday = true;
        }
    }
  
}