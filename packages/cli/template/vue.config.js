const {defineConfig} = require('@vue/cli-service')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

/** 所有Vue打包入口 **/
const pageEntryDirs = ["options", "popup"]
const pages = pageEntryDirs.reduce((pages, dir) => {
    pages[dir] = {
        entry: `src/${dir}/main.ts`,
        template: `src/${dir}/index.html`,
        filename: `${dir}.html`
    }
    return pages
}, {})

/** 所有copy入口 **/
const createPluginItem = (from, to) => ({
    from: path.resolve(from),
    to: `${path.resolve("dist")}/${to}`	// 基于dist
})
const copyPlugins = []
switch (process.env.NODE_ENV) {
    case "development":
        copyPlugins.push(
            createPluginItem("src/manifest.dev.json", "manifest.json")
        )
        break
    case "production":
        copyPlugins.push(
            createPluginItem("src/manifest.prod.json", "manifest.json")
        )
        break
}
copyPlugins.push(
    createPluginItem("src/assets", "assets"),
    createPluginItem("src/_locales", "_locales"),
)

/** webpack entry **/
const webpackEntry = {
    service_worker: "./src/background/service-worker.ts",
    content: "./src/content/index.ts",
}

module.exports = defineConfig({
    transpileDependencies: true,
    pages,
    configureWebpack: {
        devtool: false,
        entry: webpackEntry,
        output: {
            filename: "js/[name].js"
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: copyPlugins
            }),
            // About Bundler Build Feature Flags, see https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
            })
        ]
    },
    chainWebpack: config => {
        // config.plugin("copy").use(require("copy-webpack-plugin"), [copyPlugins])
    }
})
