<template>
    <div class="order">
        <div class="wrapper">
            <!-- 航班信息 -->
            <div class="cell order-info">
              <div class="cell-item border-bottom-1px">
                  <p class="text-bold">{{departureData}} {{departureWeek}} {{airline.depTime}}  {{airseat.seatMsg}}</p>
                  <p class="lower">{{airline.orgStationName}} - {{airline.dstStationName}}</p>
              </div>
              <div class="cell-item border-bottom-1px">
                  <p class="upper">成人票￥{{airseat.parPrice}}</p>
                  <p class="gray">机建燃油￥{{airline.adultAirportTax}}+￥{{airline.adultFuelTax}}</p>
              </div>
            </div>
            <!-- 乘机人 -->
            <div class="pg-group">
              <div class="choose-pg">
                <div class="tit"><h3>请选择乘机人</h3><small><span>已选择:</span>{{choosePgArr.length}}<span>人</span></small><span class="refresh" @click="refresh">刷新</span></div>
                <div class="content">
                    <mul-chooser :selections="userInfoList"
                  @on-change="onParamChange($event)" :type="chooserType" @on-add="toAddPg">
                  </mul-chooser>
                </div>
              </div>
              <div class="content-group border-bottom-1px">
                <div class="cell">
                  <div class="cell-indent border-bottom-1px border-top-1px">
                    <label for="">联系人</label>
                    <div class="cell-input">
                      <input type="text" v-model="contactName" placeholder="联系人姓名" class="contact-input" >
                    </div>
                  </div>
                  <div class="cell-indent">
                    <label for="">手机号码</label>
                    <div class="cell-input">
                      <input type="tel" v-model="contactTel" placeholder="联系人手机号" class="contact-input" >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="list-wrapper">

            </div>

            <div class="money-profile border-top-1px">
              <div class="info-area">
                <div class="price"><strong>{{oneAllPrice * choosePgArr.length}}</strong><span class="gray">(共<span>{{choosePgArr.length}}</span>人)</span></div>
                <div class="text" @click="openNoAnimationMask">退改签说明</div>
              </div>
              <div class="submit" :class="{disabled : choosePgArr.length <= 0}" @click="toPay">
                <span>去付款</span>
              </div>
            </div>
             <key-board v-model="showBoard" title="" :callback="FligthPay" ref="keyboard"></key-board>
            <wxc-mask height="440"
                      width="90"
                      overlay-opacity="0.6"
                      border-radius="0"
                      duration="200"
                      mask-bg-color="#FFFFFF"
                      :overlay-can-close="overlayCanClose"
                      :has-animation="hasAnimation"
                      :has-overlay="hasOverlay"
                      v-on:wxcMaskSetHidden="wxcMaskSetHidden"
                      :show="show"
                      class="tgq-mask">
              <div class="content">
                <div class="content-title border-bottom-1px">
                  <p class="title">退改签说明</p>
                </div>
                <div class="content-text">
                  <div class="content-text-tit">退改签说明</div>
                  <div class="content-table">
                    <div class="content-table-tr">
                      <div class="content-table-th">
                        <span>舱位</span>
                      </div>
                      <div class="content-table-td">
                        <div class="td-item"><span>{{airseat.seatMsg}}({{airseat.seatCode}})</span></div>
                      </div>
                    </div>
                    <div class="content-table-tr">
                      <div class="content-table-th">
                        <span>票面价</span>
                      </div>
                      <div class="content-table-td">
                        <div class="td-item"><span>￥{{airseat.parPrice}}元(不含税)</span></div>
                      </div>
                    </div>
                    <div class="content-table-tr">
                      <div class="content-table-th">
                        <span>退票费</span>
                      </div>
                      <div class="content-table-td">
                        <div class="td-item">
                          <img src="https://gw.alicdn.com/tps/TB1OibcPFXXXXbxaXXXXXXXXXXX-24-24.png">
                          <span>起飞前{{airseat.refundTimePoint}}小时前</span>
                          <span>{{airseat.refundPercentBefore}}%</span>
                        </div>
                        <div class="td-item">
                          <img src="https://gw.alicdn.com/tps/TB1OibcPFXXXXbxaXXXXXXXXXXX-24-24.png">
                          <span>起飞前{{airseat.refundTimePoint}}小时后</span>
                          <span>{{airseat.refundPercentAfter}}%</span>
                        </div>
                      </div>
                    </div>
                    <div class="content-table-tr">
                      <div class="content-table-th">
                        <span>签转</span>
                      </div>
                      <div class="content-table-td">
                        <div class="td-item"><span>不可签转</span></div>
                      </div>
                    </div>
                    <div class="content-table-tr">
                      <div class="content-table-th">
                        <span>特殊说明</span>
                      </div>
                      <div class="content-table-td">
                        <div class="td-item"><span>{{airseat.refundStipulate}}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </wxc-mask>
          </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import WxcMask from 'base/mask/mask.vue';
    import MulChooser from 'base/multiplyChooser/multiplyChooser.vue';
    import {KeyBoard} from 'vue-ydui/dist/lib.px/keyboard';
    import {getUserInfoLines, airTicketsFligthPay, getAirTicketFee} from 'api/api';
    import {ERR_OK} from 'api/config';
    import {formatDate} from 'common/js/date';
    import {mapGetters} from 'vuex';
    export default {
        data () {
            return {
                show: false,
                showClose: true,
                hasOverlay: true,
                overlayCanClose: true,
                isFalse: false,
                hasAnimation: true,
                userInfoList: [],
                choosePgArr: [],
                showBoard: false,
                chooserType: 0,
                contactName: '',
                contactTel: '',
                passagers: '',
                serviceFee: ''
            };
        },
        components: {
            WxcMask,
            MulChooser,
            KeyBoard
        },
        methods: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            openMask (e) {
                this.show = true;
                this.hasAnimation = true;
            },
            wxcMaskSetHidden () {
                this.show = false;
            },
            openNoAnimationMask (e) {
                this.show = true;
                this.hasAnimation = false;
            },
            onParamChange (val) {
                this.choosePgArr.splice(0, 1, val);
                console.log(this.choosePgArr);
                this.passagers = this.choosePgArr[0].name + ',' + this.choosePgArr[0].phone + ',' + this.choosePgArr[0].idNo;
            },
            toAddPg () {
                this.$router.push('addPg');
            },
            toPay() {
                var contactName = this.contactName;
                var contactTel = this.contactTel;
                if (contactName === '') {
                    this.$dialog.toast({
                        mes: '请填入联系人姓名',
                        timeout: 1500
                    });
                    return;
                }
                if (contactTel === '') {
                    this.$dialog.toast({
                        mes: '请填入联系人电话',
                        timeout: 1500
                    });
                    return;
                }
                if (!(/^1[34578]\d{9}$/.test(contactTel))) {
                    this.$dialog.toast({
                        mes: '请填入正确的电话',
                        timeout: 1500
                    });
                    return;
                }
                this.showBoard = true;
            },
            _getUserInfoLines() {
                getUserInfoLines()
                    .then((res) => {
                        if (res.messageCode === ERR_OK) {
                            this.userInfoList = res.data;
                            console.log(res);
                        } else {
                            this.$dialog.toast({
                                mes: res.message,
                                timeout: 1500
                            });
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            _getAirTicketFee() {
                getAirTicketFee()
                    .then((res) => {
                        console.log(res);
                        if (res.msgCode === ERR_OK) {
                            this.serviceFee = res.data;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refresh() {
                this._getUserInfoLines();
            },
            FligthPay(val) {
                this.$dialog.loading.open('支付中');
                var seatCode = this.airline.seatCode;
                var passagers = this.passagers;
                var contactName = this.contactName;
                var contactTel = this.contactTel;
                var departureDate = this.departureData;
                var departure = this.airline.dstCity;
                var destination = this.airline.orgCity;
                var companyCode = this.airline.flightCompanyCode;
                var flightNo = this.airline.flightNo;
                var amount = this.oneAllPrice;
                var serviceFee = this.serviceFee;
                var tradePassword = val;
                /* 模拟异步验证密码 */
                airTicketsFligthPay(seatCode, passagers, contactName, contactTel, departureDate, departure, destination, companyCode, flightNo, amount, serviceFee, tradePassword)
                  .then((res) => {
                      this.$dialog.loading.close();
                      if (res.messageCode === ERR_OK) {
                          this.$dialog.toast({
                              mes: '支付成功',
                              timeout: 1500,
                              icon: 'success'
                          });
                          this.showBoard = false;
                      } else {
                          this.$dialog.toast({
                              mes: res.message,
                              timeout: 1500
                          });
                      }
                  })
                  .catch(e => {
                      console.log(e);
                  });
            }
        },
        computed: {
            departureWeek: function () {
                var currentDate = this.departureData;
                var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                if (currentDate === this.formatDate(new Date())) {
                    return '今天';
                } else {
                    return weekArr[new Date(currentDate).getDay()];
                }
            },
            oneAllPrice: function () {
                return this.airseat.parPrice + this.airline.adultAirportTax + this.airline.adultFuelTax + Number(this.serviceFee);
            },
            ...mapGetters([
                'airline',
                'airseat',
                'departureData'
            ])
        },
        created() {
            this._getUserInfoLines();
            this._getAirTicketFee();
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/mixin.styl"
    @import "~common/stylus/variable.styl"
    .order
        height: 100vh
        .wrapper
            height: 100vh
            .cell
              position: relative
              padding: 0 12px
              min-height: 30px
              color: $color-dark-grey
              background-color: $color-background-d
              font-size: 15px
              align-items: center
              .cell-item
                flex: 1
                padding: 10px 12px
                .text-bold
                  font-weight: 700
                .lower
                  font-size: 12px
                  margin-top: 5px
                .upper
                  height: 12px
                  margin-bottom: 5px
                  font-size: $font-size-small
                .gray
                  color: $color-text-d
                  font-size: $font-size-small
            .pg-group
              background: $color-background-d
              .choose-pg
                padding-left: 12px
                .tit
                  font-size: 17px
                  color: $color-middle-gray
                  height: 36px
                  line-height: 36px
                  margin-bottom: 5px
                  h3
                    display: inline-block
                  small
                    font-size: $font-size-small-s
                    margin-left: 9px
                  .refresh
                        float: right
                        margin-right: 10px
                        font-size: 13px
                .content
                  margin-bottom: 10px
              .content-group
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
                    .contact-input
                        flex: 1
                        -webkit-appearance: none
                        -webkit-tap-highlight-color: transparent
                        outline: 0
                        border: 0 none
                        font-size: 15px
                        display: block
                        line-height: 30px
            .order-info
              margin-bottom: 12px
              padding-left: 0
              padding-right: 0
            .tgq-mask
              .content
                .content-title
                  line-height: 50px
                  text-align: center
                  font-size: $font-size-large
                  position: relative
                .content-text
                  padding: 50px 18px 0
                  font-size: $font-size-small
                  line-height: 15px
                  position: absolute
                  top: 0
                  bottom: 45px
                  right: 0
                  left: 0
                  overflow: scroll
                  .content-text-tit
                    font-size: $font-size-medium
                    line-height: 20px
                    padding: 6px 0
                    font-weight: 700
                    margin-top: 10px
                  .content-table
                    position: relative
                    color: #666
                    font-size: 13px
                    line-height: 18px
                    .content-table-tr
                      position: relative
                      display: flex
                      border: 1px solid #ccc
                      border-bottom: 0
                      &:last-child
                        border-bottom: 1px solid #ccc
                      .content-table-th
                        padding: 10px 12px
                        width: 64px
                        box-sizing: border-box
                        position: relative
                        display: flex
                        align-items: center
                        border-right: 1px solid #ccc
                      .content-table-td
                          flex: 1
                          padding: 10px 12px
                          .td-item
                            display: flex
                            -webkit-box-align: center
                            align-items: cente
                            margin-bottom: 6px
                            &:last-child
                              margin-bottom: 0
                            img
                              width: 12px
                              height: 12px
                              margin-right: 6px
                              vertical-align: middle
            .money-profile
              position: fixed
              bottom: 0
              left: 0
              right: 0
              width: 100%
              height: 50px
              z-index: 300
              display: flex
              .info-area
                display: flex
                flex: 1
                height: 50px
                padding: 0 5px 0 12px
                position: relative
                background: $color-background-d
                .price
                  width: 50%
                  flex: 1
                  height: 50px
                  line-height: 50px
                  strong
                    font-size: 20px
                    font-weight: 500
                    color:$color-sub-theme
                  .gray
                    color: $color-text-d
                    font-size: $font-size-small-s
                    margin-left: 5px
                .text
                  width: 50%
                  flex: 1
                  height: 50px
                  line-height: 50px
                  font-size: $font-size-small-s
                  color: $color-sub-theme-l
                  text-align: right
                  margin-right: 17px
                  position: relative
                  &:after
                    content: ''
                    width: 11.5px
                    height: 7px
                    position: absolute
                    top: 42%
                    right: -12px
                    bg-image('icon-top-gray')
                    background-repeat: no-repeat
                    background-position: center
                    background-size: contain
              .submit
                display: flex
                flex-direction: column
                justify-content: center
                width: 45%
                height: 50px
                background-color: $color-sub-theme-l
                color: #fff
                font-size: 20px
                font-weight: 500
                text-align: center
              .disabled
                background-color:#e0e0e0
                color: #b4b4b4

</style>
