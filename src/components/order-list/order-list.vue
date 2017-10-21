<template>
    <div class="order-list">
        <scroll class="main-wrapper"
                :data="orderList"
                ref="orderListScroll"
        >
            <ul class="order-list-wrapper">
                <li class="order-list-item" v-for="order in orderList" @click="toOrderDetail(order)">
                    <div class="list-item">
                        <div class="sec sec-left">
                            <div class="flight-title">{{order.startStation}}-{{order.recevieStation}}</div>
                            <div class="from-to">{{regAirCode(order.trainNo)}}{{order.trainNo}}</div>
                        </div>
                        <div class="sec sec-right">
                            <div class="order-price">{{order.totalAmount}}</div>
                            <div class="order-status  ">{{order.stateName}}</div>
                        </div>
                    </div>
                    <i class="access-icon"></i>
                </li>
            </ul>
            <div class="loading-container" v-show="orderList.length == 0 && hasMore">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getOrderList} from 'api/api';
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import {ERR_OK} from 'api/config';
    import aircode from '../../../static/aircode.json';
    import {formatDate} from 'common/js/date.js';
    export default {
        components: {
            Scroll,
            Loading
        },
        data: function () {
            return {
                orderList: [],
                aircode: {},
                hasMore: true
            };
        },
        methods: {
            _getOrderList() {
                getOrderList(this.formatDate(new Date()))
                    .then(response => {
                        if (response.messageCode === ERR_OK) {
                            console.log(response);
                            this.orderList = response.data;
                            this.hasMore = false;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
            regAirCode(code) {
                var codeName = code.substr(0, 2);
                return this.aircode[codeName];
            },
            toOrderDetail(order) {
                this.$router.push({
                    path: `/order-list/${order.orderNoFlx}`
                });
            }
        },
        created() {
            this._getOrderList();
            this.aircode = aircode;
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index';
@import '~common/stylus/variable';
@import "~common/stylus/mixin";
.order-list
    min-width: 320px
    -webkit-box-orient: vertical
    display: -webkit-box
    height: 100%
    .main-wrapper
        .order-list-wrapper
            padding: 0 5px
            .order-list-item
                margin:5px 0
                background-color: $color-background-d
                border-radius: 2px
                padding: 12px 30px 12px 15px
                line-height: 20px
                text-shadow: #fff 0 1px 0
                position: relative
                &:active
                    background-color: #faf4e0
                .list-item
                    display: -webkit-box
                    position: relative
                    -webkit-box-pack: justify
                    -webkit-box-orient: horizontal
                    .sec-left
                        width: 70%
                        .flight-title
                            font-size: 15px
                        .from-to
                            padding-top: 6px
                            font-size: 13px
                            opacity: .6
                            line-height: 1.5
                    .sec-right
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-box-pack: center
                        text-align: right
                        .order-price
                            color: $color-sub-theme
                            font-size: 20px
                            font-family: 'Helvetica Neue',Reqular
                        .order-status
                            font-size: 11px
                            opacity: .6
                            padding-top: 5px
                .access-icon
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADoSURBVHjalNAxbsIwFMbxPw/GShwEyQPCUi3BTBd2ECOwcQ8O0AMUJBjYmNqKAxAgE1l6jh4AwuJUbkhw/KbnT/rZ1lc7nC8NoAOcjVY3KowAWyACNlGc1Kuint2HwLoKFGAA/IZAMVqdgH4IFIBQKNkSAsU9WPjmg5K/xWh19EEp+rMP1tI0La02ipNX4Bto2mgLjJ4iC+fAuxO1xAO6wMKJlsCPeMAX8GKjFTA1WqUSACZGq2the1Gc9J6BB2TBpwOWefAPlYBpHvyhEAAgoSB7aeeADx/I0N4BMx/I0BhoF7VUNvcBAPIHe63pCtBUAAAAAElFTkSuQmCC') no-repeat
                    background-size: 6px 12px
                    width: 6px
                    height: 12px
                    position: absolute
                    top: 50%
                    right: 15px
                    margin-top: -6px
</style>
