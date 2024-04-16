# i18n-helper

> A simple chrome extension i18n dev helper
>
> Better locale development experience

## usage

```js
const i18nHelper = require("@vxt/i18n-helper")
const path = require("path")

const helper = i18nHelper({
	localeDir: path.resolve(__dirname, "src/_locales")
})

helper.initLocales(["en_US", "zh_CN", "fr"])

helper.syncLocales()
```
