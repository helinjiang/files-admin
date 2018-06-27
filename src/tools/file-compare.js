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
 * 找到 pathA 和 pathB 两个路径下文件的相同和不同之处。
 *
 * @param {String} pathA 路径A
 * @param {String} pathB 路径B
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
      total: pathAFiles.length + pathBFiles.length
    });
  }

  // 数组元素为 FileItem
  let arrInBButNotInA = [];
  let arrInAButNotInB = [];

  // 以 md5 为 key 值，value 为数组，数组内记录了所有相同 md5 值的 FileItem
  let arrInBoth = {};

  // 循环查找 pathA
  pathAFiles.forEach(function (fileItemA) {
    let md5A = fileItemA.getMd5();
    let sameMd5FileItemInPathB = find(md5A, pathBFiles);

    if (!sameMd5FileItemInPathB) {
      // 如果该 pathA 中的元素不与 pathB 中任何一个元素相同
      arrInAButNotInB.push(fileItemA);
    } else {
      // 如果该 pathA 中的元素与 pathB 中任何一个元素相同
      let arr = arrInBoth[md5A] || [];

      // 以 md5 为key值，value为数组，数组内记录了所有相同 md5 值的 FileItem
      _addInArr(sameMd5FileItemInPathB, arr);
      _addInArr(fileItemA, arr);

      // 设置回来
      arrInBoth[md5A] = arr;
    }

    // 进度条
    if (progressBar) {
      progressBar.tick();
    }
  });

  // 循环查找 pathB
  pathBFiles.forEach(function (fileItemB) {
    let md5B = fileItemB.getMd5();
    let sameMd5FileItemInPathA = find(md5B, pathAFiles);

    if (!sameMd5FileItemInPathA) {
      // 如果该 pathB 中的元素不与 pathA 中任何一个元素相同
      arrInBButNotInA.push(fileItemB);
    } else {
      // 如果该 pathB 中的元素与 pathA 中任何一个元素相同
      let arr = arrInBoth[md5B] || [];

      // 以 md5 为key值，value为数组，数组内记录了所有相同 md5 值的 FileItem
      _addInArr(sameMd5FileItemInPathA, arr);
      _addInArr(fileItemB, arr);

      // 设置回来
      arrInBoth[md5B] = arr;
    }

    // 进度条
    if (progressBar) {
      progressBar.tick();
    }
  });

  const sortFileItem = function (item1, item2) {
    return item1.fullPath > item2.fullPath;
  };

  return {
    onlyInA: arrInAButNotInB.sort(sortFileItem),
    onlyInB: arrInBButNotInA.sort(sortFileItem),
    both: arrInBoth
  };
}

/**
 * 找到一个 md5 文件是否在某些文件列表中
 *
 * @param {String} fileMd5 文件的md5值
 * @param {FileItem[]} fileItemList 文件列表
 * @returns {FileItem}
 */
function find(fileMd5, fileItemList) {
  let sameMd5FileItem;

  for (let i = 0, length = fileItemList.length; i < length; i++) {
    let fileItem = fileItemList[i];
    let curFileMd5 = fileItem.getMd5();

    // 如果找到了相同的，则停止
    if (curFileMd5 === fileMd5) {
      sameMd5FileItem = fileItem;
      break;
    }
  }

  return sameMd5FileItem;
}

function _addInArr(fileItem, arr) {
  if (!arr.filter(item => item === fileItem).length) {
    arr.push(fileItem);
  }
}

module.exports = {
  compare: compare,
  find: find
};