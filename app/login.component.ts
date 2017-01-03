import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthService} from './auth.service';
import {MessageService} from './message.service';

@Component({
  template: `
    <form (ngSubmit)="login()">
      <fieldset>
        <label for="">Username:</label>
        <input [(ngModel)]="username" name="username" />
      </fieldset>
      <fieldset>
        <label for="">Password:</label>
        <input [(ngModel)]="password" name="password" />
      </fieldset>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  `
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService
      .login(this.username, this.password)
      .subscribe(
        data => {
          console.log('hre', data);
          this.router.navigate(['/game']);
        },
        error => {
          this.messageService.error(error);
          this.loading = false;
        });
  }
}
