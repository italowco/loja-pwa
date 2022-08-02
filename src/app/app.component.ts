import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs/internal/Observable';
import { PRODUCTS } from 'src/db-data';
import { Product } from './model/product';
import { ProductsService } from './products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loja-pwa';


  products: Observable<Product[]> = new Observable<Product[]>();



  constructor(
      private productsService: ProductsService) {

  }

  ngOnInit() {
      this.loadLessons();
  }


  loadLessons() {
      this.products = this.productsService.loadAll();
  }

}
