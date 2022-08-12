import * as express from 'express';
import { Application } from 'express';
import { readAll } from './read-all-products.route';
import { addPushSubscriber } from './add-push-subscriber.route';
import { sendNewsletter } from './send-newsletter.route';

const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');

const vapidKeys = {
  publicKey:
    'BCNs_3XGu8P0UZsrHTJyKL14PEf_qtGEx2sXE5tCEs1GOMR3qgdaTZXAFSee6FRvVYAVCyCAX-Hi9f2GGC2MXQY',
  privateKey: '3GjE4r2HMyhtNLHSeQ2X9cwYxShVHHYNEAp7hQSx2lE',
};

webpush.setVapidDetails(
  'mailto:example@teste.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app: Application = express();
app.use(cors());

app.use(bodyParser.json());
// REST API
app.route('/api/products').get(readAll);

app.route('/api/notifications').post(addPushSubscriber);

app.route('/api/newsletter').post(sendNewsletter);

// launch an HTTP Server
const httpServer = app.listen(5001, () => {
  console.log('HTTP Server running at http://localhost:5001');
});
