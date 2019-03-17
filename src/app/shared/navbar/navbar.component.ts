import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { Header } from './../navbar/header.model';
import { Product } from './../model/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean;
  header: Header[];
  logoImage: string;
  product: Product;
  constructor(public sharedService: SharedService) {
   }

  ngOnInit() {
    this.allHeader();
    console.log(this.sharedService.getCookie());
  }

  allHeader() {
    this.sharedService.getHeaderDetails().subscribe(data => {
      this.header = data;
      this.header.map(elememt =>        {
          this.logoImage = elememt.logoImageName;
        }
      );
    }, error => {
      console.log(error);
    });
  }
}
