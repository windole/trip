<template>
  <div>
    <div :class="['wxc-search-bar','wxc-search-bar-'+theme]"
         v-if="mod==='default'">
      <input @blur="onBlur"
             @focus="onFocus"
             @input="onInput"
             @return="onSubmit"
             :autofocus="autofocus"
             :disabled="disabled"
             :value="value"
             ref="search-input"
             :type="inputType"
             :placeholder="placeholder"
             :style="{ width: needShowCancel ? '80%' : '93%' }"
             :class="['search-bar-input','search-bar-input-'+theme]"/>
      <div v-if="disabled"
           @click="inputDisabledClicked"
           class="disabled-input"></div>
      <img class="search-bar-icon"
             :src="inputIcon"></img>
      <img class="search-bar-close"
             v-if="showClose"
             @click="closeClicked"
             :src="closeIcon"></img>
      <p :class="['search-bar-button','search-bar-button-'+theme]"
            v-if="needShowCancel"
            @click="cancelClicked">取消 </p>
    </div>
    <div :class="['wxc-search-bar','wxc-search-bar-'+theme]"
         v-if="mod==='hasDep'">
      <input @blur="onBlur"
             @focus="onFocus"
             @input="onInput"
             @return="onSubmit"
             :disabled="disabled"
             :autofocus="autofocus"
             :value="value"
             :type="inputType"
             :placeholder="placeholder"
             :class="['search-bar-input','input-has-dep','search-bar-input-'+theme]"/>
      <div v-if="disabled"
           @click="inputDisabledClicked"
           class="disabled-input has-dep-disabled"></div>
      <div :class="['bar-dep','.bar-dep-'+theme]"
           @click="depClicked">
        <text class="dep-text">{{depName}}</text>
        <image :src="arrowIcon"
               class="dep-arrow"></image>
      </div>
      <image class="search-bar-icon icon-has-dep"
             :src="inputIcon"></image>
    </div>
  </div>
</template>

<style scoped>
  .wxc-search-bar {
    padding-left: 10px;
    padding-right: 10px;
    background-color: #ffffff;
    width: 100%;
    height: 42px;
    flex-direction: row;
  }

  .wxc-search-bar-yellow {
    background-color: #ffc900;
  }

  .search-bar-input {
    position: absolute;
    top: 5px;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 20px;
    padding-left: 30px;
    font-size: 13px;
    width: 83.2%;
    height: 32px;
    line-height: 32px;
    background-color: #E5E5E5;
    outline: none;
    border-radius: 3px;
    box-sizing: border-box;
  }

  .search-bar-input-yellow {
    background-color: #fff6d6;
    placeholder-color: #666666;
  }

  .search-bar-icon {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 17px;
    top: 14px;
  }

  .search-bar-close {
    position: absolute;
    width: 15px;
    height: 15px;
    right: 60px;
    top: 14px;
  }

  .search-bar-button {
    width: 47px;
    height: 18px;
    font-size: 15px;
    text-align: center;
    background-color: #ffffff;
    margin-top: 8px;
    margin-right: 0;
    color: #333333;
    position: absolute;
    right: 4px;
    top: 5px;
  }

  .search-bar-button-yellow {
    background-color: #FFC900;
  }

  .input-has-dep {
    padding-left: 120px;
    width: 355px;
  }

  .bar-dep {
    width: 185px;
    padding-right: 6px;
    padding-left: 6px;
    height: 21px;
    align-items: center;
    flex-direction: row;
    position: absolute;
    left: 12px;
    top: 11px;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: #C7C7C7;
  }

  .bar-dep-yellow {
    border-right-color: #C7C7C7;
  }

  .dep-text {
    flex: 1;
    text-align: center;
    font-size: 13px;
    color: #666666;
    margin-right: 3px;
    lines: 1;
    text-overflow: ellipsis;
  }

  .dep-arrow {
    width: 12px;
    height: 12px;
  }

  .icon-has-dep {
    left: 107px;
  }

  .disabled-input {
    width: 100%;
    height: 32px;
    position: absolute;
    left: 0;
    background-color: transparent;
  }

  .has-dep-disabled {
    width: 275px;
    left: 100px;
  }
</style>

<script>
  const icon = require('./icon.base64.js');
  module.exports = {
      props: {
          disabled: {
              type: Boolean,
              default: false
          },
          alwaysShowCancel: {
              type: Boolean,
              default: false
          },
          inputType: {
              type: String,
              default: 'text'
          },
          mod: {
              type: String,
              default: 'default'
          },
          autofocus: {
              type: Boolean,
              default: false
          },
          theme: {
              type: String,
              default: 'gray'
          },
          defaultValue: {
              type: String,
              default: ''
          },
          placeholder: {
              type: String,
              default: '搜索'
          },
          depName: {
              type: String,
              default: '杭州'
          }
      },
      computed: {
          needShowCancel () {
              return this.alwaysShowCancel || this.showCancel;
          }
      },
      data: () => ({
          inputIcon: icon.inputIcon,
          closeIcon: icon.closeIcon,
          arrowIcon: icon.arrowIcon,
          showCancel: false,
          showClose: false,
          value: ''
      }),
      created () {
          this.defaultValue && (this.value = this.defaultValue);
          if (this.disabled) {
              this.showCancel = false;
              this.showClose = false;
          }
      },
      methods: {
          onBlur () {
              const self = this;
              setTimeout(() => {
                  self.showCancel = false;
                  self.detectShowClose();
                  self.$emit('searchbarInputOnblur', { value: self.value });
              }, 10);
          },
          autoBlur () {
              this.$refs['search-input'].blur();
          },
          onFocus () {
              this.showCancel = true;
              this.detectShowClose();
              this.$emit('searchbarInputOnfocus', { value: this.value });
          },
          closeClicked () {
              this.value = '';
              this.showCancel && (this.showCancel = false);
              this.showClose && (this.showClose = false);
              this.$emit('searchbarCloseClick', { value: this.value });
              this.$emit('searchbarInputOninput', { value: this.value });
          },
          onInput (e) {
              this.value = e.value;
              this.showCancel = true;
              this.detectShowClose();
              this.$emit('searchbarInputOninput', { value: this.value });
          },
          onSubmit (e) {
              this.onBlur();
              this.value = e.value;
              this.showCancel = true;
              this.detectShowClose();
              this.$emit('searchbarInputOnReturn', { value: this.value });
          },
          cancelClicked () {
              this.showCancel && (this.showCancel = false);
              this.showClose && (this.showClose = false);
              this.$emit('searchbarCancelClick', { value: this.value });
          },
          detectShowClose () {
              this.showClose = (this.value.length > 0) && this.showCancel;
          },
          depClicked () {
              this.$emit('searchbarDepChooseClick', {});
          },
          inputDisabledClicked () {
              this.$emit('searchbarInputDisabledOnclick', {});
          },
          setValue (value) {
              this.value = value;
          }
      }
  };
</script>
