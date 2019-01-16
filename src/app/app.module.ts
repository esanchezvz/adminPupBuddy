import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpHeaders, HttpResponse, HttpClientModule } from '@angular/common/http';
import { AppGuard } from './app.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modal
import { ModalComponent } from './directives/modal/modal.component';
import { ModalService } from './directives/modal.service';

//Service
import { LoginService } from './services/login.service';

//Components
import { LoginComponent } from './components/login/login.component';
import { TipsComponent } from './components/tips/tips.component';
import { PaseosComponent } from './components/paseos/paseos.component';
import { MatchComponent } from './components/match/match.component';
import { AgendadosComponent } from './components/agendados/agendados.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TipsComponent,
    PaseosComponent,
    MatchComponent,
    AgendadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService, AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
