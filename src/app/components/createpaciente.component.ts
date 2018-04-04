import { Component } from '@angular/core';
import { Paciente } from '../models/paciente'
import { PacienteService } from '../services/paciente.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'createpaciente',
  templateUrl: './createpaciente.component.html',
  styleUrls: ['./createpaciente.component.css']
})
export class CreatePacienteComponent {

    public paciente: Paciente;
    public response: Response;
    public showAlert:boolean = false;

    constructor(private pacienteService:PacienteService, private activatedRoute: ActivatedRoute)
    {
        this.paciente = new Paciente();
        this.paciente.PacienteId = 0;
        this.paciente.Nombre="";
        this.paciente.Edad=1;
        this.paciente.Sexo="Femenino";
        // this.pacienteService.getPaciente()
        // .do(pacientes => console.log("pacientes",pacientes))
        // .subscribe(pacientes => this.pacientes = pacientes)
    }
    ngOnInit(){
    //this.activatedRoute.paramMap.subscribe(paramMap => {
        // let id: number = +paramMap.get('id'); // (+) converts to number
        
        // this.pacienteService.getPaciente(id)
        // .do(paciente => console.log("Paciente",paciente))
        // .subscribe(paciente => {
        // this.paciente =paciente;
        // // this.paciente.birthDate = new Date(<string>person.birthDate);
        //  });
        // }); 
    }

    Salvar(){
        console.log("Create");
        this.pacienteService.postPaciente(this.paciente)       
        .do(response => console.log("Paciente",response))
         .subscribe(response => {
         this.response = response;
        // this.paciente.birthDate = new Date(<string>person.birthDate);
        if(!this.response.ok)
        {
            this.showAlert = true;
        }
    }   );
        ; 

        
    }
}