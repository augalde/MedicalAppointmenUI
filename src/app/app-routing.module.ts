import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import {PacienteComponent} from './components/paciente.component';
import {CreatePacienteComponent} from './components/createpaciente.component';
import {EditPacienteComponent} from './components/editpaciente.component';
import {CitaComponent} from './components/cita.component';
import {CreateCitaComponent} from './components/createcita.component';

const routes: Routes = [
{path: '', redirectTo: 'login', pathMatch: 'full'},
{path: 'login', component:LoginComponent},
{path: 'pacientes', component:PacienteComponent},
{path: 'createpaciente', component: CreatePacienteComponent}, 
{path: 'editpaciente/:id', component: EditPacienteComponent}, 
{path: 'citas', component: CitaComponent},
{path: 'createcita', component: CreateCitaComponent}
 
// {path: 'show/:id', component: ShowComponent},
// {path: 'edit/:id', component: EditComponent}
];

//export const ProjectRoutingModule = RouterModule.forRoot(routes); 

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule],
    providers: []
    })
    export class ProjectRoutingModule { } 