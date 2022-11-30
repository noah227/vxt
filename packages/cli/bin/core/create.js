const {chalk} = require("@vue/cli-shared-utils");
const download = require("download-git-repo");
const validatePackName = require("validate-npm-package-name")
const {exit} = require("@vue/cli-shared-utils/lib/exit");
const fs = require("fs-extra");
const inquirer = require("inquirer")
const PackageInitializer = require("./PackageInitializer")
const DepsInstaller = require("./DepsInstaller")
const GitInitializer = require("./GitInitializer")

// const DOWNLOAD_PATH = "github:noah227/vxt-template"
const DOWNLOAD_PATH = "direct:http://192.168.1.200:10000/noahyoung/vxt-template/archive/master.zip"

/**
 *
 * @param name
 * @param {{
 * 		force?: Boolean, packageManager?: String,
 * 		git?: Boolean
 * 	}} options
 * @return {Promise<void>}
 */
module.exports = async (name, options) => {
	console.log(options)
	// exit(1)
	// 验证报名是否有效
	if (!validatePackName(name).validForNewPackages) {
		console.error(chalk.red(`Invalid project name: "${name}"`))
		exit(1)
	}
	// 存在文件时判断是否覆盖
	if (fs.existsSync(name)) {
		// 移除
		if (options.force) {
			await fs.remove(name)
		} else {
			// 创建提示
			const {action} = await inquirer.prompt({
				name: "action",
				type: "list",
				message: `Directory ${chalk.yellow(name)} already exists, choose an option to continue`,
				choices: [
					{name: "Overwrite", value: "overwrite"},
					{name: "Merge", value: "merge"},
					{name: "Cancel", value: "cancel"},
				]
			})
			if (action === "cancel") {
				console.log("已取消创建")
				exit(0)
			} else if (action === "overwrite") {
				await fs.remove(name)
			} else if (action === "merge") {

			}
		}
	}
	console.log(`Creating project ${chalk.yellow(name)}...`)
	download(DOWNLOAD_PATH, name, {
		filename: name
	}, async (error) => {
		let msg = chalk.greenBright(`Project ${name} created`)
		if (error) msg = chalk.redBright(`Create error: ${error}`)
		else {
			// 模版拷贝成功
			// 初始化package.json数据
			await new PackageInitializer(name, {
				name,
				version: '0.1.0',
				private: true,
				devDependencies: {},
			}).init()
			// 初始化git
			await new GitInitializer({context: name, git: options.git}).init()
			// 安装依赖
			await new DepsInstaller({context: name, pm: options.packageManager}).install()
		}
		console.log(msg)
	})
}