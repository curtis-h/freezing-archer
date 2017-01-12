import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {User} from './user';
import {ReplaySubject} from 'rxjs/ReplaySubject'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  test = new ReplaySubject<User>(1);
  obj = {id:1, username: 'a', password: ''};

  constructor(private http: Http) {
    this.test.next(this.obj);
  }

  getTest(): ReplaySubject<User> {
    return this.test;
  }

  getTest2(): Observable<User> {
    return Observable.of(Object.assign({}, this.obj));
    // return this.test.map(u => Object.assign({}, u));
  }

  change() {
    this.obj.id++;
      this.test.next({id:9, username:'b', password:''});

  }

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
