<template>
    <div class="fight">
        <ul class="list-date">
            <li class="yesterday J_yesterday a" :class="prevCls">
                <div class="iconfont"></div>
                <div class="content">
                    <div role="link" @click="prevDay">前一天</div>
                </div>
            </li>
            <li class="today J_today J_cheapCalendar" @click="showCalendar">
                <div class="today-box">
                    <div class="today-box-left">
                        <div class="date">{{departureData}} {{departureWeek}}</div>
                    </div>
                    <div class="down">
                        <img width="30" height="30" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABOCAMAAACAE2F0AAAA8FBMVEX////9+/r+/v79/Pfh4eH+/fzynCDynB31oir0oCj0oCPylRL0pzTynBjymBX73av78+r51qD3xXb97dDylhX0oyb87tz3ul35yX3znSLylA78+vf9+/XymhzymBr8+PL97ND74bf0qTf4vWD2uFrypCz87tv1rED0qTv0pjH8+vT60ZH3wWn2r0T9/fr88OH77dX96sz747z5x3f5zYX5zIL4xG/1sEr89u375cH3sk399+v99ef637L73bD61Z360pr3t1X3tVDwjQfpiQf51qT3vmXyoyvylxL76tP858b626j5z4v3wXL77tb78eeKMzs4AAADS0lEQVRYw+2YeXOaQBjGH6DLcijGVE0AQUFR8L6PxFiT5j7a7/9tukTb+o8GaGfSw9+MA8/O8PN9Z1dcwIE/kg8H4UH4vwl58CHs5HveDPDJhYTjyLYwzGz4fVsOGyXcKyDlT5kuwK3pAIuLmy9sOEzrWmO23Ghp0gpbl2Xv9OOjpBUKDZRcKlYAU3jNJvByL6dqaAhxKiTga+Ozab3tNTFzbesKGHrter0dMHVL1ZUylgGL7duBCRJBaKJ0GlDbotdjnPuWdQmcXIuUip/rwCSny2VkP9uWnVaqBZgRhAKOfOpJ+pawek3TaXodCrW1MK1LnnhXRjGCsIOjFJXu/DN39b3lsXs1nV65LaBlhC1f+NM6+0qpDCGCkGNCi9adDooo+XY4KeTHwn5RdbeAIvj5GVXE6EKqVTkwzKHo3mz/Up5S+uksPCHHWiyhekJKs4bQ6GWcriCUNghC18l8YcOlEjlV88rHyEJRreANxkYcIbUvC4VagX16PXbY8DPXaoWJpsQQpqUIiHGEniyKurgTXRfzEo0htLw8fQPlLk6FVPGP9zNsi/p7zrKYOwF47CPeOqS5KiEcWSMUi0WOxSJjE03CFrYSt0KC3fBhhYmEBI2+4wxqQHfuOI/nMPsDZ/CQXGii12b3wgkw0nNW4KDQttK00sEwsbAvUs84A1qGpGg3eJBsT20nFwroW3lfmwK39ykvl0VZ1/10ncNx4grLsqF+vgReDNWwn9ALWJwmr7CDxahSvc0CF62TyrCM82cWVyRJhRzP2LFqEs3y+r/89wl3QUISCR8/NZtPCxxlms3VHOizeNMFSV7hRDVUaYB+yjDUCnCqqfd5B1xCYRWoqoFsX2BOlVQuXNhqIKkZFH9BeJ/aCN21MLUWJm/ZMAyZtRywI4tD1TBEB2Zy4fx5NPrUxSI7Gj8PgMcmi0knhd1g2TU74RkJbrAcYbBLydaRfwWEJGiZYxvfHQimGbdlOn3AXroVK+ruq4OvgS0HrVV2HxNX1uVoFQo4d9lWxMpp+7BkSZSibYlNzC51OQK634u0aSfgnCvR1rT0PjTbdpszcNEefMz+cpl5g+VysCDg3+nhkYRr7Q02j2b/2CuCg/Ag/GuFB36Rb669dbaRcSblAAAAAElFTkSuQmCC">

                    </div>
                </div>
            </li>
            <li class="tomorrow J_tomorrow a">
                <div class="content">
                    <div role="link" @click="nextDay">后一天</div>
                </div>
                <div class="iconfont"></div>
            </li>
        </ul>
        <scroll :data="citylines" class="main-wrapper">
            <ul class="flight-list-wrapper">
                <li class="flight-list-item" v-for="cityline in fliterFightList" @click="chooseSeats(cityline)">
                    <a class="flight-item flight-item-ow" href="javascript:void(0);">
                        <div class="core-info-wrapper">
                            <!--左侧区域-->
                            <div class="airline-left" aria-hidden="true">
                                <div class="airline-bd">
                                    <div class="airline-time">
                                        <div class="dep">{{cityline.depTime}}</div>
                                        <div class="arr">{{cityline.orgStationName.replace('机场', '').replace('国际', '')}}</div>
                                    </div>
                                    <div class="airline-icon">
                                    </div>
                                    <div class="airline-airport">
                                        <div class="dep">{{cityline.arriTime}}<em v-show="cityline.depTime > cityline.arriTime">+1天</em></div>
                                        <div class="arr">{{cityline.dstStationName.replace('机场', '').replace('国际', '')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="airline-price" aria-hidden="true">
                                <div class="price">
                                    <div class="price-info">{{cityline.price}}</div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div class="airline-activity-wrapper clearfix">
                            <div class="airline-hd fl">
                                <span :class="addAirCla(cityline.flightCompanyCode)"><i class="flag-icon"></i></span>{{cityline.flightCompanyName}}{{cityline.flightNo}} | 机型:{{cityline.planeType}}
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="loading-container" v-show="!citylines.length">
                <loading title='正在查询中'></loading>
            </div>
        </scroll>
        <ul class="list-bottombar">
            <li class="J_sort price-filter" @click="sortBy('price')" :class="[sortOrders['price'] > 0 ? 'filter-down' : 'filter-up', { filter_current : sortKey == 'price'}]">
                <div class="text" v-if="sortKey !== 'price'">价格排序</div>
                <div class="text" v-if="sortOrders['price'] > 0">价格低到高<span class="icon"></span></div>
                <div class="text" v-else>价格高到低<span class="icon"></span></div>
            </li>
            <li class="J_sort J_time_filter time-filter" @click="sortBy('depTime')"  :class="[sortOrders['depTime'] > 0 ? 'filter-down' : 'filter-up', { filter_current : sortKey == 'depTime'}]">
                <div class="text" v-if="sortKey !== 'depTime'">时间排序</div>
                <div class="text" v-if="sortOrders['depTime'] > 0">时间早到晚<span class="icon"></span></div>
                <div class="text" v-else>时间晚到早<span class="icon"></span></div>
            </li>
        </ul>

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
    import pageCalendar from 'base/page-calendar/index';
    import {getAirLines} from 'api/api';
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import {formatDate} from 'common/js/date';
    import {ERR_OK} from 'api/config';
    import {mapGetters, mapMutations} from 'vuex';
    import * as types from 'store/mutation-type';
    export default {
        components: {
            pageCalendar,
            Scroll,
            Loading
        },
        data: function () {
            var sortOrders = {};
            var columnsArr = ['price', 'depTime'];
            columnsArr.forEach(function (key) {
                sortOrders[key] = 1;
            });
            return {
                currentDate: '2017-10-13',
                selectedDate: ['2017-10-13'],
                isRange: true,
                calendarTitle: '选择日期',
                dateRange: ['2017-10-10', '2018-10-10'],
                selectedNote: ['出发', '到达', '往返'],
                minibarCfg: {
                    title: '日期选择'
                },
                descList: [],
                citylines: [],
                sortKey: 'price',
                sortOrders: sortOrders
            };
        },
        methods: {
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date;
                this.currentDate = e.date[0];
                this.setDepartureData(e.date[0]);
                this._getAirLines();
            },
            wxcPageCalendarBackClicked () {
            },
            showCalendar () {
                this.isRange = false;
                setTimeout(() => {
                    this.$refs['wxcPageCalendar'].show();
                }, 10);
            },
            _getAirLines() {
                this.citylines = [];
                getAirLines(this.fromCity.stationCode, this.toCity.stationCode, this.departureData)
                    .then(response => {
                        if (response.msgCode === ERR_OK) {
                            // this.citylines = response.data.airlines_list_response.airlines.airline;
                            this.citylines = response.data;
                            console.log(response);
                        } else {
                            this.$dialog.alert({mes: response.msg});
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            addAirCla(flightCompanyCode) {
                let code = flightCompanyCode;
                return `ne-flag-${code}`;
            },
            chooseSeats(cityline) {
                this.setAirline(cityline);
                this.$router.push('/reserve');
            },
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            prevDay () {
                var curDate = new Date(this.departureData);
                if (this.departureData === this.formatDate(new Date())) {
                    return;
                }
                var preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
                setTimeout(() => {
                    this.setDepartureData(this.formatDate(preDate));
                    this._getAirLines();
                }, 20);
            },
            nextDay () {
                var curDate = new Date(this.departureData);
                var nextDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000);
                console.log(nextDate);
                setTimeout(() => {
                    this.setDepartureData(this.formatDate(nextDate));
                    this._getAirLines();
                }, 20);
            },
            sortBy: function (key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
            },
            ...mapMutations({
                setAirline: types.SET_AIRLINE,
                setDepartureData: types.SET_DEPARTURE_DATA
            })
        },
        computed: {
            prevCls: function () {
                return {
                    'disable': this.departureData === this.formatDate(new Date())
                };
            },
            fliterFightList: function () {
                var sortKey = this.sortKey;
                var order = this.sortOrders[sortKey] || 1;
                if (sortKey) {
                    var data = this.citylines.slice().sort(function (a, b) {
                        a = a[sortKey];
                        b = b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order;
                    });
                    console.log(data);
                    return data;
                }
            },
            departureWeek: function () {
                var currentDate = this.departureData;
                console.log(currentDate);
                var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                if (currentDate === this.formatDate(new Date())) {
                    return '今天';
                } else {
                    return weekArr[new Date(currentDate).getDay()];
                }
            },
            ...mapGetters([
                'departureData',
                'fromCity',
                'toCity'
            ])
        },
        created() {
            this.currentDate = this.departureData;
            this.selectedDate[0] = this.departureData;
            this.dateRange[0] = this.formatDate(new Date());
            this._getAirLines();
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index';
@import '~common/stylus/variable';
@import "~common/stylus/mixin";
.fight
    min-width: 320px
    -webkit-box-orient: vertical
    display: -webkit-box
    height: 100%
    .list-date
        display: -webkit-box
        padding: 0
        background: $color-theme-d
        color: $color-background-d
        font-size: 12px
        text-align: center
        height: 46px
        line-height: 46px
        position: relative
        z-index: 10
        li
            display: -webkit-box
        .iconfont
            width: 6px
            height: 11px
            display: -webkit-box
            -webkit-box-align: center
            font-size: 12px
            position: absolute
            bg-image('icon-left')
            background-repeat: no-repeat
            top: 50%
            margin-top: -5px
        .yesterday
            font-size: 12px
            -webkit-box-flex: 1
            position: relative
            padding-left: 12px
            .iconfont
                width: 6px
                height: 11px
                display: -webkit-box
                -webkit-box-align: center
                font-size: 12px
                background-size: 6px 11px
                position: absolute
                top: 50%
                margin-top: -5px
        .content
            -webkit-box-flex: 1
            font-weight: 700
            height: 100%
        .today
            -webkit-box-flex: 1
            display: block
            min-width: 126px
            margin-top: 6px
            line-height: 26px
            .today-box
                background: #fff
                -webkit-border-radius: 2px
                color: #3d3d3d
                padding: 5px 0 5px 5px
                height: 24px
                font-size: 12px
                position: relative
                display: -webkit-box
                .today-box-left
                    -webkit-box-flex: 1
                .down
                    width: 34px
                    position: relative
                    top: -2px
        .tomorrow
            font-size: 12px
            -webkit-box-flex: 1
            position: relative
            padding-right: 12px
            .iconfont
                background-size: 6px 11px
                right: 11px
                transform: rotate(180deg)
        .disable
            color: $color-middle-gray
    .main-wrapper
        height: calc(100% - 86px)
        top: 0
        bottom: 40px
        -webkit-box-orient: vertical
        display: -webkit-box
        -webkit-box-flex: 1
        position: relative
        .flight-list-wrapper
            padding: 0 5px
            .flight-list-item
                margin:5px 0
                background-color: $color-background-d
                border-radius: 2px
                padding: 15px 15px 8px 8px
                line-height: 20px
                text-shadow: #fff 0 1px 0
                position: relative
                &:active
                    background-color: #faf4e0
                .core-info-wrapper
                    display: -webkit-box
                    position: relative
                    .airline-left
                        -webkit-box-flex: 1
                        .airline-bd
                            display: -webkit-box
                            position: relative
                            .airline-time
                                height: 20px
                            .airline-icon
                                width: 60px
                                text-align: center
                                margin: 0 25px
                                color: #949595
                                font-size: 10px
                                bg-image('to-line')
                                background-repeat: no-repeat
                                background-position: center 40%
                                background-size: contain
                            .airline-airport
                                position: relative
                                em
                                    font-size: 9px
                                    display: inline-block
                                    margin-top: -5px
                                    margin-left: 3px
                                    font-weight: 400
                                    position: absolute
                                    font-style: normal
                                    width: 30px
                    .airline-price
                        text-align: right
                        -webkit-box-flex: 1
                        font-size: 13px
                        color: #7d7e7f
                        -webkit-box-pack: start
                        -webkit-box-orient: vertical
                        display: -webkit-box
                        overflow: hidden
                        width: 150px
                        .price
                            font-size: 20px
                            color: $color-sub-theme
                            display: -webkit-box
                            -webkit-box-pack: end
                            -webkit-box-orient: vertical
                .airline-activity-wrapper
                    .airline-hd
                        font-size: $font-size-small-s
    .list-bottombar
        display: -webkit-box
        position: fixed
        bottom: 0
        width: 100%
        height: 40px
        background: #f2f3f4
        z-index: 10
        font-size: 14px
        text-align: center
        -webkit-box-align: center
        li
            -webkit-box-flex: 1
            width: 50%
            height: 100%
            line-height: 40px
            color: $color-theme
            &.filter_current
                background: $color-background-d
                color: $color-theme-d
                .icon
                    display: inline-block
                    background-repeat: no-repeat
                    width: 5px
                    height: 9px
                    bg-image('filter-down')
                    background-size: 5px 9px
                    margin-left: 10px
                &.filter-up
                    .icon
                        transform: rotate(180deg)

</style>
