<template>
  <div class="wxc-page-calendar"
       ref="pageCalendar"
       :style="{ height: pageHeight +'px'}">
    <wxc-minibar :show="showHeader"
                 v-bind="minibarCfg"
                 v-on:minibarLeftButtonClick="minibarLeftButtonClick"></wxc-minibar>

    <div class="fuyou-ct calendar-weekday" v-if="isShow">
      <p class="flex-item weekday-text"
            :key="k"
            v-for="(week,k) in ['日','一','二','三','四','五','六']">{{week}}</p>
    </div>
    <scroll :data="monthsArray" class="fuyou-list fuyou-ct calendar-list" 
            ref="scroll" :style="{ height: calendarHeight +'px'}">
      <!-- <div class="fuyou-ct calendar-list-wrapper" v-if="isShow"> -->
      <div class="fuyou-ct calendar-list-wrapper" v-if="isShow">
        <div class="fuyou-ct" v-for="(month,index) in monthsArray" :key="index">
          <div class="calendar-month">
            <p class="month-text">{{month.title}}</p>
          </div>
          <div class="calendar-row fuyou-ct" v-for="(row,rowIndex) in month.rowsData" :key="rowIndex">
            <div v-for="(cell,index) in row.cells"
                 :key="index"
                 :ref="cell.ref"
                 :class="['fuyou-ct', 'row-item', cell.cellClass]"
                 @click="onClickDate(cell)">
              <div v-if="cell.isEmpty"></div>
              <div v-if="!cell.isEmpty" class="calendar-item">
                <p :class="['calendar-note', cell.cls]">{{cell.note}}</p>
                <p :class="['calendar-day', cell.cls]">{{cell.text}}</p>
                <p :class="['calendar-ext', cell.cls]">{{cell.ext}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import * as Util from './util';
  // const dom = weex.requireModule('dom');

  import WxcMinibar from '../minibar';
  import Scroll from 'base/scroll/scroll';
  import { prefixStyle } from 'common/js/dom';

  const transform = prefixStyle('transform');
  export default {
      components: {
          WxcMinibar,
          Scroll
      },
      props: {
          selectedDate: Array,
          dateRange: {
              type: Array,
              required: true,
              default: () => ([])
          },
          minibarCfg: {
              type: Object,
              default: () => ({
                  'title': '选择日期',
                  'background-color': '#FFC900',
                  'text-color': '#3D3D3D'
              })
          },
          selectedNote: {
              type: Array,
              default: () => (['开始', '到达', '往返'])
          },
          isRange: {
              type: Boolean,
              default: false
          },
          needDestroy: {
              type: Boolean,
              default: false
          },
          descList: {
              type: Array,
              default: () => ([])
          }
      },
      data: () => ({
          isShow: false,
          reSelect: true,
          showHeader: true,
          today: Util.getToDay(),
          calendarHeight: 1040,
          pageHeight: 1334,
          departDate: '',
          arriveDate: ''
          // probeType: 3,
          // listenScroll: true
      }),
      computed: {
          monthsArray () {
              const { dateRange: range, today, departDate, arriveDate, selectedNote, descList } = this;
              const param = { range, today, departDate, arriveDate, selectedNote, descList };
              return Util.generateDateCell(param);
          }
      },
      created () {
          const self = this;
          self.pageHeight = document.documentElement.clientHeight;
          self.calendarHeight = self.pageHeight - (this.showHeader ? 50 : 60) - 30;
          self.detectShow();
      },
      methods: {
          minibarLeftButtonClick () {
              setTimeout(() => {
                  this.hide();
                  this.$emit('wxcPageCalendarBackClicked', {});
              }, 100);
          },
          onClickDate (datConfig) {
              const self = this;
              if (datConfig.disabled || datConfig.isEmpty) return;

              if (self.reSelect) {
                  self.departDate = '';
                  self.arriveDate = '';
                  self.reSelect = false;
              }

              if (self.isRange) {
                  if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
                      self.arriveDate = datConfig.date;
                  } else {
                      self.departDate = datConfig.date;
                  }
                  if (self.departDate && self.arriveDate) {
                      self.dispatchDateChange([self.departDate, self.arriveDate]);
                  }
              } else {
                  self.departDate = datConfig.date;
                  self.dispatchDateChange([self.departDate]);
              }
          },
          // scrollToDate () {
          //   if (this.departDate) {
          //     const el = this.$refs.departDate[0];
          //     dom.getComponentRect && dom.getComponentRect(el, (e) => {
          //       if (e && e.result) {
          //         const bottom = e.size.bottom;
          //         const { env } = weex.config;
          //         // 误差
          //         const height = env.deviceHeight / env.deviceWidth * 750 - 50;
          //         if (bottom > height || bottom === 0) {
          //           dom.scrollToElement(el, { offset: -146, animated: false });
          //         }
          //       }
          //     })
          //   }
          // },
          dispatchDateChange (dateArr) {
              setTimeout(() => {
                  this.hide();
              }, 600);
              this.$emit('wxcPageCalendarDateSelected', {
                  date: dateArr
              });
          },
          detectShow () {
              !this.needDestroy && (this.isShow = true);
              if (this.isRange && this.selectedDate.length >= 2) {
                  this.departDate = this.selectedDate[0];
                  this.arriveDate = this.selectedDate[1];
              } else if (this.selectedDate.length >= 1) {
                  this.departDate = this.selectedDate[0];
                  this.arriveDate = '';
              }
          },
          _animate (width = 0) {
              this.$refs.pageCalendar.style.transition = 'all 0.3 ease-out';
              this.$refs.pageCalendar.style[transform] = `translateX(${-width}px)`;
          },
          show () {
              this.needDestroy && (this.isShow = true);
              this.reSelect = true;
              this.detectShow();
              this._animate(document.documentElement.clientWidth);
              // 防止没有渲染完成
              // setTimeout(() => {
              //     this.scrollToDate();
              // }, 1);
          },
          hide () {
              this.needDestroy && (this.isShow = false);
              this.reSelect = false;
              this._animate(0);
              this.$emit('wxcPageCalendarHide', {});
          }
      }
  };
</script>
<style scoped>
  .fuyou-ct{
    box-sizing: border-box;
    display: flex;
    position: relative;
    -webkit-box-orient: vertical;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    align-items: stretch;
    align-content: flex-start;
    border: 0 solid black;
    margin: 0;
    padding: 0;
    min-width: 0;
  }
  .wxc-page-calendar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    color: #333333;
    background-color: #fff;
  }
  .calendar-list-wrapper{
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }

  .flex-item {
    flex: 1;
    text-align: center;
  }

  .calendar-weekday {
    height: 30px;
    background-color: #ffffff;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: #e2e2e2;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
  }

  .weekday-text {
    color: #000000;
    flex: 1;
    text-align: center;
  }

  .calendar-list {
    flex-direction: column;
  }

  .calendar-month {
    height: 30px;
    justify-content: center;
    align-items: center;
    background-color: #f2f3f4;
  }

  .month-text {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
    align-items: center;
    background-color: rgb(242, 243, 244);
    -webkit-box-align: center;
  }

  .calendar-row {
    height: 70px;
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: #f2f3f4;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .row-item {
    flex: 1 1 0%;
    height: 70px;
    background: #ffffff;
    border-width: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    justify-content: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
  }

  .calendar-note {
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    color: #000000;
    text-align: center;
  }

  .calendar-item {
    justify-content: center;
    align-items: center;
    height: 60px;
  }

  .calendar-day {
    height: 24px;
    line-height: 24px;
    font-size: 18px;
    color: #000000;
    text-align: center;
  }

  .calendar-ext {
    height: 18px;
    line-height: 18px;
    color: #999999;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .calendar-holiday {
    color: #FF5000;
  }

  .calendar-rest {
    color: #FF5000;
  }

  .item-row-selected {
    color: #fff;
    background-color: #FFC900;
    text-align: center;
  }

  .item-text-selected {
    color: #3d3d3d;
    text-align: center;
  }

  .calendar-disabled {
    color: #CCCCCC;
  }

  .cell-disabled {
    background-color: #FBFBFB;
  }

  .calendar-day-include {
    background-color: #FFF7D6;
  }
</style>
