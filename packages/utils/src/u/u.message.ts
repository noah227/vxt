import Tab = chrome.tabs.Tab;

type TSendMessageConfig = {
    message: object
    tab?: Tab
    cb?: Function
    errCb?: Function
}
/**
 * 发送消息通信 | 区别于chrome.runtime.sendMessage | 注意运行时环境是否有权限
 */
const sendMessage = ({message, tab, cb, errCb}: TSendMessageConfig) => {
    console.log(message, "SEND MESSAGE")
    try {
        if (tab && tab.id) sendMessageToTab({tabId: tab.id, cb})
        else {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                console.log("QUERY OK", tabs)
                if (tabs.length && tabs[0].id !== undefined) {
                    console.log(tabs[0].id, "<<<<")
                    sendMessageToTab({tabId: tabs[0].id, cb})
                }
            })
        }
    } catch (e) {
        console.log(e, "EEE")
        errCb && errCb(e)
    }
}
type TSendMessageToTabConfig = {
    tabId: number
    message?: object
    cb?: Function
}
/**
 * 向指定tabId发送通信 | 注意运行时环境是否有权限
 */
const sendMessageToTab = ({tabId, message, cb}: TSendMessageToTabConfig) => {
    chrome.tabs.sendMessage(tabId, message, (...args) => cb && cb(...args))
}

export default {
    sendMessage,
    sendMessageToTab
}
