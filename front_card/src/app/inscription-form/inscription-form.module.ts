import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionFormRoutingModule } from './inscription-form-routing.module';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { SharedModule } from '../shared/shared.module';
import { InscriptionFormService } from './services/inscription-form.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [InscriptionFormComponent],
  imports: [
    CommonModule,
    InscriptionFormRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers:[
    InscriptionFormService
  ]
})
export class InscriptionFormModule { }
