import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <main>
      <message></message>
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {
  name = 'Angular';
  gameId: String = '';

  handleClick(id: String): void {
    console.log(id);
    this.gameId = id;
  }
}
