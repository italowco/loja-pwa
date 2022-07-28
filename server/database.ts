
import * as _ from 'lodash';
import {PRODUCTS} from "./database-data";


class InMemoryDatabase {

    readAll() {
        return _.values(PRODUCTS);
    }

}




export const db = new InMemoryDatabase();


