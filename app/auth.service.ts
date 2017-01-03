import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(username: string, password: string) {
    const body = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post('/api/login', body).map((response: Response) => {
        console.log(response);
        return {};
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}
