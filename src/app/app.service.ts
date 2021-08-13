import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  getDeals(username): Observable<any> {
    return this.httpClient.get('https://healthcare-server123.herokuapp.com/temperature/'+username);
  }

  updateTemperature(username,temparature): any { 
   // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post('https://healthcare-server123.herokuapp.com/temperature/' + username + '/updateTemperature/',temparature);
  }

  generateRecords(username): Observable<any> { 
    return this.httpClient.get('https://healthcare-server123.herokuapp.com/generateRecords');
  }

  generateIndentifiedPateints(username): Observable<any> { 
    return this.httpClient.get('https://healthcare-server123.herokuapp.com/facialRecognition');
  }
}
