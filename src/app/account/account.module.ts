import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import {AccountRoutingModule} from './account-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

@NgModule({
  declarations: [SigninComponent, AlertComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountService, AlertService
  ]
})
export class AccountModule { }
