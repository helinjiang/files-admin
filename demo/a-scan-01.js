const data = require('../tmp/scan_data');

// console.log(Object.keys(data))
// console.log(Object.keys(data.map))
// console.log(data.multiArr)

console.log(data.basePath)
data.multiArr.forEach((md5) => {
    console.log('\n-----------------------------')
    console.log(data.map[md5])
})