import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopModel: any;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    if (localStorage.getItem('login') !== 'true')     {
       this.shopModel = JSON.parse(localStorage.getItem('cart')) || [];
    } else {
      this.shopModel = '';
    }
  }
  action(event, item) {
    switch (event) {
        case 'add':
            item.qty++;
            item.subtotal = item.price * item.qty;
            localStorage.setItem('cart', JSON.stringify(this.shopModel));
            break;
        case 'min':
            item.qty--;
            item.subtotal = item.price * item.qty;
            localStorage.setItem('cart', JSON.stringify(this.shopModel));
            if (item.qty === 0) {
              this.clearFromCart(item)
            }
            break;
        case 'clear':
            this.clearFromCart(item);
            break;
        default:
            break;
    }
}

clearFromCart(product) {
  const item = this.shopModel.find(ite => {
      return ite.id === product.id;
  });
  const index = this.shopModel.indexOf(item);
  this.shopModel.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(this.shopModel));
}
total() {
  let sum = 0;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.map(item => {
    sum += item.subtotal;
  });
  return sum;
}

  /* shoppingCart() {
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
  } */
}
