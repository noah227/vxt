<template>
	<div id="options">
		<div>
			<strong id="title">this is options page</strong>
		</div>
		<img src="@/assets/logo.png" alt="">
		<ul>
			<li>
				<div>options页面可以调用大部分chrome API的，这里可以看控制台输出。</div>
				<div>
					<span>更多的权限可以访问</span>
					<a href="https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html" target="_blank">【干货】Chrome插件(扩展)开发全攻略</a>
					<span>。</span>
					<span>这位园友写得挺详细的，虽然是MV2版本的，但是大多仍可作为参考。</span>
				</div>
			</li>
			<li>这里直接刷新页面就可以加载更改，因为是直接读取options.html的。</li>
			<li>当刷新页面时如果看到图标的变化，不要感到疑惑。这是因为在配置manifest.json图标和options图标不一样时的加载机制。</li>
			<li>
				<div>当这个页面因为CSP限制导致部分目的不能实现，可以考虑使用沙盒配合postMessage使用。</div>
				<div>沙盒大部分功能是受限的（尤其是API相关的），开发时注意控制台报错。部分支持需要通过manifest配置支持。</div>
				<div>后续或许会更新相关的示例或文章。</div>
			</li>
			<li>
				<div>关于官方文档</div>
				<ul>
					<li>
						<div>
							<span>官方文档的仓库在<a href="https://github.com/GoogleChrome/developer.chrome.com"
											 target="_blank">这里</a>。</span>
							<span>根据README里面的说明自己部署就好了（至少查询功能是好的）</span>
						</div>
						<div>
							<a href="https://github.com/GoogleChrome/developer.chrome.com" target="_blank">官方文档官网</a>的访问是需要魔法的。
						</div>
					</li>
					<li>
						<span>官方的示例扩展在<a href="https://github.com/GoogleChrome/chrome-extensions-samples">这里</a>。</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script lang="ts" setup>
import {onMounted} from "vue";

onMounted(() => {
	console.log(chrome)
})

</script>
<style lang="scss">
html, body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0
}

* {
	font-size: 1.05rem;
}

#options {
	width: 75%;
	text-align: center;
	margin: 0 auto;

	#title {
		font-size: 3rem;
		color: #0000;
		background-image: linear-gradient(90deg, pink, #FFC0CBa0, aqua, #00FFFF20);
		-webkit-background-clip: text;
	}

	li {
		text-align: left;
		line-height: 1.8;
	}
}
</style>
