<template>
  <div class="container">
    <wxc-overlay :show="show && hasOverlay"
                 v-if="show"
                 v-bind="mergeOverlayCfg"
                 v-on:wxcOverlayBodyClicking="wxcOverlayBodyClicking"
                 v-on:wxcOverlayBodyClicked="wxcOverlayBodyClicked"></wxc-overlay>
    <div ref="wxc-mask"
         class="wxc-mask"
         v-if="show"
         :hack="shouldShow"
         :style="maskStyle">
      <div :style="contentStyle">
        <slot></slot>
      </div>
      <div class="mask-bottom"
           :style="{ width: width + '%' }"
           @click="closeIconClicked"
           v-if="showClose">
        <img :src="closeIcon"
               class="mask-close-icon"></img>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    position: fixed;
    width: 100%;
    /*兼容H5异常*/
    z-index: 99999;
  }
  .wxc-mask {
    position: fixed;
    top: 150px;
    left: 30px;
    width: 351px;
    height: 400px;
  }
  .mask-bottom {
    width: 50px;
    height: 50px;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-box-align: center;
  }
  .mask-close-icon {
    width: 32px;
    height: 32px;
  }
</style>

<script>
    const icon = require('./icon.base64.js');
    import WxcOverlay from '../overlay/overlay';
    export default {
        components: { WxcOverlay },
        props: {
            height: {
                type: [String, Number],
                default: 400
            },
            width: {
                type: [String, Number],
                default: 90
            },
            show: {
                type: Boolean,
                default: false
            },
            showClose: {
                type: Boolean,
                default: false
            },
            duration: {
                type: [String, Number],
                default: 300
            },
            hasOverlay: {
                type: Boolean,
                default: true
            },
            hasAnimation: {
                type: Boolean,
                default: true
            },
            timingFunction: {
                type: Array,
                default: () => (['ease-in', 'ease-out'])
            },
            overlayCfg: {
                type: Object,
                default: () => ({
                    hasAnimation: true,
                    timingFunction: ['ease-in', 'ease-out'],
                    duration: 300,
                    opacity: 0.6
                })
            },
            borderRadius: {
                type: [String, Number],
                default: 0
            },
            overlayCanClose: {
                type: Boolean,
                default: true
            },
            maskBgColor: {
                type: String,
                default: '#ffffff'
            }
        },
        data: () => ({
            closeIcon: icon.closeIcon,
            maskTop: 264,
            opacity: 0
        }),
        computed: {
            mergeOverlayCfg () {
                return {
                    ...this.overlayCfg,
                    hasAnimation: this.hasAnimation
                };
            },
            maskStyle () {
                const { width, height, showClose, hasAnimation, opacity } = this;
                const newHeight = showClose ? height - 0 + 50 : height;
                const deviceHeight = document.documentElement.clientHeight;
                const deviceWidth = document.documentElement.clientWidth;
                const _deviceHeight = deviceHeight || 667;
                const pageHeight = _deviceHeight / deviceWidth * 375;
                return {
                    width: width + '%',
                    height: newHeight + 'px',
                    left: (100 - width) / 2 + '%',
                    top: (pageHeight - height) / 2 + 'px',
                    opacity: hasAnimation ? opacity : 1
                };
            },
            contentStyle () {
                return {
                    width: '100%',
                    backgroundColor: this.maskBgColor,
                    height: this.height + 'px',
                    borderRadius: this.borderRadius + 'px'
                };
            },
            shouldShow () {
                const { show, hasAnimation } = this;
                hasAnimation && setTimeout(() => {
                    this.appearMask(show);
                }, 50);
                return show;
            }
        },
        methods: {
            closeIconClicked () {
                this.appearMask(false);
            },
            wxcOverlayBodyClicking () {
                if (this.hasAnimation) {
                    this.appearMask(false);
                    this.$emit('wxcOverlayBodyClicking', {});
                }
            },
            wxcOverlayBodyClicked () {
                if (!this.hasAnimation) {
                    this.appearMask(false);
                    this.$emit('wxcOverlayBodyClicked', {});
                }
            },
            needEmit (bool = false) {
                !bool && (this.$emit('wxcMaskSetHidden', {}));
            },
            appearMask (bool, duration = this.duration) {
                const { hasAnimation, timingFunction } = this;
                const maskEl = this.$refs['wxc-mask'];
                if (hasAnimation && maskEl) {
                    maskEl.style.opacity = bool ? 1 : 0;
                    maskEl.style.transition = `all ${duration} ${timingFunction[bool ? 0 : 1]} 0`;
                } else {
                    this.needEmit(bool);
                }
            }
        }
    };
</script>
