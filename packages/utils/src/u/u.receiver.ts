type TReceiverAction = (message?: any, sender?: chrome.runtime.MessageSender, sendResponse?: (response?: any) => void) => void
export type TReceiverConfig = {
	exec: string
	action: TReceiverAction
}
/**
 * 创建接收端 | 暂时不能调用，会造成运行时错误（不会出现在插件错误捕获里）
 */
export const registerReceivingEnd = (configList: TReceiverConfig[]) => {
	const actionMap = configList.reduce((data, {exec, action}) => {
		data[exec] = action
		return data
	}, {} as { [index: string]: TReceiverAction })
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		const exec = message.exec
		const action = actionMap[exec]
		action && action(message, sender, sendResponse)
	})
}

export default {
	registerReceivingEnd
}