import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable,  } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productModel: Product;
  cartModel: Product;
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
  addToCart(proId) {
    this.productService.addToCart(proId).subscribe(data => {
      this.cartModel = data;
      localStorage.setItem('cart', JSON.stringify(data));
    }, err => {
      console.log(err);
    });
  }


  viewCategory() {
    this.productService.getViewCategory(this.catid).subscribe(data => {
      this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
}
