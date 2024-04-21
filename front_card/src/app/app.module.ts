import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component'
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'
import { HomePageComponent } from './home-page/home-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SharedModule } from './shared/shared.module';
import { StartGameComponent } from '../app/start-game/components/start-game/start-game.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        RulePageComponent,

      
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR'
        },
        provideAnimationsAsync(),
        AuthGuard
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        SharedModule,    
         HttpClientModule

    ]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}