import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Cart } from './../../shared/model/cart.model';
import { ProceduralRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productModel: Product;
  cartModel: Product;
  cart = [];
  productModel$: Observable<string>;
  catid: string;
  isConsented = false;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.productModel$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catid = params.get('catId');
        this.viewCategory();
        return this.catid;
      })
    );
    this.getProducts();

  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
  /* addToCartTest(product) {
    this.cart = new Cart();
    this.cart.user  = 'admin';
    this.cart.items = product;
    this.productService.addToCartTest(this.cart).subscribe(data => {
      this.cartModel = data;
      localStorage.setItem('cart', JSON.stringify(data));
    }, err => {
      console.log(err);
    });
  } */
  addToCartTest(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      const item = {
        id: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        productImageName: product.productImageName[0],
        price: product.price,
        subTotal: product.price * 1,
        qty: 1
      };
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));

    } else {
      const item = cart.find(ite => {
        return ite.id === product._id;
      });
      if (item) { // check if is not new item
        item.qty++;
        item.subTotal = item.price * item.qty;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const items = {
          id: product._id,
          productName: product.productName,
          productDescription: product.productDescription,
          productImageName: product.productImageName[0],
          price: product.price,
          subTotal: product.price * 1,
          qty: 1
        };
        cart.push(items);
        localStorage.setItem('cart', JSON.stringify(cart));
      }

    }

  }

  viewCategory() {
    this.productService.getViewCategory(this.catid).subscribe(data => {
      this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
}
