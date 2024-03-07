# @appName

## Setup

```shell
npm install
``` 

## 打包

```shell
npm run build
```

or

```shell
npm run build-watch
```

## 安装

* 访问浏览器扩展管理页面 `chrome://extensions/`(Chrome) | `edge://extensions/`(Edge)
* 启用`开发者模式`
* 将打包的dist文件夹拖入到扩展管理界面，添加扩展
* 此时就可以愉快地开发了~

## 注意事项

* 如果打包文件中存在chunk-vendors、chunk-common等，那么你可能需要将其配置在manifest.json正确的位置里，才能确保扩展正常工作

## 官方开发文档（谷歌）

* [get-started](https://developer.chrome.google.cn/docs/extensions/get-started/tutorial/hello-world?hl=zh-cn) (中文)
* [get-started](https://developer.chrome.com/docs/extensions/get-started) (worldwide)
