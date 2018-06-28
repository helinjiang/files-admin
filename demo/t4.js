const path = require('path');
const fileScan = require('../src/tools/file-scan');

const dataBasePath = path.resolve(__dirname, '../test/data/fixtures/scan');

fileScan.saveJsonMd5(path.join(dataBasePath, './md5'), __dirname)
  .then((data) => {
    console.log(data);
  });

