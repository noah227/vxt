# i18n-helper

> A simple chrome extension i18n dev helper
>
> Better locale development experience

## usage

```js
const i18nHelper = require("@vxt/i18n-helper")
const path = require("path")

const helper = i18nHelper({
    localeDir: path.resolve(__dirname, "src/_locales"),
    // defaultLocale: ""
})

// This will initialize locale files based on default locale file
helper.initLocales(["en_US", "zh_CN", "fr"])

// This will sync locale data from default locale file to other locale files
helper.syncLocales()
```
