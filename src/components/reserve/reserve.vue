<template>
    <div class="reserve">
        <div class="flight-info-wrapper" >
            <div class="container" >
                <div class="upper">12月06日 周三</div>
                <div class="middle" >
                    <div class="left">
                        <p class="name">{{lineInfo.orgCityName}}</p>
                        <p class="time">{{lineInfo.depTime}}</p>
                        <p class="airport">{{lineInfo.orgCity}}</p>
                    </div>
                    <div class="center">
                        <p class="stop"></p>
                        <p class="icon"></p>
                        <p class="consume">约2小时5分</p>
                    </div>
                    <div class="right">
                        <p class="name">{{lineInfo.dstCityName}}</p>
                        <p class="time"><span>{{lineInfo.arriTime}}</span></p>
                        <p class="airport">{{lineInfo.dstCity}}</p>
                    </div>
                </div>
                <div class="lower">
                    <p class="detail"><span>{{lineInfo.flightCompanyName}}{{lineInfo.flightNo}}</span><span>机型{{lineInfo.planeType}}</span><span>机建费 {{lineInfo.adultFuelTax}}</span><span>燃油费 {{lineInfo.adultAirportTax}}</span></p>
                </div>
            </div>
        </div>
        <div class="main-wrapper">
            <ul class="seat-list-wrapper">
                <li class="seat-list-item" v-for="seat in lineInfo.airSeats.airSeat">
                    <a class="seat-item seat-item-ow" href="javascript:void(0);">                  
                        <div class="core-info-wrapper">                   
                            <!--左侧区域-->                   
                            <div class="airline-left" aria-hidden="true">                       
                                <div class="airline-left-item price">{{seat.parPrice}}</div>
                                <div class="airline-left-item info">{{seat.discount * 10}}折{{seat.seatMsg}}</div>                
                            </div>                    
                            <div class="order-btn" aria-hidden="true">                       
                                <div class="text">订</div>                    
                            </div>                                    
                        </div>                                                                 
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import lineInfo from '../../../static/airline.json';
    export default {
        data() {
            return {
                lineInfo: []
            };
        },
        created() {
            setTimeout(() => {
                this.lineInfo = lineInfo;
                console.log(this.lineInfo);
            }, 10);
        },
        methods: {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index';
@import '~common/stylus/variable';
@import "~common/stylus/mixin";
.reserve
    height: 100%
    .flight-info-wrapper
        background-color: $color-theme-d
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
    .main-wrapper
        -webkit-box-orient: vertical
        display: -webkit-box
        -webkit-box-flex: 1
        position: relative
        .seat-list-wrapper
            padding: 0 5px
            .seat-list-item
                margin:5px 0
                background-color: $color-background-d
                border-radius: 2px
                padding: 25px 18px 25px 8px
                line-height: 20px
                text-shadow: #fff 0 1px 0
                position: relative
                .core-info-wrapper
                    display: -webkit-box
                    position: relative
                    .airline-left
                        -webkit-box-flex: 1
                        .airline-left-item
                            margin-left: 15px
                        .price
                            font-size: 20px
                            color: $color-sub-theme
                            font-weight: 600
                            margin-bottom: 2px
                        .info
                            font-size: $font-size-small
                            color: $color-text
                    .order-btn
                        width: 40px
                        .text
                            width: 40px
                            display: block
                            text-align: center
                            padding: 10px 4px
                            box-sizing: border-box
                            border-radius: 3px
                            background-color: $color-sub-theme-l
                            color: #fff
                            font-size: $font-size-small
                            
                        
        
</style>
