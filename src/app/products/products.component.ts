import {Component, OnInit} from '@angular/core';
import {ProductsService} from "./products.service";
import {Observable, of} from 'rxjs';
import {Product} from "../model/product";
import {SwPush} from "@angular/service-worker";
import {catchError} from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
  })
export class ProductsComponent implements OnInit {

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
