import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MongoUser } from '../_models/mongouser';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-temparature',
  templateUrl: './temparature.component.html',
  styleUrls: ['./temparature.component.css']
})
export class TemparatureComponent implements OnInit {
  private userSubject: BehaviorSubject<MongoUser>;
  public user: Observable<MongoUser>;
  private notifierService: NotifierService
  temparatures : number[] = [];
  recordedDateTime : string[] = [];
  tempDetails : number[]=[];
  recordedDateTimeDetails =[];
  constructor(public appService: AppService) { 
    this.userSubject = new BehaviorSubject<MongoUser>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();  
  }

  ngOnInit(): void {
    let list1: number[] = [];
    let list2: number[] = [];
    this.appService.getTemperature(this.userSubject.value.username).subscribe(
      response => {
          response.temparature.forEach(element => {
          list1.push(element.temperatureNow);
          list2.push(element.recordedDateTime);
        });;
        this.tempDetails = list1;
        this.recordedDateTimeDetails = list2;
        this.loadData();
        console.log("this.temparatures ## ",this.temparatures);
        console.log("this.temparatures ## ",this.recordedDateTime);

        //this.notifierService.showNotification('Todays deals loaded successfully. Click on any deal!', 'OK', 'success');
      },
      error => {
        // alert('There was an error in receiving data from server. Please come again later!');
        this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
      }
    );
  }
  
  loadData() {
    this.temparatures = this.tempDetails;
    this.recordedDateTime = this.recordedDateTimeDetails;
    this.lineChartData = [{data: this.temparatures, label: 'Daily'}];
    //this.lineChartLabels = this.recordedDateTime;
  }

  
  type = 'line';
  lineChartData: ChartDataSets[] = [
    { 
      data: [],
      label: 'Daily' 
    }
  ];

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';
  
}

