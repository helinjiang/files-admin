const path = require('path');
const fileFilter = require('../../../src/tools/file-filter');
const expect = require('chai').expect;

const dataBasePath = path.resolve(__dirname, '../../data/fixtures/filter');

describe.only('校验 tools/file-filter.js', function () {

  describe('基础检查', function () {
    it('对外提供了四个方法和属性', function () {
      expect(fileFilter).to.have.all.keys('filterByName', 'filterBySize', 'filterByTime', 'filterByMd5');
    });
  });

  describe('filterByName(sourcePath, options)', function () {
    let filterResult;

    before(function () {
      filterResult = fileFilter.filterByName(path.join(dataBasePath, './same-name'), { noProgressBar: true });
    });

    it('文件比较操作完成', function () {
      expect(filterResult).to.be.an('object').and.have.all.keys('unique-1.txt');
    });

    it('重名为 unique-1.txt 的有两个', function () {
      expect(filterResult).to.have.property('unique-1.txt')
        .that.is.an('array')
        .that.to.have.lengthOf(2);
    });

    it('重名文件列表正确', function () {
      expect(filterResult['unique-1.txt'].map(function (item) {
        return item.relativePath;
      })).to.have.same.members(['subdir/unique-1.txt', 'unique-1.txt']);
    });
  });

  describe('filterBySize(sourcePath, options)', function () {
    let filterResult;

    before(function () {
      filterResult = fileFilter.filterBySize(path.join(dataBasePath, './same-size'), { noProgressBar: true });
    });

    it('文件比较操作完成', function () {
      expect(filterResult).to.be.an('object').and.have.all.keys('13');
    });

    it('文件大小为 13 的有两个', function () {
      expect(filterResult).to.have.property('13')
        .that.is.an('array')
        .that.to.have.lengthOf(2);
    });

    it('相同文件大小的文件列表正确', function () {
      expect(filterResult['13'].map(function (item) {
        return item.relativePath;
      })).to.have.same.members(['unique-size-1-same.txt', 'unique-size-1.txt']);
    });
  });

  describe('filterByTime(sourcePath, options)', function () {
    let filterResult;

    before(function () {
      filterResult = fileFilter.filterByTime(path.join(dataBasePath, './same-time'), { noProgressBar: true });
    });

    it('文件比较操作完成', function () {
      expect(filterResult).to.be.an('object').and.have.all.keys('1530111854831');
    });

    it('时间戳为 1530111854831 的有两个', function () {
      expect(filterResult).to.have.property('1530111854831')
        .that.is.an('array')
        .that.to.have.lengthOf(2);
    });

    it('相同时间戳的文件列表正确', function () {
      expect(filterResult['1530111854831'].map(function (item) {
        return item.relativePath;
      })).to.have.same.members(['unique-time-1-same.txt', 'unique-time-1.txt']);
    });
  });

  describe('filterByTime(sourcePath, options)', function () {
    let filterResult;

    before(function () {
      filterResult = fileFilter.filterByMd5(path.join(dataBasePath, './same-md5'), { noProgressBar: true });
    });

    it('文件比较操作完成', function () {
      expect(filterResult).to.be.an('object').and.have.all.keys('dfb875049cd98cf8bb32ea8d6333b367');
    });

    it('md5值为 dfb875049cd98cf8bb32ea8d6333b367 的有两个', function () {
      expect(filterResult).to.have.property('dfb875049cd98cf8bb32ea8d6333b367')
        .that.is.an('array')
        .that.to.have.lengthOf(2);
    });

    it('相同md5值的文件列表正确', function () {
      expect(filterResult['dfb875049cd98cf8bb32ea8d6333b367'].map(function (item) {
        return item.relativePath;
      })).to.have.same.members(['unique-md5-1-same.txt', 'unique-md5-1.txt']);
    });
  });
});
