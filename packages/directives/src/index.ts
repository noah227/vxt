import {App, DirectiveBinding} from "vue";

const directives = {
	/**
	 * 快捷的i18n指令
	 */
	i18n: {
		created(el: HTMLElement, {value: key, arg = ""}: DirectiveBinding) {
			if (!key) return
			const msg = chrome.i18n.getMessage(key)
			if (arg && arg !== "html") {
				el.setAttribute(arg, msg)
			} else el.innerHTML = msg
		}
	}
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