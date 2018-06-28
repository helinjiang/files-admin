module.exports = {
  utils: {
    hash: require('./utils/hash')
  },
  fileCompare: require('./tools/file-compare'),
  fileFilter: require('./tools/file-filter'),
  fileScan: require('./tools/file-scan'),
  fileSearch: require('./tools/file-search'),
  FileItem: require('./model/FileItem')
};