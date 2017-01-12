import {Component, OnInit} from '@angular/core';
import {ActivatedRoute}     from '@angular/router';

import {GameService} from './game.service';
import {MessageService} from './message.service';

@Component({
  template: `
    <fieldset>
      <label for="game">Game: </label>
      <tower-defense></tower-defense>
    </fieldset>
  `
})

export class GameComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    // TODO - get game from service
  }

}
