import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MongoUser } from '../_models/mongouser';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css']
})
export class PillComponent implements OnInit {
  private userSubject: BehaviorSubject<MongoUser>;
  public user: Observable<MongoUser>;
  private notifierService: NotifierService
  data = [];
  pillDetails = [];
  constructor(public appService: AppService) {
    this.userSubject = new BehaviorSubject<MongoUser>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();  
   }

   ngOnInit(): void {
    let list1: number[] = [];
    this.appService.getPill(this.userSubject.value.username).subscribe(
      response => {
          response.pill.forEach(element => {
          list1.push(element);
        });;
        this.data = list1;
        this.loadData();
        console.log("pill ## ",this.pillDetails);
        //this.notifierService.showNotification('Todays deals loaded successfully. Click on any deal!', 'OK', 'success');
      },
      error => {
        // alert('There was an error in receiving data from server. Please come again later!');
        this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
      }
    );
  }

  loadData() {
    this.pillDetails = this.data;
  }
}
