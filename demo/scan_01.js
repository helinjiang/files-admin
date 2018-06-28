const path = require('path');
const fileScan = require('../src/tools/file-scan');

const sourcePath = 'E:\\超级数据中心\\不知道怎么归类';
const saveFullPath = path.join(__dirname, 'data', 'scan_01.json');

fileScan.saveJsonMd5(sourcePath, saveFullPath)
  .then((data) => {
    console.log(data);
  });
