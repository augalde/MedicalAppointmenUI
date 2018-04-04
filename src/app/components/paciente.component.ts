import { Component } from '@angular/core';
import { Paciente } from '../models/paciente'
import { PacienteService } from '../services/paciente.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {

    public pacientes: Paciente[];
    constructor(private pacienteService:PacienteService, private activatedRoute: ActivatedRoute)
    {

        this.pacienteService.getPacientes()
        .do(pacientes => console.log("pacientes",pacientes))
        .subscribe(pacientes => this.pacientes = pacientes)
    }

    ngOnInit(){
        //this.activatedRoute.paramMap.subscribe(paramMap => {let id: number = +paramMap.get('id');
        // this.pacienteService.getPacientes()
        // .do(pacientes => console.log("pacientes",pacientes))
        // .subscribe(pacientes => this.pacientes = pacientes)
    //});
    }
  
}
