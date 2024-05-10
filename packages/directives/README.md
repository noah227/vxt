# directives

Directives for vxt dev

## usage 

```ts
// main.ts
import vxtDirectives from "@vxt/directives";

const app = createApp(App)
app.use(vxtDirectives)
```

### v-i18n

```vue
<!--message got with chrome.i18n.getMessage('optionText') will be set as tag's innerHTML-->
<a v-i18n="'optionText'"></a>
<!--message got with chrome.i18n.getMessage('linkTitle') will be set as tag's title-->
<a v-i18n:title="'linkTitle'"></a>
```
