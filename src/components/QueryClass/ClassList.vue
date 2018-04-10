<template>
  <div id='ClassList'>
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
          <div class="item" v-for="(item,index) in classList" :key='index' :style="Item(index)">

            <div :style="Itemsub(item)">
              <template v-if="item.multiple">
                <span v-for="(sub,index) in item.sub" :key="index">{{sub.name}}</span>
              </template>
              <template v-else>
                <span>{{item.name}}</span>
                <span>{{item.teacher}}</span>
                <span>{{TimeDis(item)}}</span>
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
      axios(`/index/classlist/room/${this.queryid}`).then(res => {
        this.classList = res.data;
        if (!this.classList instanceof Array) this.classList = [];
      });
    },
    Item(index) {
      var item = this.classList[index];
      var nextitem = this.classList[index + 1];
      var left = `${(item.day - 1) * 100 / 7}%`;
      var width = `${100 / 7}%`;
      
      if (item.weektype == "even" || item.weekfrom > 8){
        left = `${(item.day - 1 + 0.5) * 100 / 7}%`;
        width = `${100 / 14}%`;
      } else if(item.weektype=='odd' || item.weekto<9){
        width = `${100 / 14}%`;        
      }        

      return {
        left,
        top: `${(item.timefrom - 1) * 100 / 12}%`,
        height: `${(item.timeto - item.timefrom + 1) * 100 / 12}%`,
        width
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
      var color = "#ffffff";
      // if ((res[0] + res[1] + res[2]) / 3 > 128) color = "#666666";
      // else color = "#ffffff";

      var limit = {
        smin: 80,
        sstep: 20,
        lmin: 55,
        lstep: 10,
        hmin: 15,
        hstep: 30
      };

      res = [
        limit.hmin + res[0] / 255 * limit.hstep,
        limit.smin + res[1] / 255 * limit.sstep,
        limit.lmin + res[2] / 255 * limit.lstep
      ];

      return {
        background: `hsl(${res[0]},${res[1]}%,${res[2]}%)`,
        color
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
    },
    TimeDis(item) {
      var type = {
        all: "",
        odd: "[单]",
        even: "[双]"
      };
      return `${item.weekfrom}-${item.weekto}${type[item.weektype]}`;
    }
  },
  mounted() {
    this.Query();
  }
};
</script>

<style lang='scss'>
$point_x: 10%;
$point_y: 10%;
$border: #c0c0c0;
$themec: #f87b0d;
#ClassList {
  overflow-x: auto;
  > .display {
    min-width: 800px;
    position: relative;
    height: 800px;
    @media (max-width: 991px) {
      height: 500px;
    }
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
          font-size: 3px;
          padding: 0;
          > div {
            padding: 1px !important;
          }
        }
        transition: all ease-in-out 1s;
        position: absolute;
        // background: adjust-hue(lighten($themec, 15%), 15deg);
        display: flex;
        align-items: stretch;
        padding: 2px;        
        > div {
          overflow: hidden;
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          padding: 3px;
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