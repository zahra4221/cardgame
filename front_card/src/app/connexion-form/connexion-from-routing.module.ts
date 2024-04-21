import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionFormComponent } from './components/connexion-form/connexion-form.component';

const routes: Routes = [
  { path: '', component: ConnexionFormComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnexionFormRoutingModule { }
