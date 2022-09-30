const fs = require("fs")
const path = require("path")
const execa = require("execa");
const context = path.join(__dirname, "../", "packages")
const dirents = fs.readdirSync(context, {withFileTypes: true}).filter(d => d.isDirectory())

dirents.forEach(async d => {
	// build lib
	await execa("rollup", [
		"-c", "--environment",
		[
			`TARGET:${d.name}`, // 主编译
			`TYPES:true`,	// 类型编译
		].join(",")
	], {stdio: "inherit"})
})