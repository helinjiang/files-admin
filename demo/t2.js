const path = require('path');
const fileCompare = require('../src/tools/file-compare');

const dataBasePath = path.resolve(__dirname, '../test/data/fixtures/');

const result = fileCompare.compare(path.resolve(dataBasePath, './compare/a'), path.resolve(dataBasePath, './compare/b'));
console.log(result);
