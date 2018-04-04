import { Component } from '@angular/core';
import { Paciente } from '../models/paciente'
import { PacienteService } from '../services/paciente.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'editpaciente',
  templateUrl: './editpaciente.component.html',
  styleUrls: ['./editpaciente.component.css']
})
export class EditPacienteComponent {

    public paciente: Paciente;
    public response: Response;
    public showAlert:boolean = false;

    constructor(private pacienteService:PacienteService, private activatedRoute: ActivatedRoute)
    {
        this.paciente = new Paciente();
        this.paciente.PacienteId = 0;
        this.paciente.Nombre="";
        this.paciente.Edad=1;
        this.paciente.Sexo="Masculino";
        // this.pacienteService.getPaciente()
        // .do(pacientes => console.log("pacientes",pacientes))
        // .subscribe(pacientes => this.pacientes = pacientes)
    }
    ngOnInit(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
        let id: number = +paramMap.get('id'); // (+) converts to number
        
        this.pacienteService.getPaciente(id)
        .do(paciente => console.log("Paciente",paciente))
        .subscribe(paciente => {
        this.paciente =paciente;
        // this.paciente.birthDate = new Date(<string>person.birthDate);
         });
        }); 
    }

    Salvar(){
        console.log("hola");
        this.pacienteService.updatePaciente(this.paciente)       
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