import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';
import { AccountService } from './../account.service';
import { SignIn } from './../signin/signIn.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  signIn: SignIn;
  constructor(private alertService: AlertService, private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
    this.accountService.getData().subscribe(data => {
      this.signIn = data;
      /* console.log(this.signIn); */
    });
  }
}
