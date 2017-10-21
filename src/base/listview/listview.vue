<template>
    <scroll class="listview"
        :data="data"
        ref="scroll"
        :listenScroll="listenScroll"
        @scroll="handleScroll"
        :probeType="probeType"
    >
        <!-- 注意这里在scroll下只有第一个是可以scroll的 -->
        <ul>
            <li class="list-group" :class="{hot: group.title==='热门'}" v-for="group in data" ref="left">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">                       
                        <span class="name">{{item.stationName}}</span>
                        <span class="code">{{item.stationCode}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut"
            @touchstart="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
            @touchend="onShortcutTouchEnd"
        >
            <ul>
                <li class="item"
                    :data-index="index"
                    v-for="(item, index) in shortcutList"
                    :class="{current: index===currentIndex}"
                >{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">
                {{fixedTitle}}
            </h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import {dataAttribute} from 'common/js/dom';

    const ANCHOR_HEIGHT = 18;
    const TITLE_HEIGHT = 30;

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                // scrollY是一切动画的驱动，有两种修改scrollY的方法
                //     1. 通过scroll组件的回调
                //     2. 当点击侧栏时，除了通过scrollToElement跳到不同的DOM之外，还要手动修改scrollY
                scrollY: -1,
                currentIndex: 0,
                diff: 0
            };
        },
        components: {
            Scroll,
            Loading
        },
        computed: {
            shortcutList() {
                return this.data.map(singer => {
                    return singer.title.slice(0, 1);
                });
            },
            shortcutListLength() {
                return this.shortcutList.length;
            },
            // fixedTitle既用来控制DOM的出现（v-show），也控制要显示的字符串是什么
            // 所以还是通过currentIndex来控制fixedTitle要显示的字符。
            fixedTitle() {
                if (this.scrollY > 0) {
                    return '';
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
            }
        },
        // 在created中初始化一些在这个组件中通用的变量
        created() {
            this.touch = {};
            this.listHeight = [];
            this.probeType = 3;
            this.listenScroll = true;
        },
        methods: {
            onShortcutTouchStart(e) {
                let index = dataAttribute(e.target, 'index');
                if (index == null) {
                    return;
                }
                console.log(index);
                // 转成数字
                index -= 0;
                this.touch.startY = e.touches[0].pageY;
                this.touch.startIndex = index;
                this._scrollToElement(index);
            },
            onShortcutTouchMove(e) {
                const {startY, startIndex} = this.touch;
                if (startY == null || startIndex == null) {
                    return;
                }
                const currentPageY = e.touches[0].pageY;
                const delta = Math.floor((currentPageY - startY) / ANCHOR_HEIGHT);
                const currentIndex = startIndex + delta;
                if (currentIndex < 0 || currentIndex >= this.shortcutListLength) {
                    return;
                }
                console.log(delta, currentIndex);
                this._scrollToElement(currentIndex);
            },
            onShortcutTouchEnd(e) {
                this.touch = {};
            },
            _scrollToElement(index) {
                console.log(index);
                if (index == null) {
                    return;
                }
                if (index < 0) {
                    index = 0;
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2;
                }
                const {scroll, left} = this.$refs;
                this.scrollY = -this.listHeight[index];
                scroll.scrollToElement(left[index], 0);
            },
            handleScroll(pos) {
                this.scrollY = pos.y;
            },
            _calculate() {
                this.listHeight = [];
                const {left} = this.$refs;
                let height = 0;
                this.listHeight.push(height);
                var _this = this;
                if (!left) {
                    setTimeout(() => {
                        _this._calculate();
                    }, 20);
                    return;
                }
                left.forEach(item => {
                    const currentHeight = item.clientHeight;
                    height += currentHeight;
                    this.listHeight.push(height);
                });
            },
            selectItem(item) {
                this.$emit('select', item);
            }
        },
        mounted() {
            setTimeout(() => {
                this._calculate();
            }, 20);
        },
        watch: {
            // 每次当data发生变化时，都重新计算一下每一块的高度
            // 当数据传来时也会重新计算一下
            data() {
                setTimeout(() => {
                    this._calculate();
                }, 20);
            },
            scrollY(newY) {
                // 滚动到最顶部
                if (newY > 0) {
                    this.currentIndex = 0;
                    return;
                }
                // 在中间部分滚动
                const listHeight = this.listHeight;
                const length = listHeight.length;
                for (let i = 0, len = length - 1; i < len; i++) {
                    const height1 = listHeight[i];
                    const height2 = listHeight[i + 1];
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }
                // 滚动到底部
                this.currentIndex = length - 2;
            },
            // 在scrollY变化的时候要计算一下diff一下，判断是不是要改变fixed这个DOM的样式
            diff(newDiff) {
                const fixedTop = (newDiff > 0 && newDiff < TITLE_HEIGHT) ? newDiff - TITLE_HEIGHT : 0;
                // 这里应该可以加一条，如果fixedTop = 0的话也应该返回
                if (this.fixedTop === fixedTop) {
                    return;
                }
                this.fixedTop = fixedTop;
                this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 0
            &.hot
                ul
                    display: flex
                    flex-direction: row
                    flex-wrap: wrap
                    padding-left: 9px
                    padding-top: 10px
                    .list-group-item
                        width: 73px
                        height: 32px
                        border: 1px solid rgb(224, 224, 224)
                        margin-right: 9px
                        flex-direction: column
                        align-items: center
                        justify-content: center
                        background-color: rgb(255, 255, 255)
                        -webkit-box-orient: horizontal
                        -webkit-box-direction: normal
                        -webkit-box-align: center
                        -webkit-box-pack: center
                        margin: 0 9px 9px 0
                        .name
                            font-size: 12px
                            margin-left: 0
                        .code
                            margin-top: 1px
                            margin-left: 0
                            color: rgb(153, 153, 153)
                            font-size: 10px
                            text-align: center
            .list-group-title
                border-bottom: 1px solid rgba(32, 35, 37, 0.15)
                height: 30px
                line-height: 30px
                padding-left: 11.5px
                font-size: $font-size-small
                color: #000
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 0 12px 0 12px
                background: $color-background-d
                border-bottom: 1px solid rgb(224, 224, 224);
                height: 46px;
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 5px
                    font-size: $font-size-medium
                .code
                    margin-left: 10px
                    font-size: $font-size-small
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 11.5px
                font-size: $font-size-small
                color: $color-text
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
