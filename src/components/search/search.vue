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
        <div class="city-list" v-show="showCityList">
            <search-bar ref="wxc-searchbar"
                    theme="yellow"
                    v-on:searchbarCancelClick="searchbarCancelClick"
                    v-on:searchbarInputOninput="searchbarInputOninput"
                    v-on:searchbarCloseClick="searchbarCloseClick"
                    v-on:searchbarInputOnfocus="searchbarInputOnfocus"
                    v-on:searchbarInputOnblur="searchbarInputOnblur"></search-bar>
            <list-view @select="selectCity" :data="cities" ref="list"></list-view>   
        </div>

        <page-calendar :date-range="dateRange"
                           :selected-date="selectedDate"
                           :selected-note="selectedNote"
                           :is-range="isRange"
                           :minibar-cfg="minibarCfg"
                           :desc-list="descList"
                           v-on:wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                           v-on:wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
                           ref="wxcPageCalendar"></page-calendar>
        <div class="main-bg">
            <div class="fightSearch">
                <div class="tabview-panel horizontal-padding">
                    <div class="city-wrapper">
                        <div class="from-city cell-inner" @click="showCity">
                            <div class="gray-tit">出发城市</div>
                            <div class="text">上海</div>
                        </div>
                        <div class="to-city cell-inner" @click="showCity">
                            <div class="gray-tit">到达城市</div>
                            <div class="text">北京</div>
                        </div>
                        <div class="trans"></div>
                    </div>
                    <div class="date-wrapper cell-inner" @click="showCalendar">
                        <div class="gray-tit">出发日期</div>
                        <div class="text data">{{currentDate}}</div>
                        <div class="week">今天</div>
                    </div>
                    <div class="type-choose cell-inner" @click="showPicker(0)" ref="select0">
                        <div class="gray-tit">舱位选择</div>
                        <div class="text"></div>
                    </div>
                    <picker @select="handleSelect(0,arguments)" :selected-index="selectedIndex[0]"
              ref="picker0" ></picker>
                    <div class="search-btn">
                        <button class="submit" @click="toSearch">开始搜索</button>
                    </div>
                </div>
                <section class="bottom-menu-wrapper">
                    <ul class="list">
                        <li class="item">
                            <div>
                                <i class="icon icon-index" ></i>
                                <p class="title">首页</p>
                            </div>
                        </li>
                        <li class="item">
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
            <div class="trainSearch">
                <div class="btn"
                     @click="showCalendar">
                  <p class="btn-txt">单程日历</p>
                </div>

                 <div class="btn btn-margin yellow"
                     @click="showCity">
                  <p class="btn-txt">城11111市</p>
                </div>

                <div class="panel">
                  <p v-if="currentDate"
                        class="text">当前日期: {{currentDate}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import slider from 'base/slider/slider';
    import Tab from 'components/tab/tab';
    import pageCalendar from 'base/page-calendar/index';
    import ListView from 'base/listview/listview';
    import SearchBar from 'base/searchbar/searchbar';
    import Picker from 'base/picker/picker';
    import City from 'common/js/City';
    import {getCityList} from 'api/api';
    // import {ERR_OK} from 'api/config';
    const HOT_NAME = '热门';
    let data1 = [
        {text: '经济舱', value: 1},
        {text: '头等舱', value: 2}
    ];
    export default {
        components: {
            slider,
            Tab,
            pageCalendar,
            ListView,
            SearchBar,
            Picker
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
            ],
            currentDate: '2017-10-13',
            selectedDate: ['2017-10-13', '2017-10-18'],
            isRange: true,
            calendarTitle: '选择日期',
            dateRange: ['2017-10-10', '2018-10-10'],
            selectedNote: ['出发', '到达', '往返'],
            minibarCfg: {
                title: '日期选择'
            },
            descList: [
                { date: '2017-06-23', value: '￥200' },
                { date: '2017-06-24', value: '￥200' },
                { date: '2017-06-25', value: '￥200' },
                { date: '2017-06-26', value: '￥200' },
                { date: '2017-06-27', value: '￥222' },
                { date: '2017-06-28', value: '￥341' },
                { date: '2017-06-29', value: '￥230' },
                { date: '2017-06-30', value: '￥2000' }
            ],
            cities: [],
            showCityList: false,
            value: '',
            data: [[data1]],
            selectedIndex: [[0], [1, 0], [0, 1, 2], [0, 0, 0]]
        }),
        methods: {
            showPicker(index) {
                let picker = this.$refs['picker' + index];

                picker.show();
            },
            handleSelect(index, arg) {
                console.log(arg);
            },
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date;
                this.currentDate = e.date;
            },
            wxcPageCalendarBackClicked () {
            },
            showCalendar () {
                this.isRange = false;
                setTimeout(() => {
                    this.$refs['wxcPageCalendar'].show();
                }, 10);
            },
            _getCityList() {
                getCityList()
                    .then(response => {
                        this.cities = this._normalizeCity(response.stations.station);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            _normalizeCity(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                list.forEach((item, index) => {
                    const cityInfo = new City(item.code, item.quanpin, item.name, item.duanpin);
                    let HotCityArr = ['北京', '上海', '杭州', '广州', '深圳', '成都', '重庆', '厦门', '大连', '昆明', '武汉', '西安', '天津', '南京', '长沙'];
                    if (HotCityArr.indexOf(item.name) >= 0) {
                        map.hot.items.push(cityInfo);
                    }
                    const key = item.duanpin.slice(0, 1).toUpperCase();
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        };
                    }
                    map[key].items.push(cityInfo);
                });
                // 按照一定的顺序排一下
                let hot = [];
                let other = [];
                const keys = Object.keys(map);
                keys.forEach(key => {
                    const {title, items} = map[key];
                    if (/[A-Za-z]/.test(title)) {
                        other.push({
                            title,
                            items
                        });
                    } else if (title === HOT_NAME) {
                        hot.push({
                            items,
                            title
                        });
                    }
                });
                other.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });
                return hot.concat(other);
            },
            selectCity(city) {
                console.log(city);
                this.showCityList = false;
            },
            showCity() {
                this.showCityList = true;
            },
            setValue () {
                this.$refs['wxc-searchbar'].setValue('点击了手动设置输入框内容的开关');
            },
            searchbarInputOnfocus () {
                console.log({ 'message': 'onfocus', 'duration': 1 });
            },
            searchbarInputOnblur () {
                console.log({ 'message': 'onbulr', 'duration': 1 });
            },
            searchbarCloseClick () {
                console.log({ 'message': 'close.click', 'duration': 1 });
            },
            searchbarInputOninput (e) {
                this.value = e.value;
            },
            searchbarCancelClick () {
                console.log({ 'message': 'cancel.click', 'duration': 1 });
            },
            searchbarInputDisabledOnclick () {
                console.log({ 'message': 'input.onclick', 'duration': 1 });
            },
            searchbarDepChooseClick () {
                console.log({ 'message': 'dep.choose.click', 'duration': 1 });
            },
            toSearch() {
                this.$router.push('/fight');
            }
        },
        created() {
            this._getCityList();
        },
        mounted() {
            this.$refs.picker0.setData([data1]);
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/index';
    @import "~common/stylus/mixin";
    .search
        height: 100vh
        .city-list
            position: fixed
            height: 100%
            width: 100%
            top: 0
            z-index: 100
        .main-bg
            .fightSearch
                height: 100%
                .tabview-panel
                    height: 100%
                    background-color: $color-background-d
                    &.horizontal-padding
                        padding: 0 15px
                    .cell-inner
                        height:50px
                        line-height: 50px
                        font-size: 18px
                        display: flex
                        align-items: center;
                        border-bottom: 1px solid $color-underline
                        .gray-tit
                            font-size: 15px
                            color: $color-text-d
                            margin-right: 38px
                    .search-btn
                        padding: 20px 0
                        .submit
                            height: 42px
                            width: 100%
                            box-sizing: border-box
                            border-radius: 3px
                            border: 1px solid $color-theme-d
                            background: $color-theme-d
                            line-height: 42px
                            color: #fff
                            font-size: 18px
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
            .trainSearch
                display: none
    .slide-enter-active, .slide-leave-active
        transition: all .8s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
