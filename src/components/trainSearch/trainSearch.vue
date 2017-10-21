<template>
    <div class="trainSearch">
        <div class="city-list" v-show="showCityList && chooseTo">
            <search-bar ref="wxc-searchbar"
                    theme="yellow"
                    v-on:searchbarInputOnInput="searchbarInputOnInput"></search-bar>
            <div class="city-list-wrapper">
                <list-view @select="selectCity" :data="cities" ref="tocitylist"></list-view>
                <ul class="search-city-list" v-show="searchCityValue.length>0">
                    <li v-for="item in searchCityList" class="list-group-item"  @click="selectCity(item)">
                        <span class="name">{{item.stationName}}</span>
                        <span class="code">{{item.statinCode}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="city-list" v-show="showCityList && chooseFrom">
            <search-bar ref="wxc-searchbar2"
                    theme="yellow"
                    v-on:searchbarInputOnInput="searchbarInputOnInput"
                    ></search-bar>
            <div class="city-list-wrapper">
                <list-view @select="selectFromCity" :data="cities" ref="fromcitylist"></list-view>
                <ul class="search-city-list" v-show="searchCityValue.length>0">
                    <li v-for="item in searchCityList" class="list-group-item" @click="selectFromCity(item)">
                        <span class="name">{{item.stationName}}</span>
                        <span class="code">{{item.stationCode}}</span>
                    </li>
                </ul>
            </div>
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
            <div class="search-btn">
                <button class="submit" @click="toSearch">开始搜索</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import pageCalendar from 'base/page-calendar/index';
    import ListView from 'base/listview/listview';
    import SearchBar from 'base/searchbar/searchbar';
    import City from 'common/js/City';
    import {getCityList} from 'api/api';
    import {formatDate} from 'common/js/date';
    import {mapMutations} from 'vuex';
    import * as types from 'store/mutation-type';
    import {ERR_OK} from 'api/config';
    const HOT_NAME = '热门';
    export default {
        components: {
            pageCalendar,
            ListView,
            SearchBar
        },
        data: () => ({
            currentDate: '',
            selectedDate: ['2017-10-13'],
            isRange: true,
            calendarTitle: '选择日期',
            dateRange: ['2017-10-10', '2018-10-10'],
            selectedNote: ['出发', '到达', '往返'],
            minibarCfg: {
                title: '日期选择'
            },
            descList: [],
            cities: [],
            allCitiesList: [], // 原始所有飞机城市列表
            showCityList: false,
            chooseTo: false,
            chooseFrom: false,
            searchCityValue: '', // 查询关键字
            toCity: {'ownCity': '上海', 'stationCode': 'SHA', 'stationName': '上海虹桥'},
            fromCity: {'ownCity': '北京', 'stationCode': 'PEK', 'stationName': '北京首都'},
            departureData: new Date()
        }),
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        methods: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date;
                this.currentDate = e.date[0];
                this.setDepartureData(e.date[0]);
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
                        if (response.messageCode === ERR_OK) {
                            var data = response.data;
                            this.allCitiesList = data;
                            this.cities = this._normalizeCity(data);
                            console.log(this.cities);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            _normalizeCity(list) {
                console.log(list);
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                list.forEach((item, index) => {
                    const cityInfo = new City(item.id, item.ownCity, item.stationCode, item.stationQuanPing, item.stationName.replace('国际机场', ''), item.stationDuanPing);
                    let HotCityArr = ['北京', '上海', '杭州', '广州', '深圳', '成都', '重庆', '厦门', '大连', '昆明', '武汉', '西安', '天津', '南京', '长沙'];
                    if (HotCityArr.indexOf(item.ownCity) >= 0) {
                        map.hot.items.push(cityInfo);
                    }
                    const key = item.stationDuanPing.slice(0, 1).toUpperCase();
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
                this.showCityList = false;
                this.chooseTo = false;
                this.toCity = city;
                this.setToCity(city);
            },
            selectFromCity(city) {
                console.log(city);
                this.showCityList = false;
                this.chooseFrom = false;
                this.fromCity = city;
                this.setFromCity(city);
            },
            showCity() {
                if (this.allCitiesList.length === 0) {
                    this._getCityList();
                }
                this.chooseTo = true;
                this.showCityList = true;
            },
            showFromCity() {
                if (this.allCitiesList.length === 0) {
                    this._getCityList();
                }
                this.chooseFrom = true;
                this.showCityList = true;
            },
            searchbarInputOnInput (e) {
                this.searchCityValue = e.value;
                console.log(e.value);
            },
            toSearch() {
                this.setFromCity(this.fromCity);
                this.setToCity(this.toCity);
                this.setDepartureData(this.currentDate);
                this.$router.push('/fight');
            },
            transCity() {
                var temp = this.toCity;
                this.toCity = this.fromCity;
                this.fromCity = temp;
            },
            ...mapMutations({
                setToCity: types.SET_TO_CITY,
                setFromCity: types.SET_FROM_CITY,
                setDepartureData: types.SET_DEPARTURE_DATA
            })
        },
        computed: {
            searchCityList: function () {
                var filterKey = this.searchCityValue && this.searchCityValue.toLowerCase();
                if (filterKey) {
                    var data = this.allCitiesList.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                        });
                    });
                    console.log(data);
                    return data;
                }
            },
            departureWeek: function () {
                var currentDate = this.currentDate;
                var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                if (currentDate === this.formatDate(new Date())) {
                    return '今天';
                } else {
                    return weekArr[new Date(currentDate).getDay()];
                }
            }
        },
        created() {
            this.currentDate = this.formatDate(new Date());
            this.selectedDate[0] = this.formatDate(new Date());
            this.dateRange[0] = this.formatDate(new Date());
            this.setDepartureData(this.formatDate(new Date()));
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/index';
    @import "~common/stylus/mixin";
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
    .trainSearch
        height: 100%
        .tabview-panel
            height: 100%
            background-color: $color-background-d
            &.horizontal-padding
                padding: 0 15px
            .city-wrapper
                position: relative
                .trans
                    position: absolute
                    right: 0
                    top: 25%
                    height: 50px
                    width: 50px
                    background: #fff url('./trans.png') 50% no-repeat;
                    background-size: 27px
                    transform: rotate(90deg)
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
                .week
                    font-size: 12px
                    color: #ccc
                    margin-left: 5px
                    margin-top: 5px
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
</style>
