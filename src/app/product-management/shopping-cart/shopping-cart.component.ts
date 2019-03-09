import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopModel: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.shoppingCart();
  }
  shoppingCart() {
    this.productService.shoppingCart().subscribe(data => {
      this.shopModel = data;
      console.log(this.shopModel);
    }, err => {
      console.log(err);
    });
  }
  plusCart(proId) {
    this.productService.addToCart(proId).subscribe(data => {
      this.shopModel = data;
      localStorage.setItem('cart', JSON.stringify(data));
    }, err => {
      console.log(err);
    });
  }
  reduceCart(proId) {
    this.productService.reduceToCart(proId).subscribe(data => {
      this.shopModel = data;
      localStorage.setItem('cart', JSON.stringify(data));
    }, err => {
      console.log(err);
    });
  }
  removeCart(proId) {
    this.productService.reduceToCart(proId).subscribe(data => {
      this.shopModel = data;
      localStorage.setItem('cart', JSON.stringify(data));
    }, err => {
      console.log(err);
    });
  }
}
