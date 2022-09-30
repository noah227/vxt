const path = require("path")
const {Extractor, ExtractorConfig} = require("@microsoft/api-extractor")

class ApiExtractor {
	constructor(context, libName) {
		this.libContext = path.resolve(context, libName)
		console.log("LIBCONTEXT>>>", this.libContext)
		this.pkg = require(path.resolve(this.libContext, "package.json"))
		this.libTypesEntry = this.pkg.types
	}

	extract() {
		if (!this.libTypesEntry) return 0
		const config = ExtractorConfig.loadFileAndPrepare(path.resolve(this.libContext, "api-extractor.json"))
		const result = Extractor.invoke(config, {
			localBuild: true,
			showVerboseMessages: true
		})
		if (result.succeeded) {

		}
	}
}

module.exports = {
	ApiExtractor
}