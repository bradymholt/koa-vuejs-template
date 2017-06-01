import * as pgtools from 'pgtools';
import * as massive from 'massive';
import * as bluebird from 'bluebird';

let config = require('../config.json');
let connectionString = config.connectionString;
let databaseName = connectionString.split("/").pop();
    
pgtools.createdb(config.connectionString, databaseName, function (err, res) {
    if (err) {
        if (err.name != "duplicate_database") {
            console.error(`Error when attempting to create database '${databaseName}': ${err}`);
            process.exit(-1);
        }
    }
});

const db = massive.connectSync({ connectionString: config.connectionString });
// Create a new table
db.createDocumentTable('contacts', function (err, res) {
    console.log(res);
});

bluebird.promisifyAll(db.contacts);

export default db;
