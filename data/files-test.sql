/*
 Navicat SQLite Data Transfer

 Source Server         : files-admin
 Source Server Type    : SQLite
 Source Server Version : 3012001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3012001
 File Encoding         : 65001

 Date: 02/02/2019 13:23:16
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for files-test
-- ----------------------------
DROP TABLE IF EXISTS "files-test";
CREATE TABLE "files-test" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "md5" text,
  "basePath" TEXT,
  "relativePath" TEXT,
  "mode" TEXT,
  "size" integer,
  "mtime" integer,
  "isDirectory" integer
);

-- ----------------------------
-- Records of files-test
-- ----------------------------
BEGIN;
INSERT INTO "files-test" VALUES (1, 'sdfsdf', 'sdf', 'eeee', 12, 11, 22, 1);
COMMIT;

-- ----------------------------
-- Auto increment value for files-test
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 1 WHERE name = 'files-test';

PRAGMA foreign_keys = true;
