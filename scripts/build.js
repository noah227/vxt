const fs = require("fs")
const path = require("path")
const execa = require("execa");
const context = path.join(__dirname, "../", "packages")
const args = require("minimist")(process.argv.slice(2))
const targets = args._.length ? args._ : fs.readdirSync(context, {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name)

const buildProject = async (name) => {
	// preprocess
	const pkg = require(path.resolve(context, name, "package.json"))
	if (pkg.private) return
	if (!pkg.main) return
	// build lib
	await execa("rollup", [
		"-c", "--environment",
		[
			`TARGET:${name}`, // 主编译
			`TYPES:true`,	// 类型编译
		].join(",")
	], {stdio: "inherit"})
}

targets.forEach(async name => {
	await buildProject(name)
})


