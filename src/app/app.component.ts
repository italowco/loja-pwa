import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs/internal/Observable';
import { PRODUCTS } from 'src/db-data';
import { Product } from './model/product';
import { ProductsService } from './products/products.service';
import { NewsletterService } from './services/newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'loja-pwa';

  products: Observable<Product[]> = new Observable<Product[]>();

  sub!: PushSubscription;

  readonly VAPID_PUBLIC_KEY =
    'BCNs_3XGu8P0UZsrHTJyKL14PEf_qtGEx2sXE5tCEs1GOMR3qgdaTZXAFSee6FRvVYAVCyCAX-Hi9f2GGC2MXQY';

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit() {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log(sub);
        this.sub = sub;

        console.log('Notification Subscription: ', sub);

        this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          (err) =>
            console.log(
              'Could not send subscription object to server, reason: ',
              err
            )
        );
      })
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }

  sendNewsletter() {
    console.log('Sending Newsletter to all Subscribers ...');

    this.newsletterService.send().subscribe();
  }
}
