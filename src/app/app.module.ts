import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {NavbarComponent} from './components/navbar.component';

import { ProjectRoutingModule} from './app-routing.module';
import { LoginComponent } from './components/login.component';
import { PacienteComponent } from './components/paciente.component';
import { CreatePacienteComponent } from './components/createpaciente.component';
import { EditPacienteComponent } from './components/editpaciente.component';
import { CitaComponent } from './components/cita.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PacienteService} from './services/paciente.service'
import {CitaService} from './services/cita.service'
import {TipoCitaService} from './services/tipocita.service'
import {LoginService} from './services/login.service'
import {UtilityService} from './services/utility.service'

@NgModule({
declarations: [
AppComponent,
NavbarComponent,
LoginComponent,
PacienteComponent,
CreatePacienteComponent ,
 EditPacienteComponent ,
CitaComponent
],
imports: [
BrowserModule,
HttpModule,
HttpClientModule,
FormsModule,
ReactiveFormsModule,
ProjectRoutingModule,
BrowserAnimationsModule,

],

providers: [PacienteService,CitaService,TipoCitaService,LoginService,UtilityService],
bootstrap: [AppComponent]
})
export class AppModule { } 