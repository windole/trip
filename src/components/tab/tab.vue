<template>
    <div class="tab">
        <div class="tab-item" @click="chooseFight" :class="{active : currentTab === 'fight'}">
            <i class="icon fight-icon"></i><span class="tab-link">国内机票</span>
        </div>
        <div tag="div" class="tab-item" @click="chooseTrain" :class="{active : currentTab === 'train'}">
            <i class="icon train-icon"></i><span class="tab-link">火车票</span>
        </div>
        <div class="m-tabview-indicator" ref="tabviewIndicator"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from 'common/js/dom';

const transform = prefixStyle('transform');
export default {
    data() {
        return {
            currentTab: 'fight'
        };
    },
    methods: {
        chooseTrain() {
            this.currentTab = 'train';
            let x = 230;
            this.$refs.tabviewIndicator.style[transform] = `translate3d(${x}px, 0, 0)`;
        },
        chooseFight() {
            this.currentTab = 'fight';
            let x = 45;
            this.$refs.tabviewIndicator.style[transform] = `translate3d(${x}px, 0, 0)`;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .tab
        display: flex
        height: 44px
        line-height: 44px
        font-size: $font-size-medium
        background-color: $color-background-d
        position: relative
        border-bottom: 1px solid $color-underline
        .tab-item
            flex: 1
            text-align: center
            position: relative
            .icon
                display: inline-block
                width: 16px
                height: 18px
                background-size: contain
                background-repeat: no-repeat
                vertical-align: middle
                margin-right: 5px
                &.fight-icon
                    bg-image('air')
                &.train-icon
                    bg-image('train')
            &.active
                .fight-icon
                    bg-image('air-active')
                .train-icon
                    bg-image('train-active')
            .tab-link
                padding-bottom: 5px
                color:$color-text
        &.selected
            .tab-link
                color: $color-theme
                border-bottom: 2px solid $color-theme
        .m-tabview-indicator
            position: absolute
            left: 0
            bottom: 0
            height: 3px
            transform: translate3d(45px, 0px, 0px)
            width: 100px
            transition: -webkit-transform 0.2s ease-in-out, width 0.1s ease-out
            transform-origin: center center 0px
            &:after
                position: absolute
                height: 3px
                background: #ffc900
                bottom: 0
                left: 0
                right: 0
                content: ""
                display: block
</style>
