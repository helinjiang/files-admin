const path = require('path');
const fileSearch= require('../src/tools/file-search');

const dataBasePath = path.resolve(__dirname, '../test/data/fixtures/');

const result = fileSearch.getAllFiles(dataBasePath);
console.log(result.length);
