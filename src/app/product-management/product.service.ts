import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { AppSetting } from '../config/appSetting';
import { Product } from '../shared/model/product.model';
import { PublicService } from '../shared/public/publicService';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serviceUrl: string;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private httpClient: HttpClient, private publicService: PublicService) {
    this.serviceUrl = publicService.getConfigType().serviceUrl;
  }

  getProducts(): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }
  addToCart(proId) {
    const categoryUrl = 'test/';
    const url: string = this.serviceUrl + categoryUrl + proId;
    return this.httpClient.get<Product>(url, {withCredentials: true});
  }
  addToCartTest(prod) {
    const categoryUrl = 'cart';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<Product>(url, prod);
  }
  reduceToCart(proId) {
    const categoryUrl = 'reduce/';
    const url: string = this.serviceUrl + categoryUrl + proId;
    return this.httpClient.get<Product>(url, {withCredentials: true});
  }
  removeToCart(proId) {
    const categoryUrl = 'remove/';
    const url: string = this.serviceUrl + categoryUrl + proId;
    return this.httpClient.get<Product>(url, {withCredentials: true});
  }
  shoppingCart() {
    const shoppingUrl = 'shopping/';
    const url: string = this.serviceUrl + shoppingUrl;
    return this.httpClient.get<Product>(url, {withCredentials: true});
  }
  getViewCategory(id): Observable<any> {
    const categoryUrl = 'categoryDetails/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.get<Product>(url);
  }
  }
