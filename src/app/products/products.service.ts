
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import { environment } from "src/environments/environment";


@Injectable()
export class ProductsService {

    url = '';

    constructor(private http: HttpClient) {
      this.url = environment.apiUrl;
    }

    loadAll() : Observable<Product[]> {
        return this.http.get<any>(`${this.url}/api/products`).pipe(map(res => {
          return res.products;
        } ));
    }

    findById(id:number) {
        return this.http.get<Product>(`${this.url}/api/products/` + id);
    }

}

