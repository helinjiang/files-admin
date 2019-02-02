const path = require('path');
const hash = require('../utils/hash');

class FileItem {
    /**
     * @param {Object} entry walk-sync 返回的 Entry 对象，详见 https://www.npmjs.com/package/walk-sync
     * @param {String} entry.basePath 基础路径
     * @param {String} entry.relativePath 相对路径
     * @param {String} entry.mode 文件模式
     * @param {String} entry.size 文件大小
     * @param {String} entry.mtime 文件最后修改时间
     * @param {Boolean} isDirectory 是否为目录
     *
     * @constructor
     */
    constructor(entry, isDirectory) {
        this.basePath = entry.basePath;
        this.relativePath = entry.relativePath;
        this.mode = entry.mode;
        this.size = entry.size;
        this.mtime = entry.mtime;

        this.isDirectory = isDirectory;

        this._fileName = '';
        this._fullPath = '';
        this._md5 = '';
    }

    /**
     * 获得文件名字
     * @return {String}
     */
    getFileName() {
        // 缓存结果，不需要每次获取都重新去计算
        if (!this._fileName) {
            this._fileName = path.basename(this.relativePath);
        }

        return this._fileName;
    }

    /**
     * 获得文件绝对路径
     * @return {String}
     */
    getFullPath() {
        // 缓存结果，不需要每次获取都重新去计算
        if (!this._fullPath) {
            this._fullPath = path.join(this.basePath, this.relativePath);
        }

        return this._fullPath;
    }

    /**
     * 获得文件的md5值
     *
     * @return {String}
     */
    getMd5() {
        // 如果当前是目录，则直接返回空即可。目录没有 md5 一说。
        if (this.isDirectory) {
            return '';
        }

        // 缓存结果，不需要每次获取都重新去计算
        if (!this._md5) {
            try {
                this._md5 = hash.getHashOfFile(this.getFullPath());
            } catch (err) {
                console.error('get md5 err', this.getFullPath(), err);
            }
        }

        return this._md5;
    }
}

module.exports = FileItem;