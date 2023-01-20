import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AggregateService {

  constructor(private http: HttpClient) {
  }

  getAggregateData(): Observable<any> {
    let headers = {};
    return this.http.get(BASE_URL + "/api/admin/aggregate", {headers})
  }
}
