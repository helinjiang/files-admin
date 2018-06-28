const path = require('path');
const fse = require('fs-extra');
const expect = require('chai').expect;

const fileScan = require('../../../src/tools/file-scan');

const dataBasePath = path.resolve(__dirname, '../../data/fixtures/scan');
const tmpPath = path.resolve(__dirname, '../../data/tmp');

describe.only('校验 tools/file-scan.js', function () {

  describe('基础检查', function () {
    it('对外提供了1个方法和属性', function () {
      expect(fileScan).to.have.all.keys('saveJsonMd5');
    });
  });

  describe('saveJsonMd5(sourcePath, savePath, options)', function () {
    let saveFullPath = path.join(tmpPath, 'scan-md5.json');
    let scanResult;
    let saveResult;

    before(function (done) {
      fileScan.saveJsonMd5(path.join(dataBasePath, './md5'), saveFullPath, { noProgressBar: true })
        .then((result) => {
          scanResult = result;

          fse.readJson(saveFullPath)
            .then((readResult) => {
              saveResult = readResult;

              done();
            });
        });
    });

    after(function (done) {
      fse.remove(saveFullPath, done);
    });

    it('文件扫描操作完成', function () {
      expect(scanResult).to.be.an('object').and.have.all.keys('basePath', 'map', 'multiArr');
    });

    it('basePath不为空', function () {
      expect(scanResult).to.have.property('basePath')
        .that.is.an('string')
        .that.not.empty;
    });

    it('map 有三个记录', function () {
      expect(scanResult).to.have.property('map')
        .that.is.an('object')
        .that.have.all.keys('dfb875049cd98cf8bb32ea8d6333b367', '139523c29fc1055cc31bc915e562aabd', '2c0f2c09d44d9b076bb141c47c296e36');
    });

    it('multiArr 有1个记录', function () {
      expect(scanResult).to.have.property('multiArr')
        .that.is.an('array')
        .that.have.same.members(['dfb875049cd98cf8bb32ea8d6333b367']);
    });

    it('返回的结果和在本地文件的结果是一致的', function () {
      expect(scanResult).to.eql(saveResult);
    });
  });

});
