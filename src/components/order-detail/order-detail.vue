<template>
    <div class="order-detail">
        <div class="order-status border-bottom-1px">
            <div class="list-item">
                <div class="sec sec-left">
                    <div class="flight-title">订票成功</div>
                    <div class="fight-orderNo">订单号 {{orderDetail.childOrderNo}}</div>
                </div>
                <div class="sec sec-right">
                    <div class="order-price">300</div>
                    <div class="order-btn" @click="refundFightTicket">我要退票</div>
                </div>
            </div>
        </div>

        <div class="flight-info-wrapper border-bottom-1px border-top-1px">
            <div class="title">航班信息</div>
            <div class="main">
                <div class="container">
                    <div class="upper">{{orderDetail.startTime.split(' ')[0]}} {{departureWeek}}</div>
                    <div class="middle" >
                        <div class="left">
                            <p class="name">{{orderDetail.startStation}}</p>
                            <p class="time">{{orderDetail.startTime.split(' ')[1]}}</p>
                            <p class="airport">{{orderDetail.startStation}}机场</p>
                        </div>
                        <div class="center">
                            <p class="stop"></p>
                            <p class="icon"></p>
                            <p class="consume">约{{totalTime[0]}}小时{{totalTime[1]}}分</p>
                        </div>
                        <div class="right">
                            <p class="name">{{orderDetail.recevieStation}}</p>
                            <p class="time"><span>{{orderDetail.recevieTime.split(' ')[1]}}</span><em v-show="orderDetail.startTime > orderDetail.recevieTime">+1天</em></p>
                            <p class="airport">{{orderDetail.recevieStation}}机场</p>
                        </div>
                    </div>
                    <div class="lower">
                        <p class="detail"><span>{{regAirCode(orderDetail.trainNo)}}</span><span>{{orderDetail.trainNo}}</span></p>
                    </div>
                </div>
            </div>
            <div class="rule-box">
                <p>查看退票规则</p>
            </div>
        </div>

        <div class="pg-info cell">
            <div class="cell-item">
                <div class="index-label">乘机人</div>
                <div class="index-list">
                    <p>{{orderDetail.passengerName}}</p>
                    <p class="mg6">身份证 {{orderDetail.idcardNo}}</p>
                </div>
            </div>
            <div class="cell-item">
                <div class="index-label">联系人</div>
                <div class="index-list">
                    <p>{{orderDetail.contactName}}</p>
                    <p class="mg6">{{orderDetail.contactTel}}</p>
                </div>
            </div>
        </div>

        <div class="back-btn">
            <button class="submit" @click="toHome">继续订票</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getAirTicketDetail, airRefundTicket} from 'api/api';
import aircode from '../../../static/aircode.json';
import {formatDate} from 'common/js/date.js';
import {ERR_OK} from 'api/config';
export default {
    data() {
        return {
            orderNoFlx: '',
            orderDetail: {}
        };
    },
    methods: {
        refundFightTicket() {
            this.$dialog.confirm({
                title: '请确认是否需要退票',
                mes: '',
                opts: () => {
                    this._airRefundTicket();
                }
            });
        },
        _airRefundTicket() {
            airRefundTicket()
                .then((res) => {
                    if (res.messageCode === ERR_OK) {
                        this.$dialog.alert({mes: res.message});
                    }
                    this.$dialog.alert({mes: 'aaaa'});
                })
                .catch(e => {
                    console.log(e);
                });
        },
        regAirCode(code) {
            var codeName = code.substr(0, 2);
            return aircode[codeName];
        },
        formatDate (time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        },
        toHome() {
            this.$router.push('/');
        },
        _getAirTicketDetail() {
            getAirTicketDetail(this.orderNoFlx)
                .then((res) => {
                    if (res.messageCode === ERR_OK) {
                        console.log(res);
                        this.orderDetail = res.data[0];
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    computed: {
        departureWeek: function () {
            var currentDate = this.orderDetail.startTime.split(' ')[0];
            var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            if (currentDate === this.formatDate(new Date())) {
                return '今天';
            } else {
                return weekArr[new Date(currentDate).getDay()];
            }
        },
        totalTime: function () {
            var timeArr = [];
            var depTime = this.orderDetail.startTime.split(' ')[1].split(':');
            var arriTime = this.orderDetail.recevieTime.split(' ')[1].split(':');
            var allMin = (arriTime[0] - depTime[0]) * 60 + (arriTime[1] - depTime[1]);
            allMin = allMin < 0 ? allMin + 24 * 60 : allMin;
            timeArr.push(parseInt(allMin / 60));
            timeArr.push(allMin % 60);
            return timeArr;
        }
    },
    created() {
        this.orderNoFlx = this.$route.params.orderNo;
        this._getAirTicketDetail();
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import "~common/stylus/mixin";
.order-detail
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    background: $color-background
    .order-status
        background-color: $color-background-d
        display: -webkit-box
        margin-bottom: 12px
        .list-item
            display: flex
            width: 100%
            padding: 18px 15px 15px
            box-sizing: border-box
            .sec-left
                flex: 1
                .flight-title
                    font-size: 18px
                    color: #02d240
                .fight-orderNo
                    padding-top: 12px
                    font-size: 12px
                    opacity: .6
                    line-height: 1.5
            .sec-right
                width: 85px
                text-align: right
                .order-price
                    color: $color-sub-theme
                    font-size: 20px
                    font-family: 'Helvetica Neue',Reqular
                .order-btn
                    font-size: 12px
                    margin-top: 16px
                    width: 85px
                    height: 33px
                    line-height: 33px
                    background-color: $color-sub-theme-l
                    text-align:center
                    color: #fff
                    border-radius: 2px
    .flight-info-wrapper
        background-color: $color-background-d
        margin-bottom: 12px
        .title
            position: relative
            font-size: 12px
            color: #999
            line-height: 30px
            padding: 0 12px
        .main
            color: $color-text
            .container
                position: relative
                padding: 15px 0
                .upper
                    font-size: 15px
                    text-align: center
                .middle
                    margin-top: 8px
                    display: flex
                    text-align: center
                    .left
                        width: 1%
                        text-align: right
                        flex: 1
                    .center
                        width: 110px
                        margin: 0 2px
                        text-align: center
                        position: relative
                        font-size: 12px
                    .right
                        width: 1%
                        text-align: left
                        flex: 1
                    .name
                        font-size: 15px
                        font-weight: 600
                    .time
                        font-size: 24px
                        margin-top: 4px
                        position: relative
                        font-family: Helvetica
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
                    .airport
                        font-size: 12px
                        margin-top: 5px
                    .icon
                        height: 48px
                        background-repeat: no-repeat
                        background-position: center 28px
                        background-size: 90px 5px
                        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAJBAMAAAASk9lmAAAAGFBMVEUAAAAgIyUfIyUgIyUgIyUgIyUgIyUfIiUY7QHQAAAABnRSTlMAFdTvxqn/hM20AAAAO0lEQVQoz2OgGLA6MlADsCQJUMMYRjVFqjhHaNg6Jw0JlKGwcYEydG56WjIDWLQsHSqWTtgghDIESAYAPYs605r2LG4AAAAASUVORK5CYII=')
                .lower
                    font-size: $font-size-small
                    margin-top: 10px
                    white-space: nowrap
                    text-align: center
                    span
                        border-right: 1px solid #666
                        padding: 0 4px
                        &:last-child
                            border-right: none
        .rule-box
            color: $color-theme-d
            font-size: 13px
            line-height: 18px
            padding: 12px 12px 12px 0
            margin-left: 12px
            position: relative
            display: flex
    .pg-info
        background-color: $color-background-d
        padding-left: 12px
        .cell-item
            min-height: 30px
            color: #333
            font-size: 15px
            display: flex
            -webkit-box-align: center
            .index-label
                width: 90px
                margin-right: 4px
                line-height: 40px
                color: #a5a5a5
                font-size: 15px
            .index-list
                flex: 1
                padding: 10px 12px
                .mg6
                    margin-top: 6px
    .back-btn
        padding: 0 12px
        margin-top: 30px
        button
            height: 42px
            width: 100%
            box-sizing: border-box
            border-radius: 3px
            border: 1px solid #fec803
            background: #fec803
            line-height: 42px
            color: #fff
            font-size: 18px

</style>
