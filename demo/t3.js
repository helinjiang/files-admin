const path = require('path');
const fileFilter = require('../src/tools/file-filter');

const dataBasePath = path.resolve(__dirname, '../test/data/fixtures/filter');

const result = fileFilter.filterByMd5(path.join(dataBasePath, './same-md5'));
console.log(result);

// const result = fileFilter.filterByName(path.join(dataBasePath, './same-name'));
// console.log(result);

// const result = fileFilter.filterBySize(path.join(dataBasePath, './same-size'));
// console.log(result);

// const result = fileFilter.filterByTime(path.join(dataBasePath, './same-time'));
// console.log(result);
