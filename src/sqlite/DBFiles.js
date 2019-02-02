const sqlite3 = require('sqlite3').verbose();

class DBFiles {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;

        this.TABLE_NAME = 'filesinfo';

        // 初始化
        this.sqliteDB = new sqlite3.Database(this.dbFilePath);
    }

    createTable() {
        console.log(`\n准备创建数据表： ${this.TABLE_NAME}`);
        console.time('createTable');

        this._run(() => {
            this.sqliteDB.run(`create table if not exists ${this.TABLE_NAME} (
                 "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                 "md5" TEXT,
                 "relativePath" TEXT,
                 "mode" TEXT,
                 "size" INTEGER,
                 "mtime" INTEGER,
                 "isDirectory" INTEGER,
                 "lastModify" INTEGER
            )`);

            console.log(`数据表： ${this.TABLE_NAME} 创建成功！`);
            console.timeEnd('createTable');
        });
    }

    add(datas) {
        // 兼容列表和单个元素的场景
        let list = Array.isArray(datas) ? datas : [datas];

        console.log(`\n准备插入${list.length}条数据`);
        console.time('add');

        this._run(() => {
            const stmt = this.sqliteDB.prepare(`INSERT INTO ${this.TABLE_NAME} (md5,relativePath,mode,size,mtime,isDirectory,lastModify) VALUES (?,?,?,?,?,?,?)`);

            list.forEach((item) => {
                stmt.run(item.getMd5(), item.relativePath, item.mode, item.size, item.mtime, item.isDirectory ? 1 : 0, Date.now());
            });

            stmt.finalize();

            console.log(`已成功插入${list.length}条数据！`);
            console.timeEnd('add');
        });
    }

    query(callback) {
        this._run(() => {
            // function (err, rows)
            this.sqliteDB.all(`SELECT * FROM ${this.TABLE_NAME}`, callback);
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

module.exports = DBFiles;