
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';


@Injectable()
export class ProductsService {

    constructor(private http: HttpClient) {

    }

    loadAll() : Observable<Product[]> {
        return this.http.get<any>('http://localhost:8005/api/products').pipe(map(res => res.payload));
    }

    findById(id:number) {
        return this.http.get<Product>('/api/products/' + id);
    }

}

