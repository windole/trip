<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in selections"
          @click="toggleSelection(index)"
          :title="item.name"
          :class="{active: checkActive(index)}"
          >{{ item.name }}</li>
          <li class="add" @click="addHandle">&nbsp;&nbsp;&nbsp;&nbsp;新增</li>
        </ul>
      </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    props: {
        selections: {
            type: Array,
            default: [{
                name: 'test',
                idNo: '',
                phone: ''
            }]
        }
    },
    data () {
        return {
            nowIndexes: [0]
        };
    },
    methods: {
        toggleSelection (index) {
            if (this.nowIndexes.indexOf(index) === -1) {
                this.nowIndexes.push(index);
            } else {
                this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
                    return idx !== index;
                });
            }
            let nowObjArray = _.map(this.nowIndexes, (idx) => {
                return this.selections[idx];
            });
            this.$emit('on-change', nowObjArray);
        },
        checkActive (index) {
            return this.nowIndexes.indexOf(index) !== -1;
        },
        addHandle () {
            this.$emit('on-add');
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/mixin.styl"
.chooser-component
  position: relative
  display: inline-block
  .chooser-list 
    li
      display: inline-block
      border: 1px solid #dcdcdc
      height: 38px
      line-height: 38px
      width: 78px
      margin-right: 5px
      border-radius: 2px
      text-align: center
      cursor: pointer
      color: #444
      margin-bottom: 10px
      &.active
        border-color: #19a5f2
        color: #19a5f2
        bg-image('true')
        background-repeat: no-repeat
        background-position: bottom right
        background-size: 20%
      &.add
        bg-image('add')
        background-repeat: no-repeat
        background-position: 10% center
        background-size: 26%
        color: #19a5f2
</style>
