<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="slideGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <div class="dot" :class="{active: index===currentPageIndex}" v-for="(dot, index) in dots" :key="index"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {addClass} from 'common/js/dom';
    export default {
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            };
        },
        mounted() {
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            if (this.autoPlay) {
                this._play();
            }

            window.addEventListener('resize', () => {
                if (!this.slider) {
                    return;
                }
                this._setSliderWidth(true);
                this.slider.refresh();
            });
        },
        destroyed() {
            window.clearTimeout(this.timer);
        },
        methods: {
            _setSliderWidth(isResize) {
                const {slider, slideGroup} = this.$refs;
                this.children = slideGroup.children;
                this.childrenLength = this.children.length;
                const sliderWidth = slider.clientWidth;
                let slideGroupWidth = 0;
                for (let i = 0, len = this.childrenLength; i < len; i++) {
                    const children = this.children[i];
                    addClass(children, 'slider-item');
                    children.style.width = sliderWidth + 'px';
                    slideGroupWidth += sliderWidth;
                }
                if (this.loop && !isResize) {
                    slideGroupWidth += 2 * sliderWidth;
                }
                slideGroup.style.width = slideGroupWidth + 'px';
            },
            _initSlider() {
                const {slider} = this.$refs;
                this.slider = new BScroll(slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                });
                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    if (this.loop) {
                        pageIndex -= 1;
                    }
                    this.currentPageIndex = pageIndex;
                    window.clearTimeout(this.timer);
                    this._play();
                });
            },
            _initDots() {
                this.dots = new Array(this.childrenLength);
            },
            _play() {
                let pageIndex = this.currentPageIndex + 1;
                if (this.loop) {
                    pageIndex += 1;
                }
                this.timer = window.setTimeout(() => {
                    // console.log(pageIndex);
                    this.slider.goToPage(pageIndex, 0, 400);
                }, this.interval);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                  display: block
                  width: 100%
                  overflow: hidden
                  text-decoration: none
                img
                  display: block
                  width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>
