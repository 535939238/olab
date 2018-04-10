<template>
  <div id='Main'>
    <h2>主页设置</h2>
    <h3>Carousel</h3>
    <Carousel @select="ChangePage" :items="data.carousel" ref="carousel" />

    <div class="msbtn btn-info col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 10px" @click="NewItem('carousel')">新建</div>
    <div class="row"></div>

    <Notice @select="ChangePage" :items="data.notice" />

    <div class="msbtn btn-info col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 10px" @click="NewItem('notice')">新建</div>
    <div class="row"></div>

    <Activity nocontainer="true" @select="ChangePage" :items="data.activity" />

    <div class="msbtn btn-info col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 10px" @click="NewItem('activity')">新建</div>
    <div class="row"></div>

    <TimelineMain />

    <Contus editable="true" :about="data.about" @about="data.about=arguments[0]" />

    <div class="msbtn btn-info col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 10px" @click="SaveSetting">保存主页设置</div>
    <div class="row"></div>

    <transition name="fadeRight">
      <MainEditor v-if="BindingItem" :data="BindingItem" @goback="BindingItem=null" />
    </transition>
  </div>
</template>

<script>
import Carousel from "@/components/MainPage/Carousel";
import Notice from "@/components/MainPage/Notice";
import Activity from "@/components/MainPage/Activity";
import Contus from "@/components/MainPage/Contus";
import TimelineMain from "@/components/MainPage/TimelineMain";
import MainEditor from "./MainEditor";
export default {
  components: {
    Carousel,
    Notice,
    Activity,
    Contus,
    TimelineMain,
    MainEditor
  },
  name: "",
  data() {
    return {
      BindingItem: null,
      data: {}
    };
  },
  methods: {
    ChangePage(item, index) {
      this.BindingItem = item;
    },
    SaveSetting() {
      axios
        .post("/setting/saveconfig/name/mainp", { data: this.data })
        .then(modal.Common);
    },
    NewItem(field) {
      this.data[field].push({
        image: "/static/images/default.png"
      });
      if (field == "carousel")
        this.$refs.carousel.at = this.data[field].length - 1;
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
#Main {
  #Notice {
    .activ-nav {
      @media (min-width: 768px) {
        transform: translate(0, 13%);
      }
    }
  }
}
</style>