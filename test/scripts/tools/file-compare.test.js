const path = require('path');
const fileCompare = require('../../../src/tools/file-compare');
const expect = require('chai').expect;

const dataBasePath = path.resolve(__dirname, '../../data/fixtures/compare');

describe('校验 tools/file-compare.js', function () {
  describe('文件比较：找出 a 和 b 文件夹内的相同和不同的文件', function () {
    var compareResult;

    before(function () {
      compareResult = fileCompare.compare(path.join(dataBasePath, './a'), path.join(dataBasePath, './b'), { noProgressBar: true });
    });

    it('文件比较操作完成', function () {
      expect(compareResult).to.be.an('object').and.have.all.keys('onlyInA', 'onlyInB', 'both');
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

    // it('文件比较之后：有两个文件同时存在a和b中', function () {
    //   expect(compareResult).to.have.property('same')
    //     .that.is.an('object')
    //     .that.to.include.keys('27dc180b57d8f177e10998cbd0a9894f')
    //     .that.to.include.keys('e5fd0cedc7d0613169eb6986801e86e5');
    // });
    //
    // it('文件比较之后：27dc180b57d8f177e10998cbd0a9894f 对应三条记录', function () {
    //   expect(Object.keys(compareResult.same['27dc180b57d8f177e10998cbd0a9894f'])).to.have.lengthOf(3);
    // });
    //
    // it('文件比较之后：e5fd0cedc7d0613169eb6986801e86e5 对应两条记录', function () {
    //   expect(Object.keys(compareResult.same['e5fd0cedc7d0613169eb6986801e86e5'])).to.have.lengthOf(2);
    // });

  });
});
