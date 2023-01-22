import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASE_URL = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  constructor(private http: HttpClient) {
  }

  getPlayers(): Observable<any> {
    let headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    };
    return this.http.get(BASE_URL + "/api/admin/players", {headers})

  }
}
