<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <!-- 动态设置这里的背景图片 -->
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length > 0" ref="playBtn">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll :data="songs"
            class="list"
            ref="scroll"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="handleScroll"
        >
            <div class="song-list-wrapper">
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
        props: {
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
            bgImage: {
                type: String,
                default: ''
            }
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.bgImage})`;
            }
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
        mounted() {
            const {scroll, bgImage} = this.$refs;
            const clientHeight = bgImage.clientHeight;
            this.clientHeight = clientHeight;
            // layer往上走最大的距离，如果比这个大就取这个，这是一个负数
            this.maxScrollHeight = -clientHeight + PRESERVE_HEIGHT;
            // 每个手机的宽度是不同的，宽度的70%也是不同的，
            // 所以要等DOM加载之后动态设置
            scroll.$el.style.top = `${clientHeight}px`;
        },
        methods: {
            handleScroll(pos) {
                this.scrollY = pos.y;
            },
            _setLayerStyle(y) {
                this.layer = this.layer || this.$refs.layer;
                this.layer.style[transform] = `translate3d(0, ${y}px, 0)`;
            },
            back() {
                this.$router.back();
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
        },
        watch: {
            scrollY(newY) {
                let translateY = Math.max(this.maxScrollHeight, newY);
                let zIndex = 0;
                let scale = 1;
                let blur = 0;
                const percent = Math.abs(newY / this.clientHeight);
                this.bgImageDom = this.bgImageDom || this.$refs.bgImage;
                this.filter = this.filter || this.$refs.filter;
                this.playBtn = this.playBtn || this.$refs.playBtn;
                this._setLayerStyle(translateY);
                if (newY > 0) {
                    scale = 1 + percent;
                    zIndex = 10;
                } else {
                    blur = Math.min(20 * percent, 20);
                }
                if (newY < this.maxScrollHeight) {
                    zIndex = 10;
                    this.bgImageDom.style['padding-top'] = 0;
                    this.bgImageDom.style['height'] = `${PRESERVE_HEIGHT}px`;
                    this.playBtn.style['display'] = 'none';
                } else {
                    this.bgImageDom.style['padding-top'] = '70%';
                    this.bgImageDom.style['height'] = 0;
                    this.playBtn.style['display'] = 'block';
                }
                this.bgImageDom.style.zIndex = zIndex;
                this.bgImageDom.style[transform] = `scale(${scale})`;
                this.filter.style[backdrop] = `blur(${blur}px)`;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/variable"
    @import "../../common/stylus/mixin"

    .music-list
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
            .song-list-wrapper
                padding: 20px 30px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
