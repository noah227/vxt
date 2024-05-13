const {hasGit, hasProjectGit, execa} = require("@vue/cli-shared-utils")

class GitInitializer {
    constructor({git, context}) {
        this.git = git
        this.context = context || process.cwd()
    }

    needInitGit() {
        // 判断git环境
        if (!hasGit()) return
        if (this.git === false) return false
        return !hasProjectGit(this.context)
    }

    async init() {
        if (this.needInitGit()) {
            console.log("Initializing Git...")
            await execa("git init", [], {cwd: this.context})
        }
    }
}

module.exports = GitInitializer
