<template>
    <div class="search">
        <div class="btn"
             @click="showCalendar">
          <p class="btn-txt">单程日历</p>
        </div>

        <div class="btn btn-margin yellow"
             @click="showReturnCalendar">
          <p class="btn-txt">往返日历</p>
        </div>

        <div class="panel">
          <p v-if="currentDate"
                class="text">当前日期: {{currentDate}}</p>
        </div>

        <div class="city-list">
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
    </div>
</template>

<script type="text/ecmascript-6">
import City from 'common/js/City';
import pageCalendar from 'base/page-calendar/index';
import ListView from 'base/listview/listview';
import {getCityList} from 'api/api';
// import {ERR_OK} from 'api/config';

const HOT_NAME = '热门';

export default {
    components: {
        pageCalendar,
        ListView
    },
    data: () => ({
        currentDate: '',
        selectedDate: ['2017-06-23', '2017-06-30'],
        isRange: true,
        calendarTitle: '选择日期',
        dateRange: ['2017-06-10', '2018-06-10'],
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
        cities: []
    }),
    methods: {
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
        showReturnCalendar () {
            this.isRange = true;
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
        }
    },
    created() {
        this._getCityList();
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/index';
    .search
        height: 100vh
    .city-list
        position: fixed
        height: 100%
        width: 100%
        top: 42px
</style>
