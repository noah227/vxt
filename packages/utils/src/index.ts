import UMessage from "./u/u.message";
import UContextMenus from "./u/u.contextMenus";
import UReceiver from "./u/u.receiver";
import UWindowMessage from "./u/u.windowMessage";

export * from "./u/u.message"
export * from "./u/u.contextMenus"
export * from "./u/u.receiver"
export * from "./u/u.windowMessage"

/**
 * 注意调用时的运行时页面权限
 * 没有权限的页面调用可能会导致没有显式报错的插件异常
 * 而且仅仅是变量指向也会导致此异常，即使没有调用
 * 同时此异常会导致插件的功能异常
 * runtime context without required permission will cause exception
 * ------------------------
 * 没有./index.ts内全部权限接口的页面，直接从./u/*需要的子模块引入以避免权限导致的异常
 */
export default {
	...UMessage,
	...UContextMenus,
	...UReceiver,
	...UWindowMessage
}