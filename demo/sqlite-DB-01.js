const path = require('path');
const DB = require('../src/sqlite/DB');

const dbFilePath = path.resolve(__dirname, '../data/db.sqlite3');

const db = new DB(dbFilePath);
// console.log(db.createTable());
// db.createTable();

// const fileSearch = require('../src/tools/file-search');
//
// const dataBasePath = path.resolve(__dirname, '../test/data/fixtures/');

// const result = fileSearch.getAllFiles(dataBasePath);
// console.log(result.length);

// db.addFileItem(result);

db.getFileItem((err, datas) => {
    console.log(err, datas);
});