const path = require('path');
const DB = require('../src/sqlite/DB');

const dbFilePath = path.resolve(__dirname, '../data/db.sqlite3');

const db = new DB(dbFilePath);
console.log(db.createTable());
