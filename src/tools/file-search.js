/**
 * 获取到文件，并将所有文件封装为 FileItem 类型
 */

const fsHandler = require('fs-handler');
const FileItem = require('../model/FileItem');

/**
 * 获得某路径下所有的文件
 * @param {String} targetPath 目标路径
 *
 * @returns {FileItem[]}
 */
function getAllFiles(targetPath) {
  return fsHandler.search.getAllFiles(targetPath).map((entry) => {
    return new FileItem(entry, entry.isDirectory());
  });
}

module.exports = {
  getAllFiles: getAllFiles
};