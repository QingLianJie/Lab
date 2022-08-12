# 贡献代码

我们欢迎任何合理的建议和代码提交。

## 如何安装依赖？

项目使用 pnpm 包管理器，Node.js 版本最好大于 16.16.0。

```shell
npm i -g pnpm
pnpm i
```

## 如何解决开发中的跨域问题？

如果要连接到生产环境的 API，可能会遇到跨域问题，可以使用反向代理解决。

1. 添加下面一行到 hosts 文件。

   ```
   127.0.0.1 internal.qinglianjie.cn
   ```

2. 安装 Caddy，并使用项目根目录里的 Caddyfile 启动，第一次启动可能要安装本地证书。

   ```shell
   caddy start --config ./Caddyfile
   ```

3. 启动开发服务器，监听 3000 端口。
4. 浏览器打开 https://internal.qinglianjie.cn/ ，可以进行开发调试。
