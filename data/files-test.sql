/*
 Navicat SQLite Data Transfer

 Source Server         : files-admin
 Source Server Type    : SQLite
 Source Server Version : 3012001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3012001
 File Encoding         : 65001

 Date: 02/02/2019 13:10:07
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for files-test
-- ----------------------------
DROP TABLE IF EXISTS "files-test";
CREATE TABLE "files-test" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "md5" TEXT,
  "basePath" TEXT,
  "relativePath" TEXT,
  "mode" TEXT,
  "size" INTEGER,
  "mtime" INTEGER,
  "isDirectory" INTEGER
);

-- ----------------------------
-- Auto increment value for files-test
-- ----------------------------

PRAGMA foreign_keys = true;
