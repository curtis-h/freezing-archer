import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AppComponent}  from './app.component';
import {MessageComponent} from './message.component';
import {LoginComponent} from './login.component';
import {GameComponent} from './game.component';
import {JoinGameComponent} from './join.component';
import {TowerDefenseComponent} from './tower-defense.component';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {GameService} from './game.service';
import {MessageService} from './message.service';

import {routing}       from './app.routing';
import { WindowRef, DocumentRef } from './tower-defense.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    GameComponent,
    JoinGameComponent,
    TowerDefenseComponent,
  ],
  providers:    [
    AuthGuard,
    AuthService,
    GameService,
    MessageService,
    WindowRef,
    DocumentRef
  ],
  bootstrap:    [AppComponent]
})

export class AppModule { }
