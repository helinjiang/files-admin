/**
 * 遍历路径下所有的文件信息，并且保存一份列表在本地
 *
 * @author helinjiang
 *
 */

const path = require('path');
const ProgressBar = require('progress');
const fse = require('fs-extra');

const fileSearch = require('./file-search');

function saveJsonMd5(sourcePath, savePath, options) {
  let fileArr = fileSearch.getAllFiles(sourcePath);

  let map = {};
  let multiNameArr = [];

  // 默认展示进度条
  if (!options) {
    options = {
      noProgressBar: false
    };
  }

  // 进度条
  let progressBar;
  if (!options.noProgressBar) {
    progressBar = new ProgressBar('[:bar] :current/:total :percent(:etas) , already cost :elapseds ', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: fileArr.length
    });
  }

  // 获取 map 和 multiNameArr
  fileArr.forEach(function (fileItem) {
    // 注意，如果文件比较多的话，此处每个文件做hash会比较耗时，尤其是文件也相对比较大时，情况更严重
    // 尝试过遍历包含703张图片，结果耗时189.3s图片，平均一张耗时：269ms;
    // 10M的视频400ms左右；1.55M图片126ms
    // 10M的视频290ms左右；1.55M图片50ms
    let fileName = fileItem.getMd5() + '';

    let arr = map[fileName] || [];

    arr.push({
      p: fileItem.relativePath,
      s: fileItem.size,
      t: fileItem.mtime
    });

    map[fileName] = arr;

    // 判断是否已经有重名的文件了
    if (arr.length > 1) {
      multiNameArr.push(fileName);
    }

    // 进度条
    if (progressBar) {
      progressBar.tick();
    }
  });

  const result = {
    basePath: sourcePath,
    map: map,
    multiArr: multiNameArr
  };

  return fse.outputJson(path.join(savePath, 'scan-data.json'), result)
    .then(function () {
      return result;
    });
}

module.exports = {
  saveJsonMd5: saveJsonMd5
};