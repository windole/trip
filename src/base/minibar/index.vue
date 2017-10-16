<template>
  <div class="fuyou-ct wxc-minibar" :style="{ backgroundColor: backgroundColor }" v-if="show">
    <div class="left fuyou-ct" @click="leftButtonClicked">
      <p class="left-text" v-if="leftText" :style="{ color: textColor }">{{leftText}}</p>
      <img :src="leftButton" v-if="!leftText" class="left-button"></img>
    </div>
    <p class="fuyou-text fuyou-el middle-title">{{title}}</p>
    <div class="right" @click="rightButtonClicked">
      <p class="right-text" v-if="rightText" :style="{ color: textColor }">{{rightText}}</p>
      <img :src="rightButton" class="right-button" v-if="rightButton"></img>
    </div>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/index';
  .wxc-minibar
    width: 100%
    height: 45px
    flex-direction: row
    justify-content: space-between
    align-items: center
    background-color: #009ff0
    flex-direction: row
    z-index: 1
    .left
      width: 45px
      .left-button
        width: 11px
        height: 18px
        margin-left: 20px
      .left-text
        width: 40px
        margin-left: 10px
        font-size: 14px
        text-align: right
        color: #fff
    .middle-title
      font-size: 17px
      color: #000
      height: 18px
      line-height: 17px
      text-align: center
      width: 100px
    .right
      width: 40px
      .right-button
        width: 16px
        height: 16px
        margin-right: 8px
      .right-text
        width: 40px
        margin-right: 10px
        font-size: 14px
        text-align: left
        color: #fff
</style>

<script>
  const icon = require('./icon.base64.js');

  module.exports = {
      props: {
          backgroundColor: {
              type: String,
              default: '#FFC900'
          },
          leftButton: {
              type: String,
              default: icon.iconArrow
          },
          leftText: {
              type: String,
              default: ''
          },
          textColor: {
              type: String,
              default: '#3D3D3D'
          },
          rightButton: {
              type: String,
              default: ''
          },
          title: {
              type: String,
              default: '福优商城'
          },
          rightText: {
              type: String,
              default: ''
          },
          show: {
              type: Boolean,
              default: true
          }
      },
      methods: {
          leftButtonClicked () {
              const self = this;
              self.$emit('minibarLeftButtonClick', {});
          },
          rightButtonClicked () {
              const self = this;
              if (self.rightText || self.rightButton) {
                  self.$emit('minibarRightButtonClick', {});
              }
          }
      }
  };
</script>
