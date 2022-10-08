# vxt

使用pnpm管理mono repo

### 参考

* [pnpm建立mono repo](https://blog.csdn.net/qq_21567385/article/details/118590143)
* [基于pnpm从0搭建Monorepo工程](https://www.jianshu.com/p/906a76b84332)
* [从0开始使用pnpm构建一个Monorepo方式管理的demo](https://cloud.tencent.com/developer/article/2036975)

### 使用

* 安装一个全局依赖 `pnpm add -w`
* 安装到指定app里 `--filter appName` | `-F appName`
* 相互引用（例`@lib/a`引用`@lib/b`） `pnpm add @lib/b@* --filter @lib/a`
* 递归安装依赖 `pnpm i -r`