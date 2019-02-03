const path = require('path')
const data = require('../tmp/scan_data');

// console.log(Object.keys(data))
// console.log(Object.keys(data.map))
// console.log(data.multiArr)

console.log(data.basePath)
data.multiArr.forEach((md5) => {
    console.log('\n-----------------------------')
    // console.log(data.map[md5])
    let list = [];
    data.map[md5].forEach((fileItem) => {
        // console.log(fileItem.mtime, fileItem.relativePath)
        let fullPath = path.join(data.basePath, fileItem.relativePath)
        console.log(fullPath)

        if (list.indexOf(fileItem.mtime) < 0) {
            list.push(fileItem.mtime)
        }
    })

    if(list.length>1){
        console.log(list)
    }

})