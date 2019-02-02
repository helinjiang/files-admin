const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;

        this.TABLE_NAME = 'filesinfo';

        // 初始化
        this.sqliteDB = new sqlite3.Database(this.dbFilePath);
    }

    createTable() {
        this._run(() => {
            this.sqliteDB.run(`create table if not exists ${this.TABLE_NAME} (
                 "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                 "md5" TEXT,
                 "relativePath" TEXT,
                 "mode" TEXT,
                 "size" INTEGER,
                 "mtime" INTEGER,
                 "isDirectory" INTEGER
            )`);
        });
    }

    addFileItem(datas) {
        // 兼容列表和单个元素的场景
        let list = Array.isArray(datas) ? datas : [datas];

        console.log('--addFileItem-- list length', list.length);
        console.time('addFileItem');

        this._run(() => {
            const stmt = this.sqliteDB.prepare(`INSERT INTO ${this.TABLE_NAME} (md5,relativePath,mode,size,mtime,isDirectory) VALUES (?,?,?,?,?,?)`);

            list.forEach((item) => {
                stmt.run(item._md5, item.relativePath, item.mode, item.size, item.mtime, item.isDirectory ? 1 : 0);
            });

            stmt.finalize();

            console.log('--addFileItem-- success!');
            console.timeEnd('addFileItem');
        });
    }

    _run(runCall) {
        const self = this;

        this.sqliteDB.serialize(function () {
            runCall.call(self);
        });

        this.sqliteDB.close();
    }
}

module.exports = DB;