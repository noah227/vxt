// 初始化package.json信息
const fs = require("fs")
const path = require("path")
const {resolvePkg} = require("@vue/cli-shared-utils")

class PackageInitializer {
	/**
	 * @param {String} context
	 * @param {Object} config
	 */
	constructor(context, config) {
		this.context = context
		this.config = config
		this.exclude = [
			"name", "version"
		]
	}

	async resolvePkgCopy() {
		// 读取模版package.json部分数据
		return Object.entries(await resolvePkg(this.context)).reduce((data, [k, v]) => {
			if (this.exclude.indexOf(k) < 0) data[k] = v
			return data
		}, {})
	}

	async init() {
		const writeData = {
			...this.config,
			...await this.resolvePkgCopy(this.context)
		}
		delete writeData._id
		delete writeData.readme
		await fs.writeFile(path.join(this.context, "package.json"),
			JSON.stringify(writeData, null, "\t"),
			err => {
				if (err) throw err
			}
		)
	}
}

module.exports = PackageInitializer