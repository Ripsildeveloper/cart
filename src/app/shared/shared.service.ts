import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { SuperCategory } from './model/superCategory.model';
import { Footer } from './footer/footer.model';
import { Product } from './model/product.model';



@Injectable({
  providedIn: 'root'
})

export class SharedService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  serviceUrl: string = AppSetting.serviceUrl;
  mainServiceUrl: string = AppSetting.mainServiceUrl;
  constructor(private httpClient: HttpClient) { }

  getSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.mainServiceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  getFooterDetails(): Observable<any> {
    const categoryUrl = 'footerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }
  getHeaderDetails(): Observable<any> {
    const categoryUrl = 'headerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }
  /* addToCart() {
    if (this.getCookie() !== '') {
      return JSON.parse(localStorage.getItem('cart'));
    } else {

    }
  } */

  addToCart() {
    if (localStorage.getItem('login') !== 'true')      {
      let sum = 0;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.qty;
      });
      return sum;
  } else {
  }

}
  getCookie() {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${'USER_DETAILS'}=`;
    let c: string;
    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

}

