<template>
    <div class="toEd">
        <minibar title="修改乘机人"
                   background-color="#fff"
                   text-color="#00b0ff"
                   v-on:minibarLeftButtonClick="back"
                   v-on:minibarRightButtonClicked="minibarRightButtonClick"
                   right-text="完成"
                   left-text="返回"
                   class="minibar"></minibar>
        <div class="toEd-card border-bottom-1px">
            <div class="cell">
              <div class="cell-indent border-bottom-1px border-top-1px">
                <label for="">姓名</label>
                <div class="cell-input">
                  <input type="text" placeholder="联系人姓名" class="contact-input" >
                </div>
              </div>
              <div class="cell-indent">
                <label for="">证件类型</label>
                <div class="cell-input">
                  身份证
                </div>
              </div>
              <div class="cell-indent border-bottom-1px border-top-1px">
                <label for="">证件号码</label>
                <div class="cell-input">
                  <input type="text" placeholder="证件号码" class="contact-input" >
                </div>
              </div>
              <div class="cell-indent border-bottom-1px border-top-1px">
                <label for="">大陆手机</label>
                <div class="cell-input">
                  <input type="text" placeholder="选填,用于接收航变信息" class="contact-input" >
                </div>
              </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import minibar from 'base/minibar/index';
    export default {
        components: {
            minibar
        },
        data() {
            return {
            };
        },
        methods: {
            back () {
                this.$router.back();
            },
            minibarRightButtonClick () {
                alert({ 'message': 'click rightButton!', 'duration': 1 });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/index';
    @import "~common/stylus/mixin";
    @import "~common/stylus/variable";
    .toEd
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background-color: $color-background
        .minibar
            flex-direction: row
            align-content: flex-start
            align-items: center
        .toEd-card
            background-color: $color-background-d
            margin: 5px
            border-radius: 2px
            padding-left: 18px
            .cell
              padding-right: 0
              .cell-indent
                padding: 10px 12px
                display: flex
                height: 50px
                box-sizing: border-box
                label
                  min-width: 75px
                  margin-right: 12px
                  color: $color-middle-gray
                  display: inline-block
                  line-height: 30px
                .cell-input
                    line-height: 30px
                .contact-input
                    flex: 1
                    -webkit-appearance: none
                    -webkit-tap-highlight-color: transparent
                    outline: 0
                    border: 0 none
                    font-size: 15px
                    display: block
                    line-height: 30px
</style>
