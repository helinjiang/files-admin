const path = require('path');
const fileCompare = require('../../../src/tools/file-compare');
const expect = require('chai').expect;

const dataBasePath = path.resolve(__dirname, '../../data/fixtures/compare');

describe('校验 tools/file-compare.js', function () {
  describe('基础检查', function () {
    it('对外提供了2个方法和属性', function () {
      expect(fileCompare).to.have.all.keys('compare', 'find');
    });
  });

  describe('compare(pathA, pathB, options)', function () {
    var compareResult;

    before(function () {
      compareResult = fileCompare.compare(path.join(dataBasePath, './a'), path.join(dataBasePath, './b'), { noProgressBar: true });
    });

    it('文件比较操作完成', function () {
      expect(compareResult).to.be.an('object').and.have.all.keys('onlyInA', 'onlyInB', 'both');
    });

    it('有两个文件只存在于a中', function () {
      expect(compareResult).to.have.property('onlyInA')
        .that.is.an('array')
        .that.to.have.lengthOf(2);
    });

    it('只存在于a中的文件分别为 compare-2-different-md5.txt 和 compare-4.txt', function () {
      expect(compareResult['onlyInA'].map(function (item) {
        return item.relativePath;
      })).to.have.same.members(['compare-2-different-md5.txt', 'compare-4.txt']);
    });

    it('有两个文件只存在于b中', function () {
      expect(compareResult).to.have.property('onlyInB')
        .that.is.an('array')
        .that.to.have.lengthOf(3);
    });

    it('只存在于b中的文件分别为 compare-2.txt 和 compare-5.txt', function () {
      expect(compareResult['onlyInB'].map(function (item) {
        return item.relativePath;
      })).to.have.same.members(['compare-2-different-md5.txt', 'compare-5.txt', 'subdir/compare-6.txt']);
    });

    it('有两个文件同时存在a和b中', function () {
      expect(compareResult).to.have.property('both')
        .that.is.an('object')
        .that.to.include.keys('d6449191e61e5d22913d261d1938ca9b')
        .that.to.include.keys('e820a3de6b926b0bbe84b781f3aee457');
    });

    it('d6449191e61e5d22913d261d1938ca9b 对应两条记录', function () {
      expect(compareResult.both['d6449191e61e5d22913d261d1938ca9b']).to.have.lengthOf(2);
    });

    it('e820a3de6b926b0bbe84b781f3aee457 对应四条记录', function () {
      expect(compareResult.both['e820a3de6b926b0bbe84b781f3aee457']).to.have.lengthOf(4);
    });

  });
});
