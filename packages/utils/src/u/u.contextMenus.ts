type TContextMenuAction = (
	info: chrome.contextMenus.OnClickData,
	tab: chrome.tabs.Tab | undefined,
	menuItem: TContextMenuConfig
) => void | undefined
export type TContextMenuConfig = chrome.contextMenus.CreateProperties & {
	action?: TContextMenuAction
}

/**
 * 创建右键菜单
 * @desc 注意运行时环境是否有权限
 */
const createContextMenus = (configList: TContextMenuConfig[]) => {
	const menuMap = configList.reduce((data, {id, action}, index) => {
		configList[index].id = id = id || `ctx-${index}-${Math.random().toString(16).slice()}`
		data[id] = configList[index]
		return data
	}, {} as { [index: string]: TContextMenuConfig })
	chrome.contextMenus.removeAll(() => {
		configList.map(config => {
			const actionTemp = config.action
			delete config.action
			chrome.contextMenus.create(config)
			config.action = actionTemp
		})
		chrome.contextMenus.onClicked.addListener((info, tab) => {
			const menuItem = menuMap[info.menuItemId]
			const action = menuItem.action
			action && action(info, tab, menuItem)
		})
	})
}

export default {
	createContextMenus
}