import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  getDeals(username): Observable<any> {
    return this.httpClient.get('http://localhost:3000/temperature/'+username);
  }

  updateTemperature(username,temparature): any { 
   // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post('http://localhost:3000/temperature/' + username + '/updateTemperature/',temparature);
  }

  generateRecords(username): Observable<any> { 
    return this.httpClient.get('http://127.0.0.1:5000/generateRecords');
  }

  generateIndentifiedPateints(username): Observable<any> { 
    return this.httpClient.get('http://127.0.0.1:5000/facialRecognition');
  }
}
