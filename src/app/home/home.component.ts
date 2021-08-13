import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';
import { MongoUser } from '../_models/mongouser';
import { AccountService } from '../_services';
import { Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  private userSubject: BehaviorSubject<MongoUser>;
  public user: Observable<MongoUser>;
  private accountService: AccountService;
  cards= [];
  cardsForHandset = [];
  ids = [];
  recognizedIDs = [];

  

  constructor(private breakpointObserver: BreakpointObserver,
    public appService: AppService,
    private notifierService: NotifierService) {
      this.userSubject = new BehaviorSubject<MongoUser>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable()
     }

  ngOnInit() {
    
      this.loadData();
      this.facialRecognize();
      this.getTempResults();
  
  }

  getTempResults()
  {
    console.log("print user ## ",this.userSubject.value.username);
    this.appService.getDeals(this.userSubject.value.username).subscribe(
      response => {
        this.cardsForHandset = response.temparature;
        console.log(response.temparature);
        this.loadData();
        //this.notifierService.showNotification('Todays deals loaded successfully. Click on any deal!', 'OK', 'success');
      },
      error => {
        // alert('There was an error in receiving data from server. Please come again later!');
        this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
      }
    );
  }
  async refreshTemperature(){
    console.log("inside refresh temp");
    let latestTemp = null;
     await this.appService.generateRecords(this.userSubject.value.username).toPromise()
     .then(res => 
     // latestTemp = JSON.stringify(res))
     latestTemp = res)
     .catch(msg => console.log('Error: ' + msg.status + ' ' + msg.statusText));
     console.log("latestTemp : "+latestTemp);
    this.appService.updateTemperature(this.userSubject.value.username,latestTemp).subscribe(
      response => {
        console.log(response.result);
        this.getTempResults();
      },

      error => {
        this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
      }
    );
    
  }

  async facialRecognize()
  {
    console.log("print user ## ",this.userSubject.value.username);
    this.appService.generateIndentifiedPateints(this.userSubject.value.username).subscribe(
      response => {
        this.recognizedIDs = response.id;
        console.log(response.id);
        this.loadData();
        //this.notifierService.showNotification('Todays deals loaded successfully. Click on any deal!', 'OK', 'success');
      },
      error => {
        // alert('There was an error in receiving data from server. Please come again later!');
        this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
      }
    );
  }



  loadData() {
    this.cards =this.cardsForHandset;
    this.ids = this.recognizedIDs;
    console.log(this.cards);
  }

  public webcamImage: WebcamImage = null;
handleImage(webcamImage: WebcamImage) {
this.webcamImage = webcamImage;
}

}

