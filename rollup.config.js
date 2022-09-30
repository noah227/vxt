import {nodeResolve} from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

const path = require("path")

const target = process.env.TARGET
if (!target) throw new Error("Target Needed!")

const context = path.resolve(__dirname, "packages")
const targetDir = path.resolve(context, process.env.TARGET)
const resolve = (p) => path.resolve(targetDir, p)

export default {
	input: resolve("./src/index.ts"),
	output: {
		file: resolve(`lib/index.js`),
		format: "esm"
	},
	plugins: [
		nodeResolve(),
		typescript({
			compilerOptions: {
				lib: ["esnext", "dom"], target: "esnext",
				declaration: true,
				declarationMap: true,
				declarationDir: resolve("lib")
			},
			sourceMap: false,
		}),
		commonjs()
	]
}
