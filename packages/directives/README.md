# directives

Directives for vxt dev

## usage

* v-i18n

```vue
<!--message got with chrome.i18n.getMessage('optionText') will be set as tag a's innerHTML-->
<div v-i18n="'optionText'"></div>
<!--message got with chrome.i18n.getMessage('linkTitle') will be set as tag a's title-->
<a v-i18n:title="'linkTitle'"></a>
```

## todo

- [ ] ?