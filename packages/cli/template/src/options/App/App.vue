<template>
    <div id="options">
        <div>
            <strong id="title">this is options page</strong>
        </div>
        <img src="@/assets/logo.png" alt="">
        <ul>
            <li>
                <div>Development Guide</div>
                <ul>
                    <li>
                        <div>Google Chrome</div>
                        <ul>
                            <li>
                                <a href="https://github.com/GoogleChrome/developer.chrome.com" target="_blank">docs@github</a>
                                <span></span>
                            </li>
                            <li>
                                <a href="https://developer.chrome.com/docs/extensions" target="_blank">docs@website</a>
                                <span>access region limited</span>
                            </li>
                            <li>
                                <a href="https://github.com/GoogleChrome/chrome-extensions-samples" target="_blank">samples@github</a>
                                <span></span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div>Microsoft Edge</div>
                        <ul>
                            <li>
                                <a href="https://github.com/MicrosoftDocs/edge-developer"
                                   target="_blank">docs@github</a>
                                <span></span>
                            </li>
                            <li>
                                <a href="https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/"
                                   target="_blank">docs@website</a>
                                <span></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <div>FAQ</div>
                <ul>
                    <li>
                        <a href="https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/developer-guide/manifest-v3">MV3
                            Migration</a>
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

    a {
        color: dodgerblue;
    }

    a + span {
        margin-left: .5rem;
        color: #999;

        &:empty::before {
            content: ""
        }

        &:empty::after {
            content: ""
        }

        &::before {
            content: "("
        }

        &::after {
            content: ")"
        }
    }
}
</style>
