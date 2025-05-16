# @gaubee/node

该项目在 @gaubee/util 的基础上，提供了与 NodeJs-API 相关的进一步补充。

## API

### @gaubee/node/path

- **`normalizeFilePath`** 将路径格式化为标准 POSIX 格式
  - 支持处理 URL 格式路径
  - 自动转换 Windows 路径分隔符
- **`createResolver`** 创建路径解析器
  - 柯里化函数，绑定特定工作目录
  - 返回带有 `dirname`属性的函数
- **`cwdResolver`** 基于当前工作目录的路径解析器
  - 等同于 `path.resolve(process.cwd(), ...paths)`
- **`createResolverByRootFile`** 根据根文件创建路径解析器
  - 向上查找指定文件(默认 package.json)
  - 返回基于该文件所在目录的解析器

### @gaubee/node/promise

- **`nodeTimmers`** 对 `@gaubee/util` timmers 的扩展补充
  - `nodeTimmers.eventEmitter` 为 delay 函数提供 `node:event/EventEmitter` timmer 工厂函数.
