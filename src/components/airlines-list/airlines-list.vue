<template>
    <div class="airlines-list">
        <scroll :data="songs"
            class="list"
            ref="scroll"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="handleScroll"
        >
            <div class="airlines-list-wrapper">
                <song-list :songs="songs" @select="handleSelectMusic"></song-list>
            </div>
            <div class="loading-container" v-show="!songs.length"></div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll';
    import SongList from 'base/song-list/song-list';
    import Loading from 'base/loading/loading';
    import {prefixStyle} from 'common/js/dom';
    import {mapActions} from 'vuex';

    const PRESERVE_HEIGHT = 40;
    const transform = prefixStyle('transform');
    const backdrop = prefixStyle('backdrop-filter');

    export default {
        data() {
            return {
                scrollY: 0
            };
        },
        components: {
            SongList,
            Scroll,
            Loading
        },
        created() {
            // console.log(this.songs.length);
            // this.
            this.probeType = 3;
            this.listenScroll = true;
            this.haveSetBgImage = false;
            this.lastY = 0;
        },
        methods: {
            handleScroll(pos) {
                this.scrollY = pos.y;
            },
            handleSelectMusic(song, index) {
                // console.log(song, index);
                this.selectPlay({
                    list: this.songs,
                    index: index
                });
            },
            ...mapActions([
                'selectPlay'
            ])
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/variable"
    @import "../../common/stylus/mixin"

    .airlines-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50
            .icon-back
                display: block
                padding: 10px
                font-size: $font-size-large-x
                color: $color-theme
        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text
        .bg-image
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover
            .play-wrapper
                position: absolute
                bottom: 20px
                z-index: 50
                width: 100%
                .play
                    box-sizing: border-box
                    width: 135px
                    padding: 7px 0
                    margin: 0 auto
                    text-align: center
                    border: 1px solid $color-theme
                    color: $color-theme
                    border-radius: 100px
                    font-size: 0
                    .icon-play
                        display: inline-block
                        vertical-align: middle
                        margin-right: 6px
                        font-size: $font-size-medium-x
                    .text
                        display: inline-block
                        vertical-align: middle
                        font-size: $font-size-small
            .filter
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(7, 17, 27, 0.4)
        .bg-layer
            position: relative
            height: 100%
            background: $color-background
        .list
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            background: $color-background
            .airlines-list-wrapper
                padding: 20px 30px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
