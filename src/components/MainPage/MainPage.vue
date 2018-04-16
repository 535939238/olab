<template>
  <div id='MainPage'>
    <Carousel @select="JumpPage" :items="data.carousel" />
    <Notice class="container wow fadeInUp" @select="JumpPage" :items="data.notice" />
    <Activity @select="JumpPage" :items="data.activity" />
    <TimelineMain class="container" />
    <Contus :about="data.about" />
  </div>
</template>

<script>
import Carousel from "./Carousel";
import Notice from "./Notice";
import Activity from "./Activity";
import Contus from "./Contus";
import TimelineMain from "./TimelineMain";
export default {
  name: "",
  components: {
    Carousel,
    Notice,
    Activity,
    TimelineMain,
    Contus
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    JumpPage(item, index) {
      this.$router.push({
        path: item.url
      });
    }
  },
  mounted() {
    axios.get("/index/getconfig/name/mainp").then(res => {
      this.data = JSON.parse(res.data);
    });
  }
};
</script>

<style lang='scss'>
#MainPage {
  margin-top: 0 !important;

  #TimelineContainer {
    margin-bottom: 20px;
    p.pretitle {
      display: none;
    }
  }
}
</style>