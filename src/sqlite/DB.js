const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;

        // 初始化
        this.sqliteDB = new sqlite3.Database(this.dbFilePath);
    }

    createTable() {
        const TABLE_NAME = 'filesinfo';

        this._run(() => {
            this.sqliteDB.run(`create table if not exists ${TABLE_NAME} (
                 "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                  "md5" TEXT,
                  "basePath" TEXT,
                  "relativePath" TEXT,
                  "mode" TEXT,
                  "size" INTEGER,
                  "mtime" INTEGER,
                  "isDirectory" INTEGER
            )`);
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