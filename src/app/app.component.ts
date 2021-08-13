import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { MongoUser } from './_models/mongouser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health Stats';
  user: MongoUser;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }


}
