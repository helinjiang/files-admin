const path = require('path');
const fileScan = require('../src/json/scan');

const sourcePath = 'D:\\微云同步助手\\329111361\\相册';
const saveFullPath = path.join(__dirname, '../data', 'scan_data.json');

fileScan.saveJsonMd5(sourcePath, saveFullPath)
    .then((data) => {
        console.log(data);
    });
