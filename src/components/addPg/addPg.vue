<template>
    <div class="addPg">
        <div class="add-header">
            <div class="left-txt" @click="back()"></div>
            <h3 @click="goToAddPg">新增乘机人</h3>
            <div class="right"></div>
        </div>
        <ul class="user-list">
            <li class="user-list-item border-bottom-1px">
                <div class="left-checkbox">
                    <input type="checkbox" class="checkbox" checked="">
                </div>
                <div class="main-content">
                    <h4 class="name">金狗</h4>
                    <p class="idCard">身份证<span>1165151651561651651</span></p>
                </div>
                <div class="right-ed" @click="goToEdPg()"></div>
            </li>
        </ul>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>

</template>

<script type="text/ecmascript-6">
    // import City from 'common/js/City';
    // import {getCityList} from 'api/api';
    export default {
        data() {
            return {
                userInfoList: []
            };
        },
        methods: {
            back() {
                this.$router.back();
            },
            goToAddPg() {
                this.$router.push('/addPg/toAdd');
            },
            goToEdPg(item) {
                this.$router.push('/addPg/toEd');
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/index';
    @import "~common/stylus/mixin";
    @import "~common/stylus/variable";
    .addPg
        height: 100%
        .add-header
            background-color: $color-background-d
            margin: 5px
            height: 45px
            line-height: 45px
            display: flex
            border-radius: 2px
            flex-direction: row
            justify-content: space-between
            align-items: center
            color: $color-text-link
            .left-txt
                width: 26px
                height: 26px
                background: url(./right.svg) no-repeat center
            h3
                align-self: flex-start
                position: relative
                &:after
                    content: ''
                    width: 14px
                    height: 14px
                    position: absolute
                    top: 35%
                    left: -18px
                    bg-image('add')
                    background-repeat: no-repeat
                    background-position: center
                    background-size: contain
        .user-list
            background-color: $color-background-d
            margin-top: 10px
            .user-list-item
                padding: 10px 12px 10px 25px
                display: flex
                .left-checkbox
                    width: 10%
                    line-height: 32px
                    .checkbox
                        display: inline-block
                        box-sizing: border-box;
                        width: 15px;
                        height: 15px;
                        outline: 0;
                        border: 1px solid #e0e0e0;
                        border-radius: 3px;
                        -webkit-appearance: none;
                        -webkit-tap-highlight-color: transparent;
                        margin: 0;
                        padding: 0;
                        font-size: 100%;
                        &:checked
                            border-color: $color-text-link
                            bg-image('true')
                            background-repeat: no-repeat
                            background-position: center
                            background-size: 80%
                .main-content
                    width: 80%
                    .name
                        font-size: 14px
                        font-weight: 700
                    .idCard
                        font-size: 13px
                        color: $color-middle-gray
                        margin-top: 5px
                .right-ed
                    width: 20px
                    height: 20px
                    bg-image('icon-ed')
                    background-repeat: no-repeat
                    background-size: contain
                    margin-top: 6px
            
</style>
