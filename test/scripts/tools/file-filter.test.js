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
});
