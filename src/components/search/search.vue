<template>
    <div class="search">
        <div class="slider-wrapper">
            <slider>
                <div>
                    <a>
                        <img class="needsclick" src="../../common/image/banner.png" alt="">
                    </a>
                </div>
                <div>
                    <a>
                        <img class="needsclick" src="../../common/image/banner.png" alt="">
                    </a>
                </div>
            </slider>
        </div>
        <tab></tab>
        <div class="main-bg">
            <!-- <div class="fightSearch">
                <div class="tabview-panel horizontal-padding">
                    <div class="city-wrapper">
                        <div class="to-city cell-inner" @click="showFromCity">
                            <div class="gray-tit">出发城市</div>
                            <div class="text" ref="fromCity">{{fromCity.stationName}}</div>
                        </div>
                        <div class="from-city cell-inner" @click="showCity">
                            <div class="gray-tit">到达城市</div>
                            <div class="text" ref="toCity">{{toCity.stationName}}</div>
                        </div>
                        <div class="trans" @click="transCity"></div>
                    </div>
                    <div class="date-wrapper cell-inner" @click="showCalendar">
                        <div class="gray-tit">出发日期</div>
                        <div class="text data">{{currentDate}}</div>
                        <div class="week">{{departureWeek}}</div>
                    </div>
                    <div class="type-choose cell-inner" @click="showPicker(0)" ref="select0">
                        <div class="gray-tit">舱位选择</div>
                        <div class="text">{{selectedTypeText[0]}}</div>
                    </div>
                    <picker @select="handleSelect(0,arguments)" :selected-index="selectedIndex[0]"
              ref="picker0" ></picker>
                    <div class="search-btn">
                        <button class="submit" @click="toSearch">开始搜索</button>
                    </div>
                </div>
            </div> -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <section class="bottom-menu-wrapper">
            <ul class="list">
                <li class="item">
                    <div>
                        <i class="icon icon-index" ></i>
                        <p class="title">首页</p>
                    </div>
                </li>
                <li class="item" @click="toOrderList">
                    <div>
                        <i class="icon icon-order" ></i>
                        <p class="title">订单·退票</p>
                    </div>
                </li>
                <li class="item">
                    <div>
                        <i class="icon icon-help" ></i>
                        <p class="title">我的客服</p>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import slider from 'base/slider/slider';
    import Tab from 'components/tab/tab';
    // import pageCalendar from 'base/page-calendar/index';
    // import ListView from 'base/listview/listview';
    // import SearchBar from 'base/searchbar/searchbar';
    // import Picker from 'base/picker/picker';
    // import City from 'common/js/City';
    // import {getCityList} from 'api/api';
    // import {formatDate} from 'common/js/date';
    // import {mapMutations} from 'vuex';
    // import * as types from 'store/mutation-type';
    // import {ERR_OK} from 'api/config';
    export default {
        components: {
            slider,
            Tab
        },
        data: () => ({
            banners: [
                {
                    'linkUrl': 'http://y.qq.com/w/album.html?albummid=00308L1I2cWBjS',
                    'picUrl': 'http://y.gtimg.cn/music/photo_new/T003R720x288M000003dHp2l2mduN0.jpg',
                    'id': 12460
                },
                {
                    'linkUrl': 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2266195&g_f=shoujijiaodian',
                    'picUrl': 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000gcRyz0Z3ZcI.jpg',
                    'id': 12439
                }
            ]
        }),
        methods: {
            toOrderList() {
                this.$router.push('/order-list');
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/index';
    @import "~common/stylus/mixin";
    .search
        height: 100%
        width: 100%
        overflow: hidden
        .city-list
            position: fixed
            top: 0
            bottom: 0
            right: 0
            left: 0
            z-index: 100
            .city-list-wrapper
                position: absolute
                top: 42px
                bottom: 0
                left: 0
                right: 0
                .search-city-list
                    position: absolute
                    top: 0
                    bottom: 0
                    left: 0
                    right: 0
                    z-index: 101
                    background-color: #fff
                    overflow-y: auto
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
        .bottom-menu-wrapper
            position: fixed
            bottom: 0
            left: 0
            width: 100%
            height: 50px
            font-size: 10px
            line-height: 1.3
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            z-index: 10
            .list
                height: 100%
                background-color: #fff
                position: relative
                display: flex
                align-items: center
                justify-content: space-around
                .item
                    text-align: center
                    position: relative
                    flex: 1
                    .icon
                        display: inline-block
                        width: 22px
                        height: 22px
                        background: no-repeat 50%
                        background-size: contain
                        &.icon-index
                            bg-image('icon-index')
                        &.icon-order
                            bg-image('icon-order')
                        &.icon-help
                            bg-image('icon-help')
    .slide-enter-active, .slide-leave-active
        transition: all .8s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
