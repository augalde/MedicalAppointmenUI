import { Component } from '@angular/core';
import { Paciente } from '../models/paciente'
import { PacienteService } from '../services/paciente.service'
import {ActivatedRoute} from '@angular/router'
import { SESSION } from '../models/session-data'
import { Session } from '../models/session'
import { User } from '../models/user'

import { UtilityService } from '../services/utility.service'
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    public User: User = new User;
    public session: Session = new Session;

    public pacientes: Paciente[];
    constructor(private pacienteService:PacienteService, private activatedRoute: ActivatedRoute,private Router: Router, private utilityService: UtilityService)
    {
        this.session = SESSION;

    }

    ngOnInit() {

        // this.utilityService.isLogged().then((result: boolean) => {
        //   if (!result) {
        //     this.Router.navigate(['/login']);
        //   }
    
        // });
    }
  
}