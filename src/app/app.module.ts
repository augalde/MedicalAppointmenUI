import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectRoutingModule} from './app-routing.module';
import { PacienteComponent } from './components/paciente.component';
import { CreatePacienteComponent } from './components/createpaciente.component';
import { EditPacienteComponent } from './components/editpaciente.component';
import { CitaComponent } from './components/cita.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PacienteService} from './services/paciente.service'
import {CitaService} from './services/cita.service'

@NgModule({
declarations: [
AppComponent,
PacienteComponent,
CreatePacienteComponent ,
 EditPacienteComponent ,
CitaComponent
],
imports: [
BrowserModule,
HttpClientModule,
FormsModule,
ReactiveFormsModule,
ProjectRoutingModule,
BrowserAnimationsModule,

],

providers: [PacienteService,CitaService],
bootstrap: [AppComponent]
})
export class AppModule { } 