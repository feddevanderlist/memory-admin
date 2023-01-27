import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASE_URL = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class TopFiveService {

  constructor(private http: HttpClient) {
  }

  getTopFive(): Observable<any> {
    let headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    return this.http.get(BASE_URL + "/scores", {headers})
  }
}
