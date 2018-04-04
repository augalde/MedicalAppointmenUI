import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import {PacienteComponent} from './components/paciente.component';
import {CreatePacienteComponent} from './components/createpaciente.component';
import {EditPacienteComponent} from './components/editpaciente.component';
import {CitaComponent} from './components/cita.component';

const routes: Routes = [
{path: '', redirectTo: 'pacientes', pathMatch: 'full'},
{path: 'pacientes', component:PacienteComponent},
{path: 'createpaciente', component: CreatePacienteComponent}, 
{path: 'editpaciente/:id', component: EditPacienteComponent}, 
{path: 'citas', component: CitaComponent}
 
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