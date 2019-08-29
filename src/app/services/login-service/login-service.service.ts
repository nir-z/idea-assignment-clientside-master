import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }   

  login(username: string, password: string) {
    return this.httpClient.post<any>(`${environment.apiHost}/login`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            console.log("user:" + user);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //if you want to delete token go to Chrom's inspection tool -> Application -> Local storage -> under the web site delete key token
                console.log("setting local storage:" + user);
                localStorage.setItem('token', JSON.stringify(user.token));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
}

getToken() {
  return localStorage.getItem("token")
}
isLoggedIn() {
  return this.getToken() !== null;
}

}
