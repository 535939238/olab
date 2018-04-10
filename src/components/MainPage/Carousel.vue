<template>
  <div id="Carousel" class="carousel">
    <div class="carousel-inner" :style="{height:height}">
      <transition :name="dir?'carousel':'carouselrev'">
        <div class="item active" v-for="(item,index) in items" v-if="index==at" :key="index" :style="'background-image:url('+item.image+');'" @click="$emit('select',item,index)">
          <div class="carousel-caption">
            <h3>{{item.title}}</h3>
            <p>{{item.contains}}</p>
          </div>
        </div>
      </transition>
    </div>
    <!-- Controls -->
    <div class="left carousel-control" v-on:click="at--">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </div>
    <div class="right carousel-control" v-on:click="at++">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:{
    items:{
      default(){
        return []
      }
    }
  },
  data() {
    return {      
      at: 0,
      dir: true,
      timer: undefined,
      height: "500px"
    };
  },
  methods: {
    resizeEvent() {
      var conv = document.body.clientWidth * 0.63 + 50;
      if (conv > 735) conv = "735px";
      else conv += "px";
      this.height = conv;
    }
  },
  watch: {
    at(newval, oldval) {
      var max = this.items.length;
      if (newval < 0) {
        this.at = max - 1;
        return;
      } else if (newval >= max) {
        this.at = 0;
        return;
      }
      if (oldval == this.items.length && newval == 0) this.dir = true;
      else if (oldval == -1 && this.items.length - 1 == newval)
        this.dir = false;
      else this.dir = newval > oldval;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.at++;
    }, 5000);
    window.addEventListener("resize", this.resizeEvent);
    var e = document.createEvent("HTMLEvents");
    e.initEvent("resize", true, true);
    window.dispatchEvent(e);
  },
  destroyed() {
    clearInterval(this.timer);
    window.removeEventListener("resize", this.resizeEvent);
  }
};
</script>

<style lang='scss'>
#Carousel {
  margin-top: 0 !important;
  .carousel-inner {
    transition: none;
    background-image: url(/static/images/bg3.png);
    background-size: cover;
    background-position: center;
    .item {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-size: cover;
      background-position: center;
      &.carousel {
        &-enter,
        &rev-leave-to {
          transform: translate(100%, 0);
        }
        &-leave-to,
        &rev-enter {
          transform: translate(-100%, 0);
        }
      }
    }
  }
}
</style>