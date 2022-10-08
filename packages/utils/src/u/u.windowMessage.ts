export type TWindowMessageConfig = {
	exec: string
	action: Function
}

const registerWindowMessages = (configList: TWindowMessageConfig[]) => {
	console.log(window, "<<<")
	// const actionMap = configList.reduce((data, {exec, action}) => {
	// 	data[exec] = action
	// 	return data
	// }, {} as {[index: string]: Function})
	// window.addEventListener("message", ({data}) => {
	// 	const exec = data.exec
	// 	if(exec){
	// 		const action = actionMap[exec]
	// 		action && action()
	// 	}
	// })
}

export default {
	registerWindowMessages
}