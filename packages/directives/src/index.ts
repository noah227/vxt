import {App, DirectiveBinding} from "vue";

type TIi18nValue = string | [
    key: string,
    substitutions?: string | string[]
]
/**
 * 快捷的i18n指令
 * @description set with message got with chrome.i18n.getMessage,
 * default set to innerHTML, support substitutions
 */
export const directiveI18n = {
    created(el: HTMLElement, {value, arg = ""}: DirectiveBinding<TIi18nValue>) {
        let key = "", substitutions = undefined
        if (value instanceof Array) {
            if (!value.length) return
            key = value[0]
            if (value.length > 1) substitutions = value[1]
        } else if (typeof value === "string") key = value
        else return
        const msg = chrome.i18n.getMessage(key, substitutions)
        if (arg && arg !== "html") {
            el.setAttribute(arg, msg)
        } else el.innerHTML = msg
    }
}

const directives = {
    i18n: directiveI18n
}

export default {
    /**
     * 扩展开发时常用到的指令：i18n渲染 | ...
     */
    install: (app: App) => {
        Object.entries(directives).forEach(([k, v]: [string, any]) => {
            app.directive(k, v)
        })
    }
}
