import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {AppComponent}  from './app.component';
import {MessageComponent} from './message.component';
import {LoginComponent} from './login.component';
import {GameComponent} from './game.component';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {GameService} from './game.service';
import {MessageService} from './message.service';

import {routing}       from './app.routing';

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
  ],
  providers:    [
    AuthGuard,
    AuthService,
    GameService,
    MessageService,
  ],
  bootstrap:    [AppComponent]
})

export class AppModule { }
