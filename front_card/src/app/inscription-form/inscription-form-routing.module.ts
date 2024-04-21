import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';

const routes: Routes = [
  { path: '', component: InscriptionFormComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionFormRoutingModule { }
