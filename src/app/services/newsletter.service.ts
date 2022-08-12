

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";




@Injectable()
export class NewsletterService {

  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;

  }

  addPushSubscriber(sub:any) {
      return this.http.post(`${this.url}/api/notifications`, sub);
  }

  send() {
      return this.http.post(`${this.url}/api/newsletter`, null);
  }

}


