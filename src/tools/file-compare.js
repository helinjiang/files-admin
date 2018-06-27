/**
 * 文件比较。
 *
 * 最典型的场景就是我们的相片，可能在不同文件夹里面保存了，我们要合并，同时去除重复的。
 *
 * 方法一：比较文件的 md5 值。这个是最准确的，也是耗时最多的方法，适合要精准比较的场景。
 * 方法二：如果文件同名，且文件大小一致，则可能为同一个文件（最后修改时间也许不一样）。
 * 这种方法适合比较有规律的场景，比如找出两个文件夹下的重复相片，但无法找出同样文件但文件名不一样（文件重命名）的场景。
 *
 * @author helinjiang
 *
 */

const ProgressBar = require('progress');
const fileSearch = require('./file-search');

/**
 * 以 pathA 为基准，不在 pathA 但在 pathB 中的文件列表。
 *
 * @param {String} pathA 基准路径
 * @param {String} pathB 待比较路径
 * @param {Object} [options] 更多选项
 * @param {Boolean} [options.noProgressBar] 不要出现进度条
 *
 * @return {Object}
 */
function compare(pathA, pathB, options) {
  const pathAFiles = fileSearch.getAllFiles(pathA);
  const pathBFiles = fileSearch.getAllFiles(pathB);

  // 默认展示进度条
  if (!options) {
    options = {
      noProgressBar: false
    };
  }

  // 进度条
  let progressBar;
  if (!options.noProgressBar) {
    progressBar = new ProgressBar('compare [:bar] :current/:total :percent(:etas) , already cost :elapseds ', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: pathBFiles.length
    });
  }

  // 数组元素为 FileItem
  let arrInBButNotInA = [];

  // 以 md5 为 key 值，value 为数组，数组内记录了所有相同 md5 值的 FileItem
  let arrInBoth = {};

  // 循环查找 pathB
  pathBFiles.forEach(function (fileItemB) {
    let md5B = fileItemB.getMd5();
    let sameMd5FileItemInPathA;

    for (let i = 0, length = pathAFiles.length; i < length; i++) {
      let fileItemA = pathAFiles[i];
      let md5A = fileItemA.getMd5();

      // 如果找到了相同的，则停止
      if (md5A === md5B) {
        sameMd5FileItemInPathA = fileItemA;
        break;
      }
    }

    if (!sameMd5FileItemInPathA) {
      // 如果该 pathB 中的元素不与 pathA 中任何一个元素相同
      arrInBButNotInA.push(fileItemB);
    } else {
      // 如果该 pathB 中的元素与 pathA 中任何一个元素相同
      let arr = arrInBoth[md5B] || [];

      // 以 md5 为key值，value为数组，数组内记录了所有相同 md5 值的 FileItem
      arr.push(sameMd5FileItemInPathA);
      arr.push(fileItemB);

      // 数组中的文件排序一下，使得相近路径的文件靠在一起，便于观看结果
      arr.sort(function (item1, item2) {
        return item1.fullPath > item2.fullPath;
      });

      // 设置回来
      arrInBoth[md5B] = arr;
    }

    // 进度条
    if (progressBar) {
      progressBar.tick();
    }
  });

  return {
    different: arrInBButNotInA,
    same: arrInBoth
  };
}

module.exports = {
  compare: compare
};