import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import { AlertComponent } from './alert/alert.component';

const routes: Routes = [{
  path: 'signin',
  component: SigninComponent
},
{
  path: 'alert',
  component: AlertComponent
},
{
  path: '', redirectTo: 'signin', pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
