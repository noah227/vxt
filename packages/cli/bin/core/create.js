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

const cliRoot = path.resolve(__dirname, "../../")
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
    const appDir = path.resolve(process.cwd(), name)
    // console.log(options)
    // exit(1)
    // 验证报包名是否有效
    if (!validatePackName(name).validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`))
        exit(1)
    }
    // 存在文件时判断是否覆盖
    if (fse.pathExistsSync(appDir)) {
        // 移除
        if (options.force) {
            await fse.remove(appDir)
        } else {
            // 创建提示
            const {action} = await inquirer.prompt({
                name: "action",
                type: "list",
                message: `${chalk.yellow(appDir)} already exists, choose an option to continue`,
                choices: [
                    {name: "Overwrite", value: "overwrite"},
                    {name: "Merge", value: "merge"},
                    {name: "Cancel", value: "cancel"},
                ]
            })
            if (action === "cancel") {
                console.log("Creation canceled")
                exit(0)
            } else if (action === "overwrite") {
                await fse.remove(appDir)
            } else if (action === "merge") {

            }
        }
    }
    console.log(`Creating project ${chalk.yellow(name)}...`)
    // todo some conditions
    const initUsingGit = false
    const initTemplateFn = initUsingGit ? initTemplateWithGit : initTemplateWithLocal
    initTemplateFn(appDir, async err => {
        let msg = chalk.greenBright(`Project ${name} created`)
        if (err) msg = chalk.redBright(`Create error: ${err}`)
        else {
            // 模版拷贝成功
            // 初始化package.json数据
            await new PackageInitializer(appDir, {
                name,
                version: '0.1.0',
                private: true,
                scripts: {},
                dependencies: {},
                devDependencies: {},
            }).init()
            // 初始化git
            await new GitInitializer({context: appDir, git: options.git}).init()
            // 安装依赖
            await new DepsInstaller({context: appDir, pm: options.packageManager}).install()
        }
        console.log(msg)
    })
}

/**
 * download template from git
 * @param appDir {String} create file dir
 * @param cb {Function} callback
 */
const initTemplateWithGit = (appDir, cb) => {
    download(DOWNLOAD_PATH, appDir, {
        filename: path.basename(appDir)
    }, async (error) => {
        cb(error)
    })
}
/**
 * copy local file template
 * @param appDir {String} create file dir
 * @param cb {Function} callback
 * @return {boolean}
 */
const initTemplateWithLocal = (appDir, cb) => {
    try {
        const name = path.basename(appDir)
        fse.copySync(path.join(cliRoot, "template"), appDir, {
            filter(src) {
                return shallCopy(src)
            }
        })
        fse.copySync(path.join(cliRoot, "_gitignore"), path.resolve(appDir, ".gitignore"), {})
        fs.writeFileSync(
            path.resolve(appDir, "README.md"),
            fs.readFileSync(path.join(cliRoot, "_README.md"), {encoding: "utf8"}).replace("@appName", name),
            {
                encoding: "utf8"
            }
        )
        const lang = require("os-locale-ex").osLocaleSync()
        const langTransformed = lang.replaceAll("-", "_")
        const localeFsPath = path.join(cliRoot, `_README.${langTransformed}.md`)
        if (fs.existsSync(localeFsPath)) {
            fs.writeFileSync(
                path.resolve(appDir, `README.${langTransformed}.md`),
                fs.readFileSync(localeFsPath, {encoding: "utf8"}).replace("@appName", name),
                {
                    encoding: "utf8"
                }
            )
        }
        cb()
    } catch (err) {
        cb(err)
    }
}

/** @type String[] */
const COPY_EXCLUDE_LIST = ["TODO.md", "README.md", "README.zh_CN.md", "package-lock.json"]
/**
 * whether to copy
 * @param src {String}
 */
const shallCopy = (src) => {
    return !COPY_EXCLUDE_LIST.includes(path.basename(src))
}
