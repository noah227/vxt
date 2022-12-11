const {chalk} = require("@vue/cli-shared-utils");
const download = require("download-git-repo");
const validatePackName = require("validate-npm-package-name")
const {exit} = require("@vue/cli-shared-utils/lib/exit");
const fse = require("fs-extra");
const fs = require("fs")
const path = require("path")

const inquirer = require("inquirer")
const PackageInitializer = require("./PackageInitializer")
const DepsInstaller = require("./DepsInstaller")
const GitInitializer = require("./GitInitializer")


const DOWNLOAD_PATH_GITHUB = "github:noah227/vxt-template"
const DOWNLOAD_PATH = DOWNLOAD_PATH_GITHUB

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
	// console.log(options)
	// exit(1)
	// 验证报包名是否有效
	if (!validatePackName(name).validForNewPackages) {
		console.error(chalk.red(`Invalid project name: "${name}"`))
		exit(1)
	}
	// 存在文件时判断是否覆盖
	if (fse.pathExistsSync(name)) {
		// 移除
		if (options.force) {
			await fse.remove(name)
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
				await fse.remove(name)
			} else if (action === "merge") {

			}
		}
	}
	console.log(`Creating project ${chalk.yellow(name)}...`)
	// todo some conditions
	const initUsingGit = false
	const initTemplateFn = initUsingGit ? initTemplateWithGit : initTemplateWithLocal
	initTemplateFn(name, async err => {
		let msg = chalk.greenBright(`Project ${name} created`)
		if (err) msg = chalk.redBright(`Create error: ${err}`)
		else {
			// 模版拷贝成功
			// 初始化package.json数据
			await new PackageInitializer(name, {
				name,
				version: '0.1.0',
				private: true,
				scripts: {},
				dependencies: {},
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

/**
 * download template from git
 * @param name {String} create file name
 * @param cb {Function} callback
 */
const initTemplateWithGit = (name, cb) => {
	download(DOWNLOAD_PATH, name, {
		filename: name
	}, async (error) => {
		cb(error)
	})
}
/**
 * copy local file template
 * @param name {String} create filename
 * @param cb {Function} callback
 * @return {boolean}
 */
const initTemplateWithLocal = (name, cb) => {
	try {
		fse.copySync(path.join(__dirname, "../../template"), name, {
			filter(src) {
				console.log(src, shallCopy(src))
				return shallCopy(src)
			}
		})
		fse.copySync(path.join(__dirname, "../../_gitignore"), `${name}/.gitignore`, {})
		fs.writeFileSync(
			`${name}/README.md`,
			fs.readFileSync(path.join(__dirname, "../../_README"), {encoding: "utf8"}).replace("@appName", name),
			{
				encoding: "utf8"
			}
		)
		cb()
	} catch (err) {
		cb(err)
	}
}

/** @type String[] */
const COPY_EXCLUDE_LIST = ["TODO.md", "README.md"]
/**
 * whether to copy
 * @param src {String}
 */
const shallCopy = (src) => {
	return !COPY_EXCLUDE_LIST.find(s => src.endsWith(s))
}