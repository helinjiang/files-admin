# files-admin

获取和管理文件。

## 如何使用

```bash
$ npm install files-admin
```

## API

### FileItem

文件对象，属性及含义如下：

> 引用了 [walk-sync](https://www.npmjs.com/package/walk-sync) 组件。

| 字段名 | 含义 | 特别说明|
| --- | --- | --- |
| `basePath` | 基础路径 | |
| `relativePath` | 相对于 `basePath` 的相对路径 | |
| `mode` | 文件模式 | |
| `size` | 文件大小 | |
| `mtime` | 文件最后修改时间 | |
| `isDirectory` | 是否为目录 | |
| `fileName` | 文件名字 | |
| `fullPath` | 文件的绝对路径 | |
| `_md5` | 文件MD5值 | 计算MD5值是需要时间的 |

#### 方法：getMd5()

获得该文件的 MD5 值。

- 如果是文件夹则返回空值。
- 重复调用时会从缓存中获取，只计算一次。