import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const LOGINURL = ""

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    let body = '{}';
    let headers = {};
    return this.http.post(LOGINURL, body, {headers})
  }
}
