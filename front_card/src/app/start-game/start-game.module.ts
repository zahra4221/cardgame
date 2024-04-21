import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartGameRoutingModule } from './start-game-routing.module';
import {StartGameComponent } from './components/start-game/start-game.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StartGameComponent],
  imports: [
    CommonModule,
    StartGameRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[
  ]
})
export class StartGameModule { }