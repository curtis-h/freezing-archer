import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class GameService {
  constructor(private http: Http) {}

  join(game: string) {
    const body = JSON.stringify({gameId: game});

    return this.http.post('/api/join', body).map((response: Response) => {
      console.log(response);
      return {
        id: 'abc'
      };
    });
  }
}
