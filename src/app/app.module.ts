import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpHeaders, HttpResponse, HttpClientModule } from '@angular/common/http';
import { AppGuard } from './app.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Service
import { LoginService } from './services/login.service';

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
import { MensualidadesComponent } from './components/mensualidades/mensualidades.component';
import { MensualidadesAltaComponent } from './components/mensualidades-alta/mensualidades-alta.component';
import { AltaTipComponent } from './components/alta-tip/alta-tip.component';
import { TipsPadreComponent } from './components/tips-padre/tips-padre.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { DirectorioAltaComponent } from './components/directorio-alta/directorio-alta.component';
import { DirectorioConsultaComponent } from './components/directorio-consulta/directorio-consulta.component';
import { DirectorioEditaComponent } from './components/directorio-edita/directorio-edita.component';
import { MensualidadesConsultaComponent } from './components/mensualidades-consulta/mensualidades-consulta.component';
import { MensualidadEdicionComponent } from './components/mensualidad-edicion/mensualidad-edicion.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PagosRealizarComponent } from './components/pagos-realizar/pagos-realizar.component';
import { PagosHistoricoComponent } from './components/pagos-historico/pagos-historico.component';
import { ModalComponent } from './directives/modal/modal.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesConsultaComponent } from './components/clientes-consulta/clientes-consulta.component';
import { DetallesCalendarioComponent } from './components/detalles-calendario/detalles-calendario.component';
import { DetallesSolicitudComponent } from './components/detalles-solicitud/detalles-solicitud.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TipsComponent,
    PaseosComponent,
    MatchComponent,
    AgendadosComponent,
    RealizadosComponent,
    CobrosprepComponent,
    PaseadoresComponent,
    PaseadoresEditarComponent,
    PaseadoresAltaComponent,
    EditarPaseadorFormComponent,
    CobrosprepCobrosComponent,
    CobrosprepRecibosComponent,
    MensualidadesComponent,
    MensualidadesAltaComponent,
    AltaTipComponent,
    TipsPadreComponent,
    DirectorioComponent,
    DirectorioAltaComponent,
    DirectorioConsultaComponent,
    DirectorioEditaComponent,
    MensualidadesConsultaComponent,
    MensualidadEdicionComponent,
    PagosComponent,
    PagosRealizarComponent,
    PagosHistoricoComponent,
    ModalComponent,
    ClientesComponent,
    ClientesConsultaComponent,
    DetallesCalendarioComponent,
    DetallesSolicitudComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  providers: [LoginService, AppGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
