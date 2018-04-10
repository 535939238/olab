<template>
  <div id='ClassTable'>
    <div class="display">
      <div class="classhead">
        <div v-for="day in days" :key="day">
          <span class="hidden-xs">星期</span>
          <span>{{Week(day)}}</span>
        </div>
      </div>
      <div class="classleft">
        <div v-for="(time,index) in times" :key="index" :style="Time(time)">
          <span>{{time}}
            <span class="hidden-xs">节</span>
          </span>
        </div>
      </div>
      <div class="classlt"></div>
      <div class="classlist">
        <table class="bgtable">
          <tbody>
            <tr v-for="id in 12" :key="id">
              <td></td>
            </tr>
          </tbody>
        </table>
        <transition-group name="fade">
          <div class="item" v-for="(item,index) in classList" :key='index' :style="Item(item)">

            <div :style="Itemsub(item)">
              <template v-if="item.multiple">
                <span v-for="(sub,index) in item.sub" :key="index">{{sub.name}}</span>
              </template>
              <template v-else>
                <span>{{item.name}}</span>
                <span>{{item.room}}</span>
              </template>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["queryid"],
  data() {
    return {
      classList: [],
      days: 7,
      times: ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12"]
    };
  },
  watch: {
    queryid() {
      this.Query();
    }
  },
  methods: {
    Query() {
      axios(`/classtable/${this.queryid}`).then(res => {
        this.classList = res.data;
        if (!this.classList instanceof Array) this.classList = [];
      });      
    },
    Item(item) {
      var item = item.multiple ? item.sub[0] : item;
      return {
        left: `${item.day * 100 / 7}%`,
        top: `${(item.from - 1) * 100 / 12}%`,
        height: `${(item.to - item.from + 1) * 100 / 12}%`
      };
    },
    Itemsub(item) {
      var val = encodeURI(item.name).replace(/%/g, "");
      var div = Math.floor(val.length / 3);
      var res = [];
      for (var j = 0; j < 3; ++j) {
        var retval = 0;
        var start = div * j;
        for (var i = start; i < start + div; ++i) retval += val.charCodeAt(i);
        res[j] = retval % 255;
      }
      return {
        background: `rgb(${res[0]},${res[1]},${res[2]})`
      };
    },
    Time(time) {
      var arr = time.split("-");
      var height;
      if (arr.length == 1) height = 1;
      else height = arr[1] - arr[0] + 1;
      return {
        flex: `0 0 ${100 / 12 * height}%`
      };
    },
    WeekType(type) {
      return ["周", "单周", "双周"][type];
    },
    Week(day) {
      return ["一", "二", "三", "四", "五", "六", "日"][day - 1];
    }
  },
  mounted() {
    this.Query();
  }
};
</script>

<style lang='scss'>
$itemnum: 7;
$point_x: 10%;
$point_y: 10%;
$border: #c0c0c0;
$themec: #f87b0d;
#ClassTable {
  > .display {
    position: relative;
    height: 500px;
    background: white;
    border: 1px solid $border;
    color: white;
    > .classlt {
      position: absolute;
      width: $point_x;
      height: $point_y;
      background: $themec;
      border-bottom: 1px solid darken($themec, 10%);
    }
    > .classhead {
      background: $themec;
      position: absolute;
      width: 100%-$point_x;
      left: $point_x;
      height: $point_y;
      display: flex;
      justify-content: space-around;
      align-content: stretch;
      border-bottom: 1px solid darken($themec, 10%);
      > div {
        // background: green;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    > .classleft {
      position: absolute;
      width: $point_x;
      top: $point_y;
      height: 100%-$point_y;
      display: flex;
      flex-direction: column;
      border-right: 1px solid $border;
      color: $themec;
      font-weight: bold;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
      }
    }
    > .classlist {
      left: $point_x;
      width: 100%-$point_x;
      top: $point_y;
      height: 100%-$point_y;
      // background: red;
      position: relative;
      .item {
        @media (max-width: 991px) {
          font-size: 5px;
          > div {
            padding: 3px !important;
          }
        }
        transition: all ease-in-out 1s;
        position: absolute;
        width: 100%/$itemnum;
        // background: adjust-hue(lighten($themec, 15%), 15deg);
        display: flex;
        align-items: stretch;
        padding: 2px;
        > div {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          padding: 10px;
        }
      }
      .bgtable {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        tr:nth-child(odd) > td {
          background: #f5f5f5;
        }
      }
    }
  }
}
</style>