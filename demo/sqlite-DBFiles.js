const path = require('path');
const DBFiles = require('../src/sqlite/DBFiles');

const dbFilePath = path.resolve(__dirname, '../data/db.sqlite3');
const fileSearch = require('../src/tools/file-search');
const dataBasePath = path.resolve(__dirname, '../test/data/fixtures/');

const db = new DBFiles(dbFilePath);
// console.log(db.createTable());
// db.createTable();

// const result = fileSearch.getAllFiles(dataBasePath);
// console.log(result.length);
//
// db.add(result);

db.query((err, datas) => {
    console.log(err, datas);
});