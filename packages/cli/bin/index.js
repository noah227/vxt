#!/usr/bin/env node

const {Command} = require("commander")
const program = new Command()
const {chalk} = require("@vue/cli-shared-utils")
console.log(chalk.greenBright("~⭐@VXT/CLI POWERED"))

// 注册版本及描述信息
program
	.name("vxt")
	.description("Vue3 Cli for Chrome Extension Dev with Manifest Version3")
	.version(`@cli/test ${require("../package.json").version}`)

// 注册支持的命令及执行函数
program
	.command("create <app-name>")
	.description("create a project")
	.option("-f, --force", "Force overwrite if file exists")
	.option("-g, --git", "Force git initialization")
	.option("-m, --packageManager <command>", "Use specified npm client when installing dependencies")
	.action((name, options) => {
		require("./core/create")(name, options)
	})

// 执行参数处理
program.parse()