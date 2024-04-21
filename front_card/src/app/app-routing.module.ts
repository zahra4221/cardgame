import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';
import { AuthGuard } from './guards/auth.guard';
import { GamePageComponent } from './game-page/game-page.component';
const routes: Routes = [

    { path: 'rule-page', component: RulePageComponent },

{ 
    path:'', component:HomePageComponent
},

{ path: 'game-page', component: GamePageComponent, canActivate: [AuthGuard] },

{ path: 'inscription-form', loadChildren: () => import('./inscription-form/inscription-form.module').then(m => m.InscriptionFormModule) },
{ path: 'connexion-form', loadChildren: () => import('./connexion-form/connexion-from.module').then(m => m.ConnexionFormModule) },
{ path: 'start-game', loadChildren: () => import('./start-game/start-game.module').then(m => m.StartGameModule),  canActivate: [AuthGuard]},
]
@NgModule({
    
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}