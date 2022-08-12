import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { SwPush } from '@angular/service-worker';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]> = new Observable<Product[]>();


  readonly VAPID_PUBLIC_KEY =
    'BLnVk1MBGFBW4UxL44fuoM2xxQ4o9CuxocVzKn9UVmnXZEyPCTEFjI4sALMB8qN5ee67yZ6MeQWjd5iyS8lINAg';

  constructor(
    private productsService: ProductsService,
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.products = this.productsService.loadAll();
  }

}
