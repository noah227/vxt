import {nodeResolve} from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

const path = require("path")
const fs = require("fs")

const target = process.env.TARGET
if (!target) throw new Error("Target Needed!")

const context = path.resolve(__dirname, "packages")
const targetDir = path.resolve(context, target)
const resolve = (p) => path.resolve(targetDir, p)

const outputPreset = {
    "es": {
        file: resolve("./lib/index.js"),
        format: "es"
    },
    "cjs": {
        file: resolve("./lib/index.cjs.js"),
        format: "cjs"
    }
}

const pkg = require(resolve("package.json"))
const defaultBuildOptions = {
    formats: ["es"]
}
const {formats} = {...defaultBuildOptions, ...pkg.buildOptions}
const useTerser = false

const createPlugins = (f) => {
    const plugins = [
        nodeResolve(),
        typescript({
            compilerOptions: {
                target: f === "cjs" ? "esnext" : "es2015",
                sourceMap: true,
                declaration: true,
                declarationMap: true,
                declarationDir: resolve("lib"),
                rootDir: resolve("src")
            },
            sourceMap: false,
        }),
        commonjs()
    ]
    useTerser && plugins.push(terser())
    return plugins
}

const createExports = () => formats.map(f => ({
    input: resolve("./src/index.ts"),
    output: {...outputPreset[f], exports: "auto", sourcemap: true},
    plugins: createPlugins(f)
}))

export default createExports()
fs.existsSync(resolve("lib")) && fs.rmSync(resolve("lib"), {recursive: true})
// export default {
// 	input: resolve("./src/index.ts"),
// 	output: {
// 		file: resolve(`lib/index.js`),
// 		format: "esm"
// 	},
// 	plugins: [
// 		nodeResolve(),
// 		typescript({
// 			compilerOptions: {
// 				lib: ["esnext", "dom"], target: "esnext",
// 				declaration: true,
// 				declarationMap: true,
// 				declarationDir: resolve("lib"),
// 				rootDir: resolve("src")
// 			},
// 			sourceMap: false,
// 		}),
// 		commonjs()
// 	]
// }
