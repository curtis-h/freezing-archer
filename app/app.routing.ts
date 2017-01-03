import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {GameComponent} from './game.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
 //  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'game',  component: GameComponent },
  { path: '**', redirectTo: 'login' }
];
 
export const routing = RouterModule.forRoot(routes);
