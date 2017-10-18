<template>
    <div class="order-detail">       
        <div class="order-status border-bottom-1px">
            <div class="list-item">                 
                <div class="sec sec-left">                                                               
                    <div class="flight-title">订票成功</div>                                          
                    <div class="fight-orderNo">订单号 1515151561515</div>                                      
                </div>                 
                <div class="sec sec-right">                     
                    <div class="order-price">500</div>                     
                    <div class="order-btn">我要退票</div>                 
                </div>             
            </div>
        </div>

        <div class="flight-info-wrapper border-bottom-1px border-top-1px">
            <div class="title">航班信息</div>
            <div class="main">
                <div class="container">
                    <div class="upper">10月10日 周二</div>
                    <div class="middle" >
                        <div class="left">
                            <p class="name">上海</p>
                            <p class="time">20:55</p>
                            <p class="airport">浦东机场T2</p>
                        </div>
                        <div class="center">
                            <p class="stop"></p>
                            <p class="icon"></p>
                            <p class="consume">约2小时45分</p>
                        </div>
                        <div class="right">
                            <p class="name">北京</p>
                            <p class="time"><span>00:15</span><em>+1天</em></p>
                            <p class="airport">首都机场</p>
                        </div>
                    </div>
                    <div class="lower">
                        <p class="detail"><span>U435345</span><span>机型125</span></p>
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
                    <p>彭锦</p>
                    <p class="mg6">身份证 4****************5</p>
                </div>
            </div>
            <div class="cell-item">
                <div class="index-label">联系人</div>
                <div class="index-list">
                    <p>彭锦</p>
                    <p class="mg6">155****2882</p>
                </div>
            </div>
        </div>

        <div class="back-btn">
            <button class="submit">继续订票</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
