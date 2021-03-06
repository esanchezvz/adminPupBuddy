//app-routing.module.ts
import { Routes, RouterModule } from '@angular/router';
//Guards
import { AppGuard } from './app.guard';

//Components
import { LoginComponent } from './components/login/login.component';
import { TipsComponent } from './components/tips/tips.component';
import { PaseosComponent } from './components/paseos/paseos.component';
import { MatchComponent } from './components/match/match.component';
import { AgendadosComponent } from './components/paseos-agendados/agendados.component';
import { RealizadosComponent } from './components/paseos-realizados/realizados.component';
import { CobrosprepComponent } from './components/cobrosprep/cobrosprep.component';
import { PaseadoresComponent } from './components/paseadores/paseadores.component';
import { PaseadoresEditarComponent } from './components/paseadores-editar/paseadores-editar.component';
import { PaseadoresAltaComponent } from './components/paseadores-alta/paseadores-alta.component';
import { EditarPaseadorFormComponent } from './components/editar-paseador-form/editar-paseador-form.component';
import { CobrosprepCobrosComponent } from './components/cobrosprep-cobros/cobrosprep-cobros.component';
import { CobrosprepRecibosComponent } from './components/cobrosprep-recibos/cobrosprep-recibos.component';
import { TipsPadreComponent } from './components/tips-padre/tips-padre.component';
import { AltaTipComponent } from './components/alta-tip/alta-tip.component';
import { DirectorioAltaComponent } from './components/directorio-alta/directorio-alta.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { DirectorioConsultaComponent } from './components/directorio-consulta/directorio-consulta.component';
import { DirectorioEditaComponent } from './components/directorio-edita/directorio-edita.component';
import { MensualidadesComponent } from './components/mensualidades/mensualidades.component';
import { MensualidadesAltaComponent } from './components/mensualidades-alta/mensualidades-alta.component';
import { MensualidadesConsultaComponent } from './components/mensualidades-consulta/mensualidades-consulta.component';
import { MensualidadEdicionComponent } from './components/mensualidad-edicion/mensualidad-edicion.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PagosRealizarComponent } from './components/pagos-realizar/pagos-realizar.component';
import { PagosHistoricoComponent } from './components/pagos-historico/pagos-historico.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesConsultaComponent } from './components/clientes-consulta/clientes-consulta.component';
import { DetallesCalendarioComponent } from './components/detalles-calendario/detalles-calendario.component';
import { DetallesSolicitudComponent } from './components/detalles-solicitud/detalles-solicitud.component';

const APP_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tips',
    component: TipsPadreComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'alta', component: AltaTipComponent },
      { path: 'consulta', component: TipsComponent }
    ]
  },
  {
    path: 'paseos',
    component: PaseosComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'match', component: MatchComponent },
      { path: 'agendados', component: AgendadosComponent },
      { path: 'realizados', component: RealizadosComponent },
      { path: 'detalles', component: DetallesCalendarioComponent },
      { path: 'solicitud', component: DetallesSolicitudComponent }
    ]
  },
  {
    path: 'paseadores',
    component: PaseadoresComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'consulta', component: PaseadoresEditarComponent },
      { path: 'editar/:id', component: EditarPaseadorFormComponent },
      { path: 'alta', component: PaseadoresAltaComponent }
    ]
  },
  {
    path: 'cobrosprep',
    component: CobrosprepComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'cobros', component: CobrosprepCobrosComponent },
      { path: 'recibos', component: CobrosprepRecibosComponent }
    ]
  },
  {
    path: 'directorio',
    component: DirectorioComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'alta', component: DirectorioAltaComponent },
      { path: 'editar/:id', component: DirectorioEditaComponent },
      { path: 'consulta', component: DirectorioConsultaComponent }
    ]
  },
  {
    path: 'mensualidades',
    component: MensualidadesComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'alta', component: MensualidadesAltaComponent },
      { path: 'consulta', component: MensualidadesConsultaComponent },
      { path: 'editar/:id', component: MensualidadEdicionComponent }
    ]
  },
  {
    path: 'pagos',
    component: PagosComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'realizar', component: PagosRealizarComponent },
      { path: 'historico', component: PagosHistoricoComponent }
    ]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AppGuard],
    children: [{ path: 'consulta', component: ClientesConsultaComponent }]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'tips/consulta'
  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
