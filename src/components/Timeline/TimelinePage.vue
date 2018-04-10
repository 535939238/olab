<template>
  <div id='TimelinePage'>
    <transition name="fade" appear>
      <p class="pretitle">O-Lab活动安排</p>
    </transition>
    <div class="timelinebox wow fadeIn" @mousemove="MouseMoveEvent($event)">
      <div class="leftwid">
        <div v-for="time in 27" :key="time">
          <span class="hidden-xs">{{ time
            < 11 ? '上午': '下午' }}{{Hour12Conv(time)}}</span>
              <span class="visible-xs">{{Hour24Conv(time)}}</span>{{MinConv(time)}}
        </div>
      </div>
      <div class="topwid">
      </div>
      <div class="lutext">
        时间
      </div>
      <transition-group class="toptext" tag="div" name="fadeUp">
        <div v-for="day in top" :key="day.day">
          <h5>
            <span class="hidden-xs">星期</span>{{day.day}}</h5>
          <h5>{{day.date}}</h5>
        </div>
      </transition-group>
      <table class="bgtab">
        <tbody>
          <tr v-for="i in 27" :key="i">
            <td></td>
          </tr>
        </tbody>
      </table>
      <transition-group class="daywid" tag="div" name="fade">
        <div v-for="(item,index) in applylist" :key="index" class="timewid" :style="TimeWidStyle(item)" @mouseover="fcat=index" @mouseout="fcat=false">
          <div class="tophandler"></div>
          <template v-if="item.density==99">
            <h5>-活动名称-</h5>
            <h5>{{item.groups[0].actname}}</h5>
            <h5>-活动单位</h5>
            <h5>{{item.groups[0].unit}}</h5>
          </template>
          <template v-else>
            <h5>{{item.density}}个待审核的申请</h5>
          </template>
        </div>
      </transition-group>
      <div class="dpinfo" :style="boxStyle">
        <transition name="infobox">
          <div class="infobox" v-if="fcat!==false">
            <div v-for="(item,index) in applylist[fcat].groups" :key="index">
              <img src="@/assets/olablogo.png" alt="o-lab">
              <h5>{{item.actname}}</h5>
              <hr>
              <h5>{{item.unit}}</h5>
              <hr>
              <h5>{{item.time}}</h5>
              <h5>{{StateConv(item.state)}}</h5>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="col-sm-6 col-sm-offset-3 col-xs-12 input-group" style="margin-top: 10px;">
      <span class="input-group-addon">从</span>
      <select class="form-control" v-model="year">
        <option v-for="val in opt_year" :key="val">{{val}}</option>
      </select>
      <span class="input-group-addon">-</span>
      <select class="form-control" v-model="month">
        <option v-for="val in opt_month" :key="val">{{val}}</option>
      </select>
      <span class="input-group-addon">-</span>
      <select class="form-control" v-model="date">
        <option v-for="val in opt_date" :key="val">{{val}}</option>
      </select>
    </div>
    <button class="btn btn-warning col-sm-2 col-sm-offset-5 col-xs-12" style="margin-top:10px;" :disabled="date==''||year==''||month==''" @click="Query">查询</button>
    <div class="row"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    var date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      top: [],
      applylist: [],
      fcat: false,
      boxStyle: {
        left: "0px",
        top: "0px"
      }
    };
  },
  computed: {
    opt_year() {
      var date = new Date();
      if (date.getMonth() > 10)
        return ["", date.getFullYear(), date.getFullYear() + 1];
      else return ["", date.getFullYear()];
    },
    opt_month() {
      var date = new Date();
      if (this.year == date.getFullYear())
        if (date.getMonth() == 11) return ["", 12];
        else return ["", date.getMonth() + 1, date.getMonth() + 2];
    },
    opt_date() {
      var date = new Date();
      var arr = [""];
      function getDayOfMonth(month) {
        return new Date(
          this.getFullYear(),
          month ? month : this.getMonth() + 1,
          0
        ).getDate();
      }
      for (
        var i = this.month == date.getMonth() + 1 ? date.getDate() : 1;
        i <= getDayOfMonth.call(date, this.month);
        ++i
      )
        arr.push(i);
      return arr;
    }
  },
  methods: {
    Convert(data) {
      var bdate = new Date(`${this.year}/${this.month}/${this.date}`);
      this.applylist = [];
      data.forEach(ele => {
        ele.date = new Date(ele.date.replace("-", "/"));
        var dayleft = (ele.date - bdate) / (3600000 * 24);
        ele.grouplist = JSON.parse(ele.grouplist);
        ele.timeline = JSON.parse(ele.timeline);

        var laststate = 0;
        var lastgroup = "";
        var height = 1;
        var top = 0;

        var addOne = i => {
          var groups = [];
          ele.timeline[i][1].forEach(listid => {
            groups.push(ele.grouplist[listid]);
          });
          this.applylist.push({
            density: laststate,
            height,
            groups,
            dayleft,
            top
          });
          height = 1;
        };

        for (var i = 16; i <= 43; ++i) {
          if (!ele.timeline[i]) {
            if (laststate != 0) {
              addOne(i - 1);
              lastgroup = "";
              laststate = 0;
              continue;
            } else continue;
          }
          if (
            i != 43 &&
            laststate == ele.timeline[i][0] &&
            lastgroup == ele.timeline[i][1].sort().toString()
          ) {
            height++;
          } else {
            if (laststate != 0) addOne(i - 1);
            top = i - 16;
            lastgroup = ele.timeline[i][1].sort().toString();
            laststate = ele.timeline[i][0];
          }
        }
      });
    },
    Query() {
      var bdate = new Date(`${this.year}/${this.month}/${this.date}`);
      var begindate = `${this.year}-${this.month}-${this.date}`;
      var enddate = new Date(+bdate + 7 * 86400 * 1000);
      enddate = `${enddate.getFullYear()}-${enddate.getMonth() +
        1}-${enddate.getDate()}`;
      axios
        .get(`/index/timelinefor?datefrom=${begindate}&dateto=${enddate}`)
        .then(res => {
          this.Convert(res.data);
        });
      var newtop = [];
      for (var i = 0; i < 7; ++i) {
        newtop.push({
          day: ["日", "一", "二", "三", "四", "五", "六"][bdate.getDay()],
          date: `${bdate.getMonth() + 1}.${bdate.getDate()}`
        });
        bdate = new Date(+bdate + 24 * 3600000);
      }
      this.top = newtop;
    },
    Hour24Conv(time) {
      return Math.floor(8 + (time - 1) / 2);
    },
    Hour12Conv(time) {
      var val = Math.floor(8 + (time - 1) / 2);
      return val > 12 ? val - 12 : val;
    },
    MinConv(time) {
      return time % 2 == 0 ? ":30" : ":00";
    },
    TimeWidStyle(list) {
      const colorlist = [
        "transparent",
        "#ffd261",
        "#ffc32e",
        "#ffb600",
        "#ff9e00",
        "#ff0000"
      ];
      colorlist[99] = ["#f87b0d"];
      return {
        left: `${list.dayleft * 100 / 7}%`,
        top: `${list.top * 100 / 27}%`,
        height: `${list.height * 100 / 27}%`,
        background: colorlist[list.density]
      };
    },
    StateConv(state) {
      return [
        "未提交",
        "已过时",
        "时间冲突",
        "未通过审核",
        "未审核",
        "审核通过"
      ][state];
    },
    MouseMoveEvent(e) {
      if (this.fcat === false) return;
      this.boxStyle.left = e.clientX + "px";
      this.boxStyle.top = e.clientY + "px";
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
$days: 7;
#TimelinePage {
  text-align: center;
  .timelinebox {
    position: relative;
    height: 745px;
    border: 1px solid #c0c0c0;
    margin: 0 auto;
    z-index: 3;
    background: white;
    @media (max-width: 767px) {
      height: 500px;
    }
  }
  .leftwid {
    position: absolute;
    width: $point_x;
    background-color: white;
    height: 100% - $point_y;
    top: $point_y;
    border-right: 1px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #f87b0d;
    font-weight: bold;
    font-size: 9pt;
    white-space: nowrap;
    > div {
      display: flex;
      justify-content: center;
    }
    > div:nth-child(even) {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
  .topwid {
    position: absolute;
    height: $point_y;
    width: 100%;
    background-color: #f87b0d;
    border-bottom: 1px solid #e34225;
  }
  .lutext {
    position: absolute;
    height: $point_y;
    width: $point_x;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
  }
  .toptext {
    position: absolute;
    left: $point_x;
    height: $point_y;
    width: 100-$point_x;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > * {
      flex-basis: 100%/$days;
    }
    h5 {
      font-weight: bold;
      color: white;
    }
  }
  .bgtab {
    position: absolute;
    left: $point_x;
    top: $point_y;
    width: 100%-$point_x;
    height: 100%-$point_y;
    tr:nth-child(odd) {
      background: #f5f5f5;
    }
  }
  .daywid {
    position: absolute;
    left: $point_x;
    top: $point_y;
    width: 100%-$point_x;
    height: 100%-$point_y;
    > .timewid {
      transition: all ease-in-out 0.7s;
      overflow: hidden;
      position: absolute;
      $timewidnum: 7;
      width: 100%/$timewidnum;
      background: #f87b0d;
      color: white;
      font-weight: lighter;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.41);
      > h5 {
        margin-top: 0;
        margin-bottom: 0;
        &:nth-child(3) {
          margin-bottom: 10px;
        }
      }
      > .tophandler {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10000;
      }
    }
  }
  .dpinfo {
    position: fixed;
    width: 20%;
    min-width: 100px;
    transition: none;
    .infobox {
      box-shadow: 7px 7px 20px rgba(15, 15, 15, 0.41);
      background: rgba(255, 255, 255, 0.47);
      transform-origin: left top;
      &-enter,
      &-leave-to {
        transform: scale(0);
      }
      &-enter-active,
      &-leave-active {
        transition: all ease-out 0.2s;
      }
      padding: 5px;
      > div {
        position: relative;
        background: rgba(255, 255, 255, 0.72);
        padding: 5px;
        > img {
          position: absolute;
          width: 23px;
          right: 0px;
          top: 0px;
        }
        h5 {
          margin: 5px;
          &:nth-child(2) {
            padding-top: 20px;
            margin: 0px;
          }
          &:nth-child(7) {
            padding-bottom: 10px;
            margin: 0px;
          }
        }
        hr {
          margin: 1px;
        }
      }
    }
  }
  .input-group-addon {
    border: 0;
  }
}
</style>