import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from './game.service';
import {MessageService} from './message.service';

@Component({
  template: `
    <form (ngSubmit)="handleSubmit()">
      <fieldset>
        <label for="game">Game:</label>
        <input name="game" [(ngModel)]="game" />
      </fieldset>
      <div>
        <button type="submit" [disabled]="this.loading">Enter</button>
      </div>
    </form>
  `
})

export class JoinGameComponent implements OnInit {
  game: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private gameService: GameService
  ) {}

  ngOnInit() {

  }

  handleSubmit() {
    this.loading = true;

    this.gameService.join(this.game)
      .subscribe(data => {
        console.log('game');
        if(data && data.id) {
          this.router.navigate(['/game/', data.id]);
        }
      },
      error => {
        this.messageService.error(error);
        this.loading = false;
      });
  }
}
