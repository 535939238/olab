<template>
  <div id='QueryList' class="container">
    <p class="pretitle">课表查询</p>
    <ClassList :queryid="queryid" />
    <!-- <div class="input-group col-sm-6 col-sm-offset-3 col-xs-12" style="margin-top: 15px">
      <span class="input-group-addon">教室</span>
      <input type="text" class="form-control" v-model="id">
      <div class="input-group-btn">
        <div class="btn btn-primary" @click="queryid=id">查询</div>
      </div>      
    </div>         -->
    <vueSlider v-bind="sliderdemo" :min="areadata[0]" :max="areadata[1]" v-model="room[0]" />
    <vueSlider v-bind="sliderdemo" :min="floordata[0]" :max="floordata[1]" v-model="room[1]" />
    <vueSlider v-bind="sliderdemo" :min="roomdata[0]" :max="roomdata[1]" v-model="room[2]" />
  </div>
</template>

<script>
import vueSlider from "vue-slider-component";
import ClassList from "./ClassList";
export default {
  name: "",
  components: {
    ClassList,
    vueSlider
  },
  computed: {
    queryid() {
      return (
        this.room[0].toString() +
        this.room[1].toString() +
        (this.room[2] < 10
          ? "0" + this.room[2].toString()
          : this.room[2].toString())
      );
    }
  },
  data() {
    return {
      areadata: [2, 8],
      floordata: [0, 6],
      roomdata: [1, 18],
      room: [2, 5, 5],
      sliderdemo: {
        tooltip: "hover",
        piecewise: true,
        piecewiseLabel: true,
        lazy: true,
        piecewiseStyle: {
          backgroundColor: "#ccc",
          visibility: "visible",
          width: "12px",
          height: "12px"          
        },
        piecewiseActiveStyle: {
          backgroundColor: "#3498db"
        }
      }
    };
  }
};
</script>

<style lang='scss'>
#QueryList {
}
</style>