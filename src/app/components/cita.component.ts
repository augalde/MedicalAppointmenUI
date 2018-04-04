import { Component } from '@angular/core';
import { Cita } from '../models/cita'
import { CitaService } from '../services/cita.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {

    public citas: Cita[];
    constructor(private citaService:CitaService, private activatedRoute: ActivatedRoute)
    {

        this.citaService.getCitas()
        .do(citas => console.log("citas",citas))
        .subscribe(citas => this.citas = citas)
    }

    ngOnInit(){
        //this.activatedRoute.paramMap.subscribe(paramMap => {let id: number = +paramMap.get('id');
        // this.pacienteService.getPacientes()
        // .do(pacientes => console.log("pacientes",pacientes))
        // .subscribe(pacientes => this.pacientes = pacientes)
    //});
    }
  
}