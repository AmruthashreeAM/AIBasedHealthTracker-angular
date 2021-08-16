import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }

  getTemperature(username): Observable<any> {
    return this.httpClient.get('https://healthcare-server123.herokuapp.com/temperature/'+username);
  }

  getPill(username): Observable<any> {
    return this.httpClient.get('https://healthcare-server123.herokuapp.com/pill/'+username);
  }

  updateTemperature(username,temparature): any { 
   // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post('https://healthcare-server123.herokuapp.com/temperature/' + username + '/updateTemperature/',temparature);
  }

  updatePillData(username,pillTaken): any { 
    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
 
     return this.httpClient.post('https://healthcare-server123.herokuapp.com/pill/' + username + '/updatePill/',pillTaken);
   }  

  generateRecords(username): Observable<any> { 
    return this.httpClient.get('http://localhost:5000/generateRecords');
  }
  generatePillData(username): Observable<any> { 
    return this.httpClient.get('http://localhost:5002/generatePillData');
  }
  generateIndentifiedPateints(username): Observable<any> { 
    return this.httpClient.get('http://localhost:5001/facialRecognition');
  }
}
