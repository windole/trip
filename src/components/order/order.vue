<template>
    <div class="order">
        <div class="wrapper">
            <div class="btn btn-margin yellow" @click="openNoAnimationMask">
              <p class="btn-txt">点击弹出无动画面板</p>
            </div>
            <wxc-mask height="400"
                      width="351"
                      overlay-opacity="0.6"
                      border-radius="0"
                      duration="200"
                      mask-bg-color="#FFFFFF"
                      :overlay-can-close="overlayCanClose"
                      :has-animation="hasAnimation"
                      :has-overlay="hasOverlay"
                      :show-close="showClose"
                      v-on:wxcMaskSetHidden="wxcMaskSetHidden"
                      :show="show">
              <div class="content">
                <div class="demo-title">
                  <p class="title">Weex帮助你构建原生应用</p>
                </div>
                <p class="content-text">
                  与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript
                  可以构建原生应用，上手非常简单。但实际上，应用的底层是 Objective-C 或 Java， 同时，Weex 提供很多 native 组件或模块供开发人员使用。
                </p>
              </div>
            </wxc-mask>
          </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import WxcMask from 'base/mask/mask.vue';
    export default {
        data () {
            return {
                show: false,
                showClose: true,
                hasOverlay: true,
                overlayCanClose: true,
                isFalse: false,
                hasAnimation: true
            };
        },
        components: {
            WxcMask
        },
        methods: {
            openMask (e) {
                this.show = true;
                this.hasAnimation = true;
            },
            wxcMaskSetHidden () {
                this.show = false;
            },
            openNoAnimationMask (e) {
                this.show = true;
                this.hasAnimation = false;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .order
        height: 100vh
        .wrapper
            height: 100vh
</style>
