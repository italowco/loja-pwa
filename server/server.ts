
import * as express from 'express';
import {Application} from "express";
import {readAll} from "./read-all-products.route";

const bodyParser = require('body-parser');
const cors = require('cors');



const app: Application = express();
app.use(cors());

app.use(bodyParser.json());
// REST API
app.route('/api/products').get(readAll);




// launch an HTTP Server
const httpServer = app.listen(5001, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address());
});









