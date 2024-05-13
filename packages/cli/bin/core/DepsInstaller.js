// semver 用于版本处理比较的
// execa 封装的命令执行
const {semver, execa} = require("@vue/cli-shared-utils")
const PACKAGE_MANAGER_CONFIG = {
    npm: {
        install: ['install', '--loglevel', 'error'],
        add: ['install', '--loglevel', 'error'],
        upgrade: ['update', '--loglevel', 'error'],
        remove: ['uninstall', '--loglevel', 'error']
    },
    yarn: {
        install: [],
        add: ['add'],
        upgrade: ['upgrade'],
        remove: ['remove']
    },
    pnpm: {
        install: ['install', '--reporter', 'silent', '--shamefully-hoist'],
        add: ['install', '--reporter', 'silent', '--shamefully-hoist'],
        upgrade: ['update', '--reporter', 'silent'],
        remove: ['uninstall', '--reporter', 'silent']
    }
}

const RUN_COMMAND = {
    npm: "install",
    yarn: "add",
    pnpm: "install"
}

class depsInstaller {
    /**
     *
     * @param {String} context
     * @param {String} pm
     */
    constructor({context, pm}) {
        this.context = context || process.cwd()
        this.pm = pm || "npm"
        this.cmd = RUN_COMMAND[this.pm]
        // 版本判断
    }

    // 安装器环境检查
    async pmCheckValid() {
        if (this.pm === "npm") {

        }
        return true
    }

    async runCommand(pm, cmd, args, cwd) {
        args = [
            ...PACKAGE_MANAGER_CONFIG[pm][cmd],	// 配置命令及参数
            ...(args || [])
        ]
        return new Promise(((resolve, reject) => {
            // 创建子进程
            const child = execa(this.pm, args, {
                cwd,
                stdio: ["inherit", "inherit", "inherit"]
            })
            // 结果处理
            child.on("close", code => {
                if (code !== 0) {
                    return reject(new Error("run command error"))
                }
                resolve()
            })
        }))
    }

    async install() {
        if (!await this.pmCheckValid()) return
        const args = []
        console.log("Installing dependencies...")
        return await this.runCommand(this.pm, this.cmd, args, this.context)
    }
}

module.exports = depsInstaller
