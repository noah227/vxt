const fs = require("fs")
const path = require("path")

// $0: tbody
// Array.from($0.children).reduce((dataList, tr) => {
// 	dataList.push(`"${tr.children[0].innerHTML}"`)
// 	return dataList
// }, []).join(" | ")
/**
 * @typedef {"ar" | "am" | "bg" | "bn" | "ca" | "cs" | "da" | "de" | "el" | "en" | "en_AU" | "en_GB" | "en_US" | "es" | "es_419" | "et" | "fa" | "fi" | "fil" | "fr" | "gu" | "he" | "hi" | "小时" | "hu" | "id" | "it" | "ja" | "kn" | "ko" | "lt" | "lv" | "ml" | "mr" | "ms" | "nl" | "否" | "pl" | "pt_BR" | "pt_PT" | "ro" | "ru" | "sk" | "sl" | "sr" | "sv" | "sw" | "ta" | "te" | "th" | "tr" | "uk" | "vi" | "zh_CN" | "zh_TW"} localeCode
 * @see https://developer.chrome.com/docs/extensions/reference/api/i18n#locales
 */
/**
 *
 * @param localeDir
 * @param {localeCode} defaultLocale
 * @param {string[]} excludeList
 * @return {string[]}
 */
const loadLocaleDirList = (localeDir, defaultLocale, excludeList = []) => {
	const dirList = fs.readdirSync(localeDir)
	return dirList.filter(_ => {
		return _ !== defaultLocale && !excludeList.includes(_) && fs.statSync(path.resolve(localeDir, _)).isDirectory()
	})
}

/**
 *
 * @param localeDir
 * @param localeName
 * @return {{[index: string]: {
 *    message: string
 * }}}
 */
const readLocaleContent = (localeDir, localeName) => {
	return JSON.parse(fs.readFileSync(path.resolve(localeDir, localeName, "messages.json"), {encoding: "utf8"}))
}

/**
 *
 * @param {{
 *     localeDir: string,
 *     defaultLocale?: localeCode
 * }} config
 */
const i18nHelper = (config) => {
	const {localeDir, defaultLocale = "en"} = config
	const dirList = loadLocaleDirList(localeDir, defaultLocale)
	const defaultMessage = readLocaleContent(localeDir, defaultLocale)
	return {
		/**
		 * Check and init locale dirs & messages.json within.
		 * @param {localeCode[]} locales
		 */
		initLocales(locales) {
			locales.forEach(locale => {
				const currentLocalePath = path.join(localeDir, locale)
				if (!dirList.includes(locale)) {
					fs.mkdirSync(currentLocalePath)
					console.log(`[init] _locales/${locale} created`)
				}
				const messageJsonPath = path.resolve(currentLocalePath, "messages.json")
				if (!fs.existsSync(messageJsonPath)) {
					fs.writeFileSync(messageJsonPath, JSON.stringify(defaultMessage, null, 4), {encoding: "utf8"})
					console.log(`[init] _locales/${locale}/message.json created with data from _locales/${defaultLocale}/messages.json`)
				}
			})
		},
		/**
		 * Sync data from defaultLocale
		 * @param {string[]} excludeList
		 * @param {boolean} forceOverwrite
		 */
		syncLocales(excludeList = [], forceOverwrite = false) {
			const dirList = loadLocaleDirList(localeDir, defaultLocale, excludeList)
			const defaultMessage = readLocaleContent(localeDir, defaultLocale)
			dirList.forEach(dir => {
				// sync data to each locale from defaultLocale
				const dirMessage = readLocaleContent(localeDir, dir)
				const dirNewMessage = {}
				for (let k in defaultMessage) {
					const {message} = defaultMessage[k]
					dirNewMessage[k] = {
						message: forceOverwrite ? message : dirMessage[k]?.message || message || ""
					}
				}
				// 其他的字段？
				fs.writeFileSync(path.resolve(localeDir, dir, "messages.json"), JSON.stringify(dirNewMessage, null, 4), {encoding: "utf8"})
			})
		}
	}
}

module.exports = i18nHelper
