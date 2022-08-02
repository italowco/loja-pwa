
import {db} from "./database";


export function readAll(req, res) {

  res.status(200).json({products:db.readAll()});

}
