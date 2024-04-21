import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionFormRoutingModule } from './connexion-from-routing.module';
import {ConnexionFormComponent } from './components/connexion-form/connexion-form.component';
import { SharedModule } from '../shared/shared.module';
import { ConnexionFormService } from './services/connexion-form.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ConnexionFormComponent],
  imports: [
    CommonModule,
   ConnexionFormRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers:[
    ConnexionFormService
  ]
})
export class ConnexionFormModule { }
