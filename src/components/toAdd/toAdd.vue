<template>
    <div class="toAdd">
        <minibar title="增加乘机人"
                   background-color="#fff"
                   text-color="#00b0ff"
                   v-on:minibarLeftButtonClick="minibarLeftButtonClick2"
                   v-on:minibarRightButtonClick="minibarRightButtonClick2"
                   right-text="完成"
                   left-text="返回"
                   class="minibar"></minibar>
        <div class="toAdd-card border-bottom-1px">
            <div class="cell">
              <div class="cell-indent border-bottom-1px border-top-1px">
                <label for="">姓名</label>
                <div class="cell-input">
                  <input type="text" v-model="name" placeholder="联系人姓名" class="contact-input" >
                </div>
              </div>
              <div class="cell-indent" @click="showPicker(0)" ref="select0">
                <label for="">证件类型</label>
                <div class="cell-input">
                  {{getIdType}}
                </div>
              </div>
              <picker @select="handleSelect(0,arguments)" :selected-index="selectedIndex[0]"
              ref="picker0" ></picker>
              <div class="cell-indent border-bottom-1px border-top-1px">
                <label for="">证件号码</label>
                <div class="cell-input">
                  <input type="text" v-model="idNo" placeholder="证件号码" class="contact-input" >
                </div>
              </div>
              <div class="cell-indent" @click="showPicker(1)" ref="select1">
                <label for="">是否本人</label>
                <div class="cell-input">
                    {{getIsSelf}}
                </div>
              </div>
              <picker @select="handleSelect1(0,arguments)" :selected-index="selectedIndex[0]"
              ref="picker1" ></picker>
              <div class="cell-indent border-bottom-1px border-top-1px">
                <label for="">大陆手机</label>
                <div class="cell-input">
                  <input type="text" v-model="phone" placeholder="用于接收航变信息" class="contact-input" >
                </div>
              </div>
            </div>
        </div>

        
    </div>

</template>

<script type="text/ecmascript-6">
    import minibar from 'base/minibar/index';
    import Picker from 'base/picker/picker';
    import {updateUserInfo} from 'api/api';
    import {ERR_OK, idTypeArr, isSelfArr} from 'api/config';
    let data0 = [
        {text: '身份证', value: 0}
    ];
    let data1 = [
        {text: '否', value: 0},
        {text: '是', value: 1}
    ];

    export default {
        components: {
            minibar,
            Picker
        },
        data() {
            return {
                data: [[data0]],
                selectedIndex: [[0], [1, 0], [0, 1, 2], [0, 0, 0]],
                idType: 0,
                isSelf: 0,
                name: '',
                idNo: '',
                phone: '',
                nationality: '中国'
            };
        },
        methods: {
            minibarLeftButtonClick2 () {
                this.$router.back();
            },
            minibarRightButtonClick2 () {
                this._addUserInfo();
            },
            _addUserInfo() {
                var isSelf = this.isSelf;
                var name = this.name;
                var idType = this.idType;
                var idNo = this.idNo;
                var phone = this.phone;
                if (name === '') {
                    this.$dialog.toast({
                        mes: '请填入姓名',
                        timeout: 1500
                    });
                    return;
                }
                if (idNo === '') {
                    this.$dialog.toast({
                        mes: '请填入证件号码',
                        timeout: 1500
                    });
                    return;
                }
                if (phone === '') {
                    this.$dialog.toast({
                        mes: '请填入联系人电话',
                        timeout: 1500
                    });
                    return;
                }
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    this.$dialog.toast({
                        mes: '请填入正确的电话',
                        timeout: 1500
                    });
                    return;
                }
                this.$dialog.loading.open('');
                updateUserInfo(1, isSelf, name, idType, idNo, phone, this.nationality, 0)
                  .then((res) => {
                      this.$dialog.loading.close();
                      if (res.messageCode === ERR_OK) {
                          this.$dialog.toast({
                              mes: res.message,
                              timeout: 1500
                          });
                          setTimeout(() => {
                              this.$router.back();
                          }, 1000);
                      }
                  })
                  .catch(e => {
                      console.log(e);
                  });
            },
            showPicker(index) {
                let picker = this.$refs['picker' + index];
                picker.show();
            },
            handleSelect(index, arg) {
                this.idType = arg[1][0];
                console.log(this.idType);
            },
            handleSelect1(index, arg) {
                this.isSelf = arg[1][0];
                console.log(this.isSelf);
            }
        },
        mounted() {
            this.$refs.picker0.setData([data0]);
            this.$refs.picker1.setData([data1]);
        },
        computed: {
            getIsSelf() {
                return isSelfArr[this.isSelf];
            },
            getIdType() {
                return idTypeArr[this.idType];
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/index';
    @import "~common/stylus/mixin";
    @import "~common/stylus/variable";
    .toAdd
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
        .toAdd-card
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
