import { NgModule } from '@angular/core';

//app-routing.module.ts
import { Routes, RouterModule } from '@angular/router';
//Guards
import { AppGuard } from './app.guard'

//Components
import { LoginComponent } from './components/login/login.component';
import { TipsComponent } from "./components/tips/tips.component";
import { PaseosComponent } from "./components/paseos/paseos.component";
import { MatchComponent } from './components/match/match.component';
import { AgendadosComponent } from './components/agendados/agendados.component';
import { RealizadosComponent } from './components/realizados/realizados.component';
import { CobrosprepComponent } from './components/cobrosprep/cobrosprep.component';


const routes: Routes = [];

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tips', component: TipsComponent, canActivate: [AppGuard] },
  { 
    path: 'paseos', 
    component: PaseosComponent, 
    canActivate: [AppGuard], 
    children: [
      {path: 'match', component: MatchComponent},
      {path: 'agendados', component: AgendadosComponent},
      {path: 'realizados', component: RealizadosComponent}
    ]},
    {path: "cobrosprep", component: CobrosprepComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'tips' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
