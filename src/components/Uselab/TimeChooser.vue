<template>
  <div class='TimeChooser'>
    <h4>{{time}}</h4>
    <svg class="icon" @click="editing=!editing" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="881">
      <path d="M928 1024H96c-54.4 0-96-41.6-96-96V96c0-54.4 41.6-96 96-96h416c19.2 0 32 12.8 32 32s-12.8 32-32 32H96c-19.2 0-32 12.8-32 32v832c0 19.2 12.8 32 32 32h832c19.2 0 32-12.8 32-32V512c0-19.2 12.8-32 32-32s32 12.8 32 32v416c0 54.4-41.6 96-96 96z"></path>
      <path d="M544 512c-9.6 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.8l448-448c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-448 448c-6.4 6.4-12.8 9.6-22.4 9.6z"></path>
    </svg>
    <transition name="fade">
      <div v-if="editing" class="chooserdiv">
        <input :min="minval" :max="maxval" type="range" v-model="base" class="msinput" style="margin-bottom:0px">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["time", "begin", "end"],
  computed: {
    minval() {
      if (!this.begin) return;
      var arr = this.begin.split(":");
      return arr[0] * 2 + (arr[1] == "30" ? 1 : 0) + 1;
    },
    maxval() {
      if (!this.end) return;
      var arr = this.end.split(":");
      return arr[0] * 2 + (arr[1] == "30" ? 1 : 0);
    },
    base: {
      get() {
        var arr = this.time.split(":");
        return +arr[0] * 2 + (arr[1] == "30" ? 1 : 0);
      },
      set(val) {
        var str = Math.floor(val / 2);
        str += ":";
        str += val % 2 ? "30" : "00";
        this.$emit("time", str);
      }
    }
  },
  data() {
    return {
      editing: false
    };
  },
  watch: {    
    minval(val) {
      if (this.base < val) this.base = val;
    }
  },
  methods: {}
};
</script>

<style lang='scss'>
.TimeChooser {  
  display: flex;
  align-items: center;
  >h4{
    flex-basis: 50px;
    text-align: right;
    margin-right: 20px;
  }
  > .icon {
    width: 18px;    
    color: #5bc0de;
  }
  .chooserdiv {    
    padding: 10px;
    background: #f3f3f3;        
    z-index: 10;
    margin-left: 20px;
    flex-grow: 1;    
  }
}
</style>