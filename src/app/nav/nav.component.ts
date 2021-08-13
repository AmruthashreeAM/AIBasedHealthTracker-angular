import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject,Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { AccountService } from '../_services';
import { User } from '../_models';
import { MongoUser } from '../_models/mongouser';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  private userSubject: BehaviorSubject<MongoUser>;
  username = "";
  user: MongoUser;
  isDarkTheme: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public loaderService: LoaderService,private accountService: AccountService) { 
      this.accountService.user.subscribe(x => this.user = x);
      this.userSubject = new BehaviorSubject<MongoUser>(JSON.parse(localStorage.getItem('user')));
      this.username = this.userSubject.value.username;
    }
    

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }


  logout() {
      this.accountService.logout();
  }
}
